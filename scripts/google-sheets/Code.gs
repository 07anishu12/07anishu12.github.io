/**
 * Google Apps Script Web API for Google Sheets Database Integration
 *
 * Target Spreadsheet: https://docs.google.com/spreadsheets/d/1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4/edit
 * Default Spreadsheet ID: 1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4
 *
 * Supported Actions:
 *   - "ping"   : Health check, sheet schema inspection, and row count
 *   - "create" : Append a record with stable ID, created_at, and updated_at
 *   - "read"   : Read a record by ID or query paginated records
 *   - "update" : Update an existing record by ID and refresh updated_at
 *   - "delete" : Authorized soft or hard delete of a record by ID
 *
 * Security:
 *   - Authentication via shared secret stored in Script Properties
 *   - Formula injection prevention (sanitizing =, +, -, @, \t, \r)
 *   - Concurrency locking via LockService.getScriptLock()
 *   - Data preservation: never deletes unknown columns or overwrites existing rows
 */

var DEFAULT_SPREADSHEET_ID = "1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4";
var DEFAULT_SHEET_NAME = "Sheet1";

// Canonical Header Definitions & Field Mappings
var CANONICAL_HEADERS = [
  "Lead ID",
  "Created At",
  "Updated At",
  "Enquiry Type",
  "Customer Name",
  "Mobile Number",
  "PIN Code",
  "Bike Brand",
  "Other Bike Brand",
  "Vehicle Model",
  "Vehicle Type",
  "Service",
  "Other Service",
  "Source Path",
  "Article Slug",
  "Page Category",
  "Campaign Source",
  "Consent Status",
  "Lead Status",
  "Notes"
];

// Map of canonical header keys (normalized: lowercase, alphanumeric only) to field names
var HEADER_ALIAS_MAP = {
  "leadid": "id",
  "id": "id",
  "submissiondateandtime": "created_at",
  "createdat": "created_at",
  "created_at": "created_at",
  "submittedat": "created_at",
  "updatedat": "updated_at",
  "updated_at": "updated_at",
  "enquirytype": "enquiry_type",
  "enquiry_type": "enquiry_type",
  "customername": "full_name",
  "fullname": "full_name",
  "full_name": "full_name",
  "name": "full_name",
  "mobilenumber": "mobile",
  "mobile": "mobile",
  "phonenormalized": "mobile",
  "phone": "mobile",
  "pincode": "pin_code",
  "pin_code": "pin_code",
  "locality": "locality",
  "district": "district",
  "state": "state",
  "bikebrand": "bike_brand",
  "bike_brand": "bike_brand",
  "otherbikebrand": "other_bike_brand",
  "other_bike_brand": "other_bike_brand",
  "vehiclemodel": "vehicle_model",
  "vehicle_model": "vehicle_model",
  "vehicletype": "vehicle_type",
  "vehicle_type": "vehicle_type",
  "service": "service",
  "servicerequired": "service",
  "otherservice": "other_service",
  "other_service": "other_service",
  "sourcepage": "source_path",
  "sourcepath": "source_path",
  "source_path": "source_path",
  "articleslug": "article_slug",
  "article_slug": "article_slug",
  "pagecategory": "page_category",
  "page_category": "page_category",
  "campaignattribution": "campaign_source",
  "campaignsource": "campaign_source",
  "campaign_source": "campaign_source",
  "consentstatus": "consent",
  "consent": "consent",
  "leadstatus": "lead_status",
  "lead_status": "lead_status",
  "sheetssynchronizationstatus": "sheets_sync_status",
  "whatsappnotificationstatus": "whatsapp_notification_status",
  "notes": "notes"
};

/**
 * Normalize string to alphanumeric lowercase key for flexible header matching
 */
function normalizeKey(str) {
  if (!str) return "";
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Formula injection prevention (CWE-1236 / CSV Injection)
 * Prevents formula execution (=, +, -, @, \t, \r) by prefixing dangerous strings with a single quote (')
 */
function sanitizeValue(value) {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (typeof value === "number") {
    return value;
  }
  var str = String(value);
  var trimmed = str.trim();
  if (trimmed.length > 0) {
    var firstChar = trimmed.charAt(0);
    if (firstChar === "=" || firstChar === "+" || firstChar === "-" || firstChar === "@" || firstChar === "\t" || firstChar === "\r") {
      return "'" + str;
    }
  }
  return str;
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeEquals(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  var result = 0;
  for (var i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Retrieve configured spreadsheet ID from Script Properties or default
 */
function getSpreadsheetId() {
  var props = PropertiesService.getScriptProperties();
  var configuredId = props.getProperty("GOOGLE_SHEETS_SPREADSHEET_ID");
  return configuredId && configuredId.trim() !== "" ? configuredId.trim() : DEFAULT_SPREADSHEET_ID;
}

/**
 * Retrieve active or target sheet
 */
function getTargetSheet(spreadsheet, requestedSheetName) {
  if (requestedSheetName) {
    var sheet = spreadsheet.getSheetByName(requestedSheetName);
    if (sheet) return sheet;
  }
  // Try default names: "Sheet1", "Leads", or the first available sheet
  var candidate = spreadsheet.getSheetByName(DEFAULT_SHEET_NAME) ||
                  spreadsheet.getSheetByName("Leads") ||
                  spreadsheet.getSheets()[0];
  if (!candidate) {
    return spreadsheet.insertSheet(DEFAULT_SHEET_NAME);
  }
  return candidate;
}

/**
 * Inspect and ensure safe headers in the target sheet
 * Preserves all existing headers and appends any missing canonical headers safely
 */
function getOrInitializeHeaders(sheet) {
  var lastColumn = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();

  if (lastRow === 0 || lastColumn === 0) {
    // Completely empty sheet: initialize with CANONICAL_HEADERS
    sheet.getRange(1, 1, 1, CANONICAL_HEADERS.length).setValues([CANONICAL_HEADERS]);
    sheet.setFrozenRows(1);
    try {
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS.length).setFontWeight("bold");
    } catch (e) {
      // Styling failure non-fatal
    }
    return CANONICAL_HEADERS;
  }

  // Read existing row 1 headers
  var existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var hasAnyText = existingHeaders.some(function(h) { return String(h).trim() !== ""; });

  if (!hasAnyText) {
    // Row 1 exists but has no text: initialize with CANONICAL_HEADERS
    sheet.getRange(1, 1, 1, CANONICAL_HEADERS.length).setValues([CANONICAL_HEADERS]);
    sheet.setFrozenRows(1);
    try {
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS.length).setFontWeight("bold");
    } catch (e) {}
    return CANONICAL_HEADERS;
  }

  // Preserve existing headers exactly as they are.
  // Check if essential fields (like ID) can be mapped. If not, append canonical headers to the right.
  var normalizedExisting = existingHeaders.map(normalizeKey);
  var missingHeaders = [];
  CANONICAL_HEADERS.forEach(function(canonical) {
    var norm = normalizeKey(canonical);
    var alias = HEADER_ALIAS_MAP[norm] || norm;
    var exists = normalizedExisting.some(function(existingNorm) {
      return existingNorm === norm || (HEADER_ALIAS_MAP[existingNorm] && HEADER_ALIAS_MAP[existingNorm] === alias);
    });
    if (!exists) {
      missingHeaders.push(canonical);
    }
  });

  if (missingHeaders.length > 0) {
    var startCol = lastColumn + 1;
    sheet.getRange(1, startCol, 1, missingHeaders.length).setValues([missingHeaders]);
    try {
      sheet.getRange(1, startCol, 1, missingHeaders.length).setFontWeight("bold");
    } catch (e) {}
    return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  }

  return existingHeaders;
}

/**
 * Build column-to-field mapping index
 */
function buildColumnIndexMap(headers) {
  var map = {};
  for (var colIndex = 0; colIndex < headers.length; colIndex++) {
    var rawHeader = String(headers[colIndex] || "").trim();
    var norm = normalizeKey(rawHeader);
    var fieldName = HEADER_ALIAS_MAP[norm] || norm;
    map[colIndex] = {
      header: rawHeader,
      field: fieldName,
      norm: norm
    };
  }
  return map;
}

/**
 * Locate row index for a stable record ID
 * Returns 1-based row index, or -1 if not found
 */
function findRowIndexById(sheet, headers, id) {
  if (!id) return -1;
  var colMap = buildColumnIndexMap(headers);
  var idColIdx = -1;

  for (var c in colMap) {
    if (colMap[c].field === "id") {
      idColIdx = Number(c) + 1; // 1-based column
      break;
    }
  }

  if (idColIdx === -1) {
    idColIdx = 1; // Default to Column A if no ID header found
  }

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;

  var idValues = sheet.getRange(2, idColIdx, lastRow - 1, 1).getValues();
  for (var r = 0; r < idValues.length; r++) {
    var cellValue = String(idValues[r][0] || "").trim();
    if (cellValue === String(id).trim()) {
      return r + 2; // 1-based row index (skipping header)
    }
  }
  return -1;
}

/**
 * Convert sheet row array to record object
 */
function rowToRecord(headers, rowValues) {
  var colMap = buildColumnIndexMap(headers);
  var record = {};
  for (var i = 0; i < headers.length; i++) {
    var field = colMap[i].field;
    var rawVal = rowValues[i];
    // Strip leading single quote if added for formula protection
    if (typeof rawVal === "string" && rawVal.charAt(0) === "'") {
      rawVal = rawVal.substring(1);
    }
    record[field] = rawVal !== undefined ? rawVal : "";
  }
  return record;
}

/**
 * Format timestamp in Asia/Kolkata timezone with ISO backup
 */
function formatCurrentTimestamp() {
  var now = new Date();
  return Utilities.formatDate(now, "Asia/Kolkata", "yyyy-MM-dd'T'HH:mm:ssXXX");
}

/**
 * Map record fields to an array corresponding to existing headers
 */
function recordToRowValues(headers, record, isUpdate, existingRowValues) {
  var colMap = buildColumnIndexMap(headers);
  var row = [];

  for (var i = 0; i < headers.length; i++) {
    var field = colMap[i].field;
    var norm = colMap[i].norm;
    var val = undefined;

    // Direct field lookup
    if (record[field] !== undefined) {
      val = record[field];
    } else if (record[norm] !== undefined) {
      val = record[norm];
    } else {
      // CamelCase fallbacks
      var camel = field.replace(/_([a-z])/g, function(_, g) { return g.toUpperCase(); });
      if (record[camel] !== undefined) {
        val = record[camel];
      }
    }

    if (val !== undefined) {
      row.push(sanitizeValue(val));
    } else if (isUpdate && existingRowValues && existingRowValues[i] !== undefined) {
      // Preserve existing cell value on update
      row.push(existingRowValues[i]);
    } else {
      // Defaults for create
      if (field === "created_at") {
        row.push(formatCurrentTimestamp());
      } else if (field === "updated_at") {
        row.push(formatCurrentTimestamp());
      } else if (field === "lead_status") {
        row.push("new");
      } else {
        row.push("");
      }
    }
  }

  return row;
}

/**
 * Structured response builder
 */
function jsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Authenticate incoming request against Script Properties
 */
function verifyAuthentication(secret) {
  var props = PropertiesService.getScriptProperties();
  var configuredSecret = props.getProperty("GOOGLE_SHEETS_API_SECRET");

  if (!configuredSecret || configuredSecret.trim() === "") {
    return {
      authenticated: false,
      error: "Script property GOOGLE_SHEETS_API_SECRET is not configured in Apps Script."
    };
  }

  if (!secret || typeof secret !== "string") {
    return {
      authenticated: false,
      error: "Missing API secret in request payload or query parameter."
    };
  }

  if (!constantTimeEquals(secret.trim(), configuredSecret.trim())) {
    return {
      authenticated: false,
      error: "Invalid API secret."
    };
  }

  return { authenticated: true };
}

/**
 * Handle HTTP POST requests
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    // 1. Parse JSON payload
    var rawContents = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    var body;
    try {
      body = JSON.parse(rawContents);
    } catch (parseErr) {
      return jsonResponse({
        ok: false,
        error: { code: "INVALID_JSON", message: "Malformed JSON payload: " + parseErr.message }
      }, 400);
    }

    // 2. Authentication check
    var secret = body.secret || (e && e.parameter && e.parameter.secret);
    var auth = verifyAuthentication(secret);
    if (!auth.authenticated) {
      return jsonResponse({
        ok: false,
        error: { code: "UNAUTHORIZED", message: auth.error }
      }, 401);
    }

    var action = (body.action || (e && e.parameter && e.parameter.action) || "").toLowerCase().trim();

    // 3. Acquire Script Lock for write operations
    var isWrite = (action === "create" || action === "update" || action === "delete");
    if (isWrite) {
      lockAcquired = lock.tryLock(15000); // Wait up to 15 seconds for lock
      if (!lockAcquired) {
        return jsonResponse({
          ok: false,
          error: { code: "LOCK_TIMEOUT", message: "Concurrent write in progress. Please retry shortly." }
        }, 503);
      }
    }

    // 4. Open spreadsheet and sheet tab
    var spreadsheetId = getSpreadsheetId();
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = getTargetSheet(spreadsheet, body.sheetName || (e && e.parameter && e.parameter.sheetName));
    var headers = getOrInitializeHeaders(sheet);

    // 5. Route by action
    if (action === "ping" || action === "health") {
      return jsonResponse({
        ok: true,
        data: {
          spreadsheetId: spreadsheetId,
          spreadsheetName: spreadsheet.getName(),
          sheetName: sheet.getName(),
          rowCount: sheet.getLastRow(),
          columnCount: headers.length,
          headers: headers,
          timestamp: formatCurrentTimestamp()
        }
      }, 200);
    }

    if (action === "create") {
      var record = body.record;
      if (!record || typeof record !== "object") {
        return jsonResponse({
          ok: false,
          error: { code: "INVALID_PAYLOAD", message: "Missing record object in payload." }
        }, 400);
      }

      if (!record.id) {
        return jsonResponse({
          ok: false,
          error: { code: "MISSING_RECORD_ID", message: "Record must contain a stable unique id." }
        }, 400);
      }

      // Check for duplicate record ID (idempotency)
      var existingRowIdx = findRowIndexById(sheet, headers, record.id);
      if (existingRowIdx !== -1) {
        var existingValues = sheet.getRange(existingRowIdx, 1, 1, headers.length).getValues()[0];
        var existingRecord = rowToRecord(headers, existingValues);
        return jsonResponse({
          ok: true,
          data: {
            record: existingRecord,
            duplicate: true,
            rowIndex: existingRowIdx
          }
        }, 200);
      }

      // Ensure created_at and updated_at
      var nowTimestamp = formatCurrentTimestamp();
      if (!record.created_at && !record.createdAt) {
        record.created_at = nowTimestamp;
      }
      record.updated_at = nowTimestamp;

      // Map values and append row
      var rowValues = recordToRowValues(headers, record, false);
      sheet.appendRow(rowValues);
      var newRowIndex = sheet.getLastRow();

      var savedRecord = rowToRecord(headers, rowValues);
      return jsonResponse({
        ok: true,
        data: {
          record: savedRecord,
          duplicate: false,
          rowIndex: newRowIndex,
          created: true
        }
      }, 201);
    }

    if (action === "read") {
      var recordId = body.id || (e && e.parameter && e.parameter.id);

      if (recordId) {
        // Read single record by ID
        var rowIdx = findRowIndexById(sheet, headers, recordId);
        if (rowIdx === -1) {
          return jsonResponse({
            ok: false,
            error: { code: "NOT_FOUND", message: "Record with ID " + recordId + " not found." }
          }, 404);
        }
        var singleRowValues = sheet.getRange(rowIdx, 1, 1, headers.length).getValues()[0];
        return jsonResponse({
          ok: true,
          data: {
            record: rowToRecord(headers, singleRowValues),
            rowIndex: rowIdx
          }
        }, 200);
      }

      // List records with pagination
      var limit = Math.min(Math.max(Number(body.limit || (e && e.parameter && e.parameter.limit) || 50), 1), 100);
      var offset = Math.max(Number(body.offset || (e && e.parameter && e.parameter.offset) || 0), 0);
      var statusFilter = body.status || (e && e.parameter && e.parameter.status);

      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) {
        return jsonResponse({
          ok: true,
          data: { records: [], total: 0, limit: limit, offset: offset }
        }, 200);
      }

      var totalDataRows = lastRow - 1;
      var fetchRows = Math.min(limit, Math.max(0, totalDataRows - offset));

      if (fetchRows <= 0) {
        return jsonResponse({
          ok: true,
          data: { records: [], total: totalDataRows, limit: limit, offset: offset }
        }, 200);
      }

      var batchValues = sheet.getRange(2 + offset, 1, fetchRows, headers.length).getValues();
      var records = [];
      for (var b = 0; b < batchValues.length; b++) {
        var item = rowToRecord(headers, batchValues[b]);
        if (!statusFilter || item.lead_status === statusFilter) {
          records.push(item);
        }
      }

      return jsonResponse({
        ok: true,
        data: {
          records: records,
          total: totalDataRows,
          limit: limit,
          offset: offset
        }
      }, 200);
    }

    if (action === "update") {
      var updateId = body.id;
      var updates = body.updates;

      if (!updateId || !updates || typeof updates !== "object") {
        return jsonResponse({
          ok: false,
          error: { code: "INVALID_PAYLOAD", message: "Update requires id and updates object." }
        }, 400);
      }

      var updateRowIdx = findRowIndexById(sheet, headers, updateId);
      if (updateRowIdx === -1) {
        return jsonResponse({
          ok: false,
          error: { code: "NOT_FOUND", message: "Record with ID " + updateId + " not found." }
        }, 404);
      }

      var curValues = sheet.getRange(updateRowIdx, 1, 1, headers.length).getValues()[0];
      updates.updated_at = formatCurrentTimestamp();
      var updatedRowValues = recordToRowValues(headers, updates, true, curValues);

      sheet.getRange(updateRowIdx, 1, 1, headers.length).setValues([updatedRowValues]);
      var updatedRecord = rowToRecord(headers, updatedRowValues);

      return jsonResponse({
        ok: true,
        data: {
          record: updatedRecord,
          rowIndex: updateRowIdx,
          updated: true
        }
      }, 200);
    }

    if (action === "delete") {
      var deleteId = body.id;
      var hardDelete = Boolean(body.hard);

      if (!deleteId) {
        return jsonResponse({
          ok: false,
          error: { code: "INVALID_PAYLOAD", message: "Delete requires id." }
        }, 400);
      }

      var deleteRowIdx = findRowIndexById(sheet, headers, deleteId);
      if (deleteRowIdx === -1) {
        return jsonResponse({
          ok: false,
          error: { code: "NOT_FOUND", message: "Record with ID " + deleteId + " not found." }
        }, 404);
      }

      if (hardDelete) {
        sheet.deleteRow(deleteRowIdx);
        return jsonResponse({
          ok: true,
          data: { id: deleteId, deleted: true, mode: "hard" }
        }, 200);
      } else {
        // Soft delete: set lead_status = 'deleted'
        var existingRow = sheet.getRange(deleteRowIdx, 1, 1, headers.length).getValues()[0];
        var softUpdates = { lead_status: "deleted", updated_at: formatCurrentTimestamp() };
        var softValues = recordToRowValues(headers, softUpdates, true, existingRow);
        sheet.getRange(deleteRowIdx, 1, 1, headers.length).setValues([softValues]);
        return jsonResponse({
          ok: true,
          data: { id: deleteId, deleted: true, mode: "soft" }
        }, 200);
      }
    }

    return jsonResponse({
      ok: false,
      error: { code: "UNKNOWN_ACTION", message: "Unsupported action: " + action }
    }, 400);

  } catch (err) {
    return jsonResponse({
      ok: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An internal Apps Script error occurred: " + (err.message || String(err))
      }
    }, 500);
  } finally {
    if (lockAcquired) {
      try {
        lock.releaseLock();
      } catch (e) {}
    }
  }
}

/**
 * Handle HTTP GET requests (Health check, ping, and authorized reads)
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action.toLowerCase().trim() : "ping";
  var secret = e && e.parameter && e.parameter.secret;

  var auth = verifyAuthentication(secret);
  if (!auth.authenticated) {
    return jsonResponse({
      ok: false,
      error: { code: "UNAUTHORIZED", message: auth.error }
    }, 401);
  }

  // Delegate to doPost logic by wrapping parameters
  return doPost(e);
}
