/**
 * Automated Copyright-Safe SVG Cover Generation System
 * Generates deterministic, high-craft, 16:9 (1200x675) technical editorial covers
 * based on article titles, categories, keywords, and metadata.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

// Deterministic string hash for consistent procedural variations
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function wrapText(text, maxCharsPerLine = 34, maxLines = 4) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if ((currentLine + ' ' + word).length <= maxCharsPerLine) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) {
        break;
      }
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

// ==========================================
// VECTOR ART GENERATORS (RIGHT-HAND HERO ART)
// ==========================================

// 1. AUTOMOTIVE: COMMUTER & ROADSTER MOTORCYCLE
function renderMotorcycleCommuter(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <!-- Technical Grid & Dimensions -->
      <pattern id="gridCommuter" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${light}" stroke-width="0.5" stroke-opacity="0.4"/>
      </pattern>
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <rect width="470" height="380" rx="12" fill="url(#gridCommuter)" opacity="0.6"/>
      
      <!-- Technical Blueprint Frame Header -->
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">CHASSIS BLUEPRINT · ROADSTER PLATFORM</text>
      <text x="380" y="22" font-family="JetBrains Mono, monospace" font-size="10" fill="#64748B">SCALE 1:12</text>

      <!-- Dimension Lines -->
      <line x1="60" y1="330" x2="410" y2="330" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="60" y1="325" x2="60" y2="335" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="410" y1="325" x2="410" y2="335" stroke="#94A3B8" stroke-width="1.5"/>
      <text x="235" y="345" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B" text-anchor="middle">WHEELBASE: 1,385 MM</text>

      <!-- Rear Wheel -->
      <circle cx="120" cy="240" r="54" fill="none" stroke="${dark}" stroke-width="6"/>
      <circle cx="120" cy="240" r="38" fill="none" stroke="${light}" stroke-width="2"/>
      <circle cx="120" cy="240" r="14" fill="${dark}"/>
      <line x1="120" y1="186" x2="120" y2="294" stroke="#64748B" stroke-width="1"/>
      <line x1="66" y1="240" x2="174" y2="240" stroke="#64748B" stroke-width="1"/>
      <line x1="82" y1="202" x2="158" y2="278" stroke="#64748B" stroke-width="1"/>
      <line x1="82" y1="278" x2="158" y2="202" stroke="#64748B" stroke-width="1"/>

      <!-- Front Wheel -->
      <circle cx="360" cy="240" r="54" fill="none" stroke="${dark}" stroke-width="6"/>
      <circle cx="360" cy="240" r="38" fill="none" stroke="${light}" stroke-width="2"/>
      <circle cx="360" cy="240" r="14" fill="${dark}"/>
      <line x1="360" y1="186" x2="360" y2="294" stroke="#64748B" stroke-width="1"/>
      <line x1="306" y1="240" x2="414" y2="240" stroke="#64748B" stroke-width="1"/>
      <line x1="322" y1="202" x2="398" y2="278" stroke="#64748B" stroke-width="1"/>
      <line x1="322" y1="278" x2="398" y2="202" stroke="#64748B" stroke-width="1"/>

      <!-- Engine Block & Crankcase -->
      <rect x="180" y="200" width="70" height="55" rx="6" fill="#F1F5F9" stroke="${dark}" stroke-width="2.5"/>
      <path d="M 195 200 L 210 160 L 235 160 L 245 200 Z" fill="#E2E8F0" stroke="${dark}" stroke-width="2"/>
      <line x1="200" y1="170" x2="240" y2="170" stroke="${dark}" stroke-width="1.5"/>
      <line x1="202" y1="180" x2="242" y2="180" stroke="${dark}" stroke-width="1.5"/>
      <line x1="204" y1="190" x2="244" y2="190" stroke="${dark}" stroke-width="1.5"/>
      <circle cx="215" cy="225" r="12" fill="none" stroke="${accent}" stroke-width="3"/>

      <!-- Frame & Swingarm -->
      <line x1="120" y1="240" x2="190" y2="230" stroke="${dark}" stroke-width="4"/>
      <path d="M 190 230 L 240 150 L 330 115 L 290 190 L 230 240 Z" fill="none" stroke="${dark}" stroke-width="3.5" stroke-linejoin="round"/>

      <!-- Front Fork & Steering -->
      <line x1="360" y1="240" x2="320" y2="105" stroke="${accent}" stroke-width="4.5"/>
      <line x1="355" y1="240" x2="315" y2="105" stroke="${dark}" stroke-width="2"/>
      <!-- Handlebar & Headlight -->
      <path d="M 315 105 L 305 85 L 325 80" fill="none" stroke="${dark}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 335 110 L 350 110 L 345 125 Z" fill="${accent}"/>

      <!-- Fuel Tank -->
      <path d="M 230 150 C 230 120, 270 110, 315 115 C 310 135, 290 155, 240 155 Z" fill="${accent}" stroke="${dark}" stroke-width="2"/>

      <!-- Seat & Tail Cowl -->
      <path d="M 140 160 C 170 160, 200 160, 240 155 C 230 175, 170 175, 140 160 Z" fill="${dark}" stroke="${dark}" stroke-width="1.5"/>
      <path d="M 110 165 L 140 160 L 140 175 Z" fill="${accent}"/>

      <!-- Exhaust Pipe -->
      <path d="M 225 245 C 240 265, 270 265, 290 260 L 150 250" fill="none" stroke="#64748B" stroke-width="3.5"/>

      <!-- Callout Tags -->
      <rect x="20" y="55" width="125" height="24" rx="4" fill="#F8FAFC" stroke="${light}"/>
      <text x="30" y="71" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="${dark}">KERB WT: 142 KG</text>

      <rect x="320" y="55" width="130" height="24" rx="4" fill="#F8FAFC" stroke="${light}"/>
      <text x="330" y="71" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="${accent}">EFFICIENCY: 65 KMPL</text>
    </g>
  `;
}

// 2. AUTOMOTIVE: SCOOTER (ACTIVA / JUPITER / ATHER / CHETAK)
function renderScooter(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <!-- Header -->
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">URBAN SCOOTER ARCHITECTURE · STEP-THROUGH</text>

      <!-- Dimension Floor Reference -->
      <line x1="50" y1="310" x2="420" y2="310" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="235" y="330" font-family="JetBrains Mono, monospace" font-size="10" fill="#64748B" text-anchor="middle">GROUND CLEARANCE: 165 MM</text>

      <!-- Rear Wheel (10-12 inch) -->
      <circle cx="130" cy="245" r="46" fill="none" stroke="${dark}" stroke-width="6"/>
      <circle cx="130" cy="245" r="32" fill="none" stroke="${light}" stroke-width="2"/>
      <circle cx="130" cy="245" r="12" fill="${dark}"/>
      <!-- Front Wheel -->
      <circle cx="360" cy="245" r="46" fill="none" stroke="${dark}" stroke-width="6"/>
      <circle cx="360" cy="245" r="32" fill="none" stroke="${light}" stroke-width="2"/>
      <circle cx="360" cy="245" r="12" fill="${dark}"/>

      <!-- Under-seat Body / Engine / Battery Enclosure -->
      <path d="M 110 240 C 100 170, 150 160, 220 160 L 220 220 L 150 250 Z" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="2.5"/>
      <rect x="130" y="195" width="75" height="40" rx="4" fill="#FFFFFF" stroke="${dark}" stroke-width="2"/>
      <text x="167" y="220" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${dark}" text-anchor="middle">POWERTRAIN</text>

      <!-- Step-through Flat Floorboard -->
      <path d="M 220 220 L 285 220 L 295 160" fill="none" stroke="${dark}" stroke-width="4"/>
      <line x1="225" y1="226" x2="280" y2="226" stroke="${accent}" stroke-width="2"/>

      <!-- Seat -->
      <path d="M 120 160 C 145 155, 185 155, 220 160 L 220 172 L 125 170 Z" fill="${dark}" stroke="${dark}" stroke-width="2"/>

      <!-- Front Apron & Handlebar -->
      <path d="M 285 220 L 330 115 C 335 105, 345 100, 355 105 L 340 180 L 360 245" fill="none" stroke="${dark}" stroke-width="3.5"/>
      <path d="M 330 115 L 320 85 L 345 80" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
      <polygon points="340,95 355,95 350,110" fill="${accent}"/>

      <!-- Spec Badges -->
      <rect x="25" y="55" width="135" height="42" rx="6" fill="#F8FAFC" stroke="${light}"/>
      <text x="35" y="73" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#64748B">BOOT CAPACITY</text>
      <text x="35" y="90" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="${dark}">28-34 LITRES</text>

      <rect x="310" y="55" width="135" height="42" rx="6" fill="#F8FAFC" stroke="${light}"/>
      <text x="320" y="73" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#64748B">RANGE / TANK</text>
      <text x="320" y="90" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="${accent}">120 KM / 5.5L</text>
    </g>
  `;
}

// 3. AUTOMOTIVE: ADV & PERFORMANCE MOTORCYCLE (EICMA / HIMALAYAN / AFRICA TWIN)
function renderMotorcycleADV(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">ADVENTURE ENDURO CHASSIS · LONG TRAVEL</text>

      <!-- Ground & Elevation Lines -->
      <line x1="40" y1="315" x2="430" y2="315" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="235" y="335" font-family="JetBrains Mono, monospace" font-size="10" fill="#64748B" text-anchor="middle">SUSPENSION TRAVEL: 220 MM · 21" FRONT</text>

      <!-- Rear Wheel (17-18 inch) -->
      <circle cx="115" cy="240" r="50" fill="none" stroke="${dark}" stroke-width="6"/>
      <circle cx="115" cy="240" r="36" fill="none" stroke="${light}" stroke-width="2"/>
      <circle cx="115" cy="240" r="14" fill="${dark}"/>
      <!-- Front Wheel (21 inch) -->
      <circle cx="365" cy="230" r="58" fill="none" stroke="${dark}" stroke-width="6"/>
      <circle cx="365" cy="230" r="44" fill="none" stroke="${light}" stroke-width="2"/>
      <circle cx="365" cy="230" r="14" fill="${dark}"/>

      <!-- High Front Beak & Screen -->
      <path d="M 330 90 L 310 50 L 330 50" fill="none" stroke="#94A3B8" stroke-width="3"/>
      <path d="M 320 110 L 375 130 L 340 145 Z" fill="${accent}" stroke="${dark}" stroke-width="2"/>

      <!-- USD Inverted Front Forks -->
      <line x1="365" y1="230" x2="325" y2="90" stroke="${accent}" stroke-width="5"/>
      <line x1="358" y1="230" x2="318" y2="90" stroke="${dark}" stroke-width="2"/>

      <!-- Large Fuel Tank & Skid Plate -->
      <path d="M 215 135 C 220 100, 275 90, 325 110 L 265 170 Z" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="2.5"/>
      <path d="M 190 240 L 260 240 L 280 200 L 190 200 Z" fill="#F1F5F9" stroke="${dark}" stroke-width="2"/>
      <rect x="180" y="240" width="80" height="8" rx="2" fill="${dark}"/>

      <!-- Trellis Frame -->
      <line x1="210" y1="140" x2="260" y2="190" stroke="${dark}" stroke-width="3"/>
      <line x1="260" y1="190" x2="310" y2="130" stroke="${dark}" stroke-width="3"/>
      <line x1="210" y1="140" x2="310" y2="130" stroke="${dark}" stroke-width="3"/>

      <!-- Tall ADV Seat & Luggage Rack -->
      <path d="M 130 145 C 165 145, 185 145, 220 140 L 210 160 L 140 160 Z" fill="${dark}"/>
      <line x1="90" y1="145" x2="135" y2="145" stroke="#64748B" stroke-width="3"/>

      <!-- High-mounted Exhaust -->
      <path d="M 230 230 L 190 210 L 120 180" fill="none" stroke="#64748B" stroke-width="4.5"/>

      <!-- Telemetry Box -->
      <rect x="25" y="55" width="120" height="42" rx="6" fill="#F8FAFC" stroke="${light}"/>
      <text x="35" y="73" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#64748B">RIDE MODES</text>
      <text x="35" y="90" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="${dark}">ENDURO / OFF</text>

      <rect x="325" y="55" width="120" height="42" rx="6" fill="#F8FAFC" stroke="${light}"/>
      <text x="335" y="73" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#64748B">SEAT HEIGHT</text>
      <text x="335" y="90" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="${accent}">835-855 MM</text>
    </g>
  `;
}

// 4. AUTOMOTIVE: TRANSMISSION / GEARBOX & MECHANICS (Y-AMT / DCT / SHIFTER)
function renderTransmissionDiagram(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">AUTOMATED TRANSMISSION MECHANISM · ACTUATOR</text>

      <!-- Gear Train Meshing -->
      <g transform="translate(140, 180)">
        <!-- Input Shaft Gear (Driver) -->
        <circle cx="0" cy="0" r="60" fill="none" stroke="${dark}" stroke-width="4"/>
        <circle cx="0" cy="0" r="48" fill="#F8FAFC" stroke="${light}" stroke-width="1.5" stroke-dasharray="4 3"/>
        <circle cx="0" cy="0" r="20" fill="${accent}"/>
        <!-- Gear Teeth (stylized ticks) -->
        ${Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = Math.cos(a) * 58;
          const y1 = Math.sin(a) * 58;
          const x2 = Math.cos(a) * 66;
          const y2 = Math.sin(a) * 66;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${dark}" stroke-width="3"/>`;
        }).join('')}
        <text x="0" y="4" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#FFFFFF" text-anchor="middle">IN</text>
      </g>

      <g transform="translate(240, 180)">
        <!-- Countershaft Gear (Driven) -->
        <circle cx="0" cy="0" r="42" fill="none" stroke="${accent}" stroke-width="4"/>
        <circle cx="0" cy="0" r="32" fill="#FFF7ED" stroke="${light}" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="14" fill="${dark}"/>
        ${Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const x1 = Math.cos(a) * 40;
          const y1 = Math.sin(a) * 40;
          const x2 = Math.cos(a) * 48;
          const y2 = Math.sin(a) * 48;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${accent}" stroke-width="3"/>`;
        }).join('')}
        <text x="0" y="4" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">OUT</text>
      </g>

      <!-- Actuator & Shift Drum -->
      <g transform="translate(340, 180)">
        <rect x="-25" y="-50" width="50" height="100" rx="8" fill="#F1F5F9" stroke="${dark}" stroke-width="2"/>
        <line x1="-15" y1="-25" x2="15" y2="-10" stroke="${accent}" stroke-width="3"/>
        <line x1="15" y1="-10" x2="-15" y2="15" stroke="${accent}" stroke-width="3"/>
        <line x1="-15" y1="15" x2="15" y2="30" stroke="${accent}" stroke-width="3"/>
        <text x="0" y="68" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${dark}" text-anchor="middle">SHIFT DRUM</text>
      </g>

      <!-- Actuator Control Arrows -->
      <path d="M 240 250 L 240 280 L 340 280 L 340 255" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4"/>
      <polygon points="340,248 336,258 344,258" fill="${accent}"/>
      <text x="290" y="300" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="${dark}" text-anchor="middle">SERVO ACTUATOR SIGNAL</text>

      <!-- Stats Bar -->
      <rect x="25" y="55" width="130" height="38" rx="6" fill="#F8FAFC" stroke="${light}"/>
      <text x="35" y="72" font-family="Plus Jakarta Sans, sans-serif" font-size="9" font-weight="700" fill="#64748B">SHIFT TIME</text>
      <text x="35" y="87" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="${accent}">&lt; 80 MS</text>

      <rect x="315" y="55" width="130" height="38" rx="6" fill="#F8FAFC" stroke="${light}"/>
      <text x="325" y="72" font-family="Plus Jakarta Sans, sans-serif" font-size="9" font-weight="700" fill="#64748B">CLUTCH TYPE</text>
      <text x="325" y="87" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="${dark}">DUAL / ELECTROMAG</text>
    </g>
  `;
}

// 5. AUTOMOTIVE: RADAR & SENSOR TELEMETRY (HONDA SENSING RIDE / ADAS)
function renderRadarTelemetry(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">77 GHz RADAR &amp; 6-AXIS IMU SENSOR SUITE</text>

      <!-- Radar Fan Beams -->
      <g transform="translate(100, 200)">
        <!-- Sensor Origin -->
        <circle cx="0" cy="0" r="14" fill="${dark}"/>
        <circle cx="0" cy="0" r="6" fill="${accent}"/>
        
        <!-- Radar Cones -->
        <path d="M 0 0 L 220 -80 A 240 240 0 0 1 220 80 Z" fill="${accent}" fill-opacity="0.08" stroke="${accent}" stroke-width="1.5" stroke-dasharray="5 3"/>
        <path d="M 0 0 L 140 -50 A 150 150 0 0 1 140 50 Z" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-width="1.5"/>
        <path d="M 0 0 L 70 -25 A 75 75 0 0 1 70 25 Z" fill="${accent}" fill-opacity="0.2"/>

        <!-- Detected Vehicle Markers -->
        <g transform="translate(160, -20)">
          <rect x="-15" y="-10" width="30" height="20" rx="4" fill="#DC2626" fill-opacity="0.2" stroke="#DC2626" stroke-width="2"/>
          <text x="0" y="4" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#DC2626" text-anchor="middle">OBJ-01</text>
          <text x="0" y="24" font-family="JetBrains Mono, monospace" font-size="8" fill="#64748B" text-anchor="middle">D: 42M · -8 KM/H</text>
        </g>
      </g>

      <!-- IMU Lean Angle Arc -->
      <g transform="translate(370, 200)">
        <circle cx="0" cy="0" r="55" fill="none" stroke="#E2E8F0" stroke-width="4"/>
        <path d="M 0 0 L 40 -40" stroke="${accent}" stroke-width="3"/>
        <path d="M 0 -55 A 55 55 0 0 1 40 -40" fill="none" stroke="${accent}" stroke-width="4"/>
        <circle cx="0" cy="0" r="6" fill="${dark}"/>
        <text x="0" y="25" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" text-anchor="middle">LEAN: 38°</text>
        <text x="0" y="40" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B" text-anchor="middle">ROLL / PITCH / YAW</text>
      </g>

      <!-- Footer Callouts -->
      <rect x="25" y="300" width="420" height="55" rx="8" fill="#F8FAFC" stroke="${light}"/>
      <text x="45" y="322" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}">FEATURES: ACC · BLIND SPOT (BSD) · COLLISION MITIGATION</text>
      <text x="45" y="342" font-family="Plus Jakarta Sans, sans-serif" font-size="10" fill="#64748B">Real-time CAN-bus actuation over throttle, front/rear braking pressure, and TFT warnings.</text>
    </g>
  `;
}

// 6. TECHNOLOGY & AI: NEURAL NETWORK & AGENT GRAPH
function renderNeuralNetwork(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">DEEP ARCHITECTURE · ATTENTION GRAPH</text>

      <!-- Neural Layer Nodes & Synapses -->
      <g transform="translate(45, 70)">
        <!-- Layer 1: Input (4 nodes) -->
        ${[40, 100, 160, 220].map((y, i) => `
          <g>
            <circle cx="40" cy="${y}" r="12" fill="#EEF2FF" stroke="${accent}" stroke-width="2"/>
            <text x="40" y="${y + 4}" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${dark}" text-anchor="middle">x${i + 1}</text>
          </g>
        `).join('')}

        <!-- Layer 2: Hidden 1 (5 nodes) -->
        ${[20, 75, 130, 185, 240].map((y, j) => `
          <g>
            <circle cx="150" cy="${y}" r="12" fill="#F8FAFC" stroke="${dark}" stroke-width="2"/>
            <text x="150" y="${y + 4}" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${dark}" text-anchor="middle">h${j + 1}</text>
          </g>
        `).join('')}

        <!-- Layer 3: Attention Heads (4 nodes) -->
        ${[40, 100, 160, 220].map((y, k) => `
          <g>
            <circle cx="260" cy="${y}" r="14" fill="${accent}" stroke="${dark}" stroke-width="2"/>
            <text x="260" y="${y + 4}" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">Attn</text>
          </g>
        `).join('')}

        <!-- Layer 4: Output (2 nodes) -->
        ${[80, 180].map((y, m) => `
          <g>
            <circle cx="350" cy="${y}" r="15" fill="#10B981" stroke="${dark}" stroke-width="2"/>
            <text x="350" y="${y + 4}" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">y${m + 1}</text>
          </g>
        `).join('')}

        <!-- Synapse lines Layer 1 to 2 -->
        ${[40, 100, 160, 220].map(y1 => [20, 75, 130, 185, 240].map(y2 => `
          <line x1="52" y1="${y1}" x2="138" y2="${y2}" stroke="#CBD5E1" stroke-width="0.8" opacity="0.6"/>
        `).join('')).join('')}

        <!-- Synapse lines Layer 2 to 3 -->
        ${[20, 75, 130, 185, 240].map(y1 => [40, 100, 160, 220].map(y2 => `
          <line x1="162" y1="${y1}" x2="246" y2="${y2}" stroke="${accent}" stroke-width="1" opacity="0.4"/>
        `).join('')).join('')}

        <!-- Synapse lines Layer 3 to 4 -->
        ${[40, 100, 160, 220].map(y1 => [80, 180].map(y2 => `
          <line x1="274" y1="${y1}" x2="335" y2="${y2}" stroke="#10B981" stroke-width="1.2" opacity="0.7"/>
        `).join('')).join('')}
      </g>

      <!-- Technical Telemetry Footer -->
      <rect x="25" y="320" width="420" height="42" rx="6" fill="#F8FAFC" stroke="${light}"/>
      <text x="40" y="345" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="${dark}">TENSORS: [Batch, SeqLen, 4096] · LATENCY: 22 MS · FP16</text>
    </g>
  `;
}

// 7. TECHNOLOGY & AI: SYSTEM ARCHITECTURE & CODE CONTRACT
function renderSystemArchitecture(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">EVENT-DRIVEN ARCHITECTURE &amp; TRANSACTION PIPELINE</text>

      <!-- Architecture Nodes -->
      <g transform="translate(30, 60)">
        <!-- Client / API Gateway -->
        <rect x="0" y="30" width="90" height="60" rx="8" fill="#F8FAFC" stroke="${dark}" stroke-width="2"/>
        <text x="45" y="58" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" text-anchor="middle">API GW</text>
        <text x="45" y="74" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B" text-anchor="middle">REST / gRPC</text>

        <!-- Arrow to Outbox -->
        <line x1="90" y1="60" x2="135" y2="60" stroke="${accent}" stroke-width="2"/>
        <polygon points="135,60 128,56 128,64" fill="${accent}"/>

        <!-- Transactional Outbox Node -->
        <rect x="140" y="20" width="130" height="80" rx="8" fill="#EFF6FF" stroke="${accent}" stroke-width="2.5"/>
        <text x="205" y="48" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">TRANSACTIONAL</text>
        <text x="205" y="64" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">OUTBOX</text>
        <text x="205" y="84" font-family="JetBrains Mono, monospace" font-size="9" fill="#1E40AF" text-anchor="middle">ACID PG COMMIT</text>

        <!-- Arrow to Worker Pool -->
        <line x1="270" y1="60" x2="315" y2="60" stroke="${accent}" stroke-width="2"/>
        <polygon points="315,60 308,56 308,64" fill="${accent}"/>

        <!-- Worker Pool -->
        <rect x="320" y="30" width="90" height="60" rx="8" fill="#F8FAFC" stroke="${dark}" stroke-width="2"/>
        <text x="365" y="58" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" text-anchor="middle">WORKER</text>
        <text x="365" y="74" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B" text-anchor="middle">ASYNC POOL</text>
      </g>

      <!-- Code Snippet / AST Box -->
      <g transform="translate(30, 185)">
        <rect width="410" height="150" rx="8" fill="#0F172A"/>
        <circle cx="20" cy="18" r="4" fill="#EF4444"/>
        <circle cx="34" cy="18" r="4" fill="#F59E0B"/>
        <circle cx="48" cy="18" r="4" fill="#10B981"/>
        <text x="70" y="22" font-family="JetBrains Mono, monospace" font-size="10" fill="#94A3B8">pipeline_contract.py · STRICT TYPES</text>

        <text x="20" y="52" font-family="JetBrains Mono, monospace" font-size="11" fill="#38BDF8">async def</text>
        <text x="95" y="52" font-family="JetBrains Mono, monospace" font-size="11" fill="#F8FAFC">dispatch_event(payload: EventMessage) -&gt; Result:</text>
        
        <text x="35" y="76" font-family="JetBrains Mono, monospace" font-size="11" fill="#F8FAFC">async with db.transaction(isolation="serializable"):</text>
        <text x="50" y="98" font-family="JetBrains Mono, monospace" font-size="11" fill="#94A3B8">record = await outbox.insert(payload.to_record())</text>
        <text x="50" y="120" font-family="JetBrains Mono, monospace" font-size="11" fill="#4ADE80">return Result.ok(tx_id=record.id, verified=True)</text>
      </g>
    </g>
  `;
}

// 8. FINANCE: VALUATION & FINANCIAL CANDLESTICK / DCF
function renderFinancialCharts(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">DCF VALUATION &amp; QUANTITATIVE RETURN MODEL</text>

      <!-- Valuation Waterfall Blocks -->
      <g transform="translate(40, 60)">
        <text x="0" y="20" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#64748B">FREE CASH FLOW WATERFALL (5-YEAR PROJECTION)</text>
        
        <!-- Y Axis -->
        <line x1="30" y1="40" x2="30" y2="180" stroke="#CBD5E1" stroke-width="1.5"/>
        <line x1="30" y1="180" x2="380" y2="180" stroke="#CBD5E1" stroke-width="1.5"/>

        <!-- FCF Bars -->
        <rect x="50" y="120" width="38" height="60" rx="3" fill="${accent}"/>
        <text x="69" y="112" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${accent}" text-anchor="middle">Y1: 42M</text>

        <rect x="110" y="105" width="38" height="75" rx="3" fill="${accent}"/>
        <text x="129" y="97" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${accent}" text-anchor="middle">Y2: 58M</text>

        <rect x="170" y="85" width="38" height="95" rx="3" fill="${accent}"/>
        <text x="189" y="77" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${accent}" text-anchor="middle">Y3: 79M</text>

        <rect x="230" y="65" width="38" height="115" rx="3" fill="${accent}"/>
        <text x="249" y="57" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${accent}" text-anchor="middle">Y4: 104M</text>

        <!-- Terminal Value Bar -->
        <rect x="290" y="45" width="46" height="135" rx="3" fill="${dark}"/>
        <text x="313" y="37" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${dark}" text-anchor="middle">TV: 380M</text>

        <!-- Discount Curve Overlay -->
        <path d="M 69 130 Q 189 100, 313 70" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="4 3"/>
      </g>

      <!-- Valuation Multiples Matrix -->
      <g transform="translate(40, 265)">
        <rect width="390" height="85" rx="8" fill="#F8FAFC" stroke="${light}"/>
        <text x="20" y="25" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#64748B">SENSITIVITY MATRIX · WACC VS TERMINAL GROWTH</text>
        
        <g transform="translate(20, 38)">
          <rect x="0" y="0" width="80" height="32" rx="4" fill="#EFF6FF"/>
          <text x="40" y="15" font-family="JetBrains Mono, monospace" font-size="9" fill="#1E40AF" text-anchor="middle">WACC: 9.5%</text>
          <text x="40" y="27" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="${dark}" text-anchor="middle">$142.50</text>

          <rect x="95" y="0" width="80" height="32" rx="4" fill="#ECFDF5"/>
          <text x="135" y="15" font-family="JetBrains Mono, monospace" font-size="9" fill="#065F46" text-anchor="middle">WACC: 10.0%</text>
          <text x="135" y="27" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="${accent}" text-anchor="middle">$136.20</text>

          <rect x="190" y="0" width="80" height="32" rx="4" fill="#FEF3C7"/>
          <text x="230" y="15" font-family="JetBrains Mono, monospace" font-size="9" fill="#92400E" text-anchor="middle">WACC: 10.5%</text>
          <text x="230" y="27" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="${dark}" text-anchor="middle">$129.80</text>

          <rect x="285" y="0" width="80" height="32" rx="4" fill="#F1F5F9"/>
          <text x="325" y="15" font-family="JetBrains Mono, monospace" font-size="9" fill="#475569" text-anchor="middle">IRR EST.</text>
          <text x="325" y="27" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="${dark}" text-anchor="middle">18.4%</text>
        </g>
      </g>
    </g>
  `;
}

// 9. PRODUCT: UI WIREFRAME & USER JOURNEY
function renderProductWireframe(accent, dark, light) {
  return `
    <g transform="translate(640, 150)">
      <rect width="470" height="380" rx="12" fill="#FFFFFF" stroke="${light}" stroke-width="1.5"/>
      <path d="M 0 0 L 470 0 L 470 36 L 0 36 Z" fill="#F8FAFC" rx="12"/>
      <circle cx="20" cy="18" r="4" fill="${accent}"/>
      <text x="32" y="22" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="${dark}" letter-spacing="1">PRODUCT DISCOVERY &amp; UI COMPONENT SYSTEM</text>

      <!-- App Shell Wireframe -->
      <g transform="translate(35, 60)">
        <rect width="400" height="200" rx="8" fill="#F8FAFC" stroke="${dark}" stroke-width="2"/>
        
        <!-- App Topbar -->
        <rect width="400" height="28" rx="8" fill="#FFFFFF" stroke="${light}"/>
        <circle cx="16" cy="14" r="3.5" fill="#EF4444"/>
        <circle cx="28" cy="14" r="3.5" fill="#F59E0B"/>
        <circle cx="40" cy="14" r="3.5" fill="#10B981"/>
        <rect x="130" y="6" width="140" height="16" rx="4" fill="#F1F5F9"/>

        <!-- Sidebar Navigation -->
        <rect x="0" y="28" width="80" height="172" fill="#F1F5F9" stroke="${light}"/>
        <rect x="12" y="45" width="56" height="8" rx="2" fill="${accent}"/>
        <rect x="12" y="65" width="56" height="8" rx="2" fill="#CBD5E1"/>
        <rect x="12" y="85" width="56" height="8" rx="2" fill="#CBD5E1"/>
        <rect x="12" y="105" width="56" height="8" rx="2" fill="#CBD5E1"/>

        <!-- Main Workspace: Metric Cards -->
        <g transform="translate(95, 45)">
          <rect x="0" y="0" width="88" height="50" rx="6" fill="#FFFFFF" stroke="${light}"/>
          <text x="10" y="18" font-family="JetBrains Mono, monospace" font-size="8" fill="#64748B">ACTIVATION</text>
          <text x="10" y="38" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="${dark}">68.4%</text>

          <rect x="100" y="0" width="88" height="50" rx="6" fill="#FFFFFF" stroke="${light}"/>
          <text x="110" y="18" font-family="JetBrains Mono, monospace" font-size="8" fill="#64748B">CONVERSION</text>
          <text x="110" y="38" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="${accent}">4.82%</text>

          <rect x="200" y="0" width="88" height="50" rx="6" fill="#FFFFFF" stroke="${light}"/>
          <text x="210" y="18" font-family="JetBrains Mono, monospace" font-size="8" fill="#64748B">RETENTION</text>
          <text x="210" y="38" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="${dark}">84.1%</text>
        </g>

        <!-- Data Table Wireframe -->
        <g transform="translate(95, 110)">
          <rect x="0" y="0" width="288" height="75" rx="6" fill="#FFFFFF" stroke="${light}"/>
          <line x1="0" y1="25" x2="288" y2="25" stroke="#E2E8F0"/>
          <line x1="0" y1="50" x2="288" y2="50" stroke="#E2E8F0"/>
          
          <rect x="12" y="8" width="40" height="8" rx="2" fill="#94A3B8"/>
          <rect x="80" y="8" width="60" height="8" rx="2" fill="#94A3B8"/>
          <rect x="180" y="8" width="45" height="8" rx="2" fill="#94A3B8"/>

          <rect x="12" y="33" width="50" height="8" rx="2" fill="#CBD5E1"/>
          <rect x="80" y="33" width="75" height="8" rx="2" fill="${accent}"/>
          <rect x="180" y="33" width="30" height="8" rx="2" fill="#10B981"/>

          <rect x="12" y="58" width="45" height="8" rx="2" fill="#CBD5E1"/>
          <rect x="80" y="58" width="65" height="8" rx="2" fill="${accent}"/>
          <rect x="180" y="58" width="30" height="8" rx="2" fill="#10B981"/>
        </g>
      </g>

      <!-- Experimentation Funnel Footer -->
      <g transform="translate(35, 280)">
        <rect width="400" height="70" rx="8" fill="#F8FAFC" stroke="${light}"/>
        <text x="20" y="24" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#64748B">USER ONBOARDING FUNNEL STEP TRANSITIONS</text>
        
        <g transform="translate(20, 36)">
          <text x="0" y="15" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="${dark}">1. DISCOVERY (100%)</text>
          <text x="140" y="15" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="${dark}">➔ 2. TRIAL (44%)</text>
          <text x="270" y="15" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="${accent}">➔ 3. PAID (12.8%)</text>
        </g>
      </g>
    </g>
  `;
}

// ==========================================
// SELECTION OF RELEVANT TEMPLATE
// ==========================================

function selectVisualSystem(category, title, slug, tags = []) {
  const c = category.toLowerCase();
  const text = `${title} ${slug} ${tags.join(' ')}`.toLowerCase();

  if (c === 'auto') {
    if (text.includes('y-amt') || text.includes('amt') || text.includes('transmission') || text.includes('gear') || text.includes('clutch') || text.includes('dct') || text.includes('shift')) {
      return { type: 'transmission', label: 'TRANSMISSION MECHANISM' };
    }
    if (text.includes('sensing') || text.includes('radar') || text.includes('sirs') || text.includes('electronics') || text.includes('adas') || text.includes('imu') || text.includes('abs') || text.includes('assist')) {
      return { type: 'radar', label: 'ELECTRONICS & SENSORS' };
    }
    if (text.includes('scooter') || text.includes('activa') || text.includes('jupiter') || text.includes('ather') || text.includes('chetak') || text.includes('ola') || text.includes('iqube') || text.includes('rizta') || text.includes('burgman') || text.includes('access')) {
      return { type: 'scooter', label: 'SCOOTER ARCHITECTURE' };
    }
    if (text.includes('adventure') || text.includes('adv') || text.includes('himalayan') || text.includes('africa twin') || text.includes('gs') || text.includes('transalp') || text.includes('tenere') || text.includes('tiger') || text.includes('tuareg') || text.includes('desert') || text.includes('rally')) {
      return { type: 'adv', label: 'ADVENTURE CHASSIS' };
    }
    return { type: 'commuter', label: 'MOTORCYCLE BLUEPRINT' };
  }

  if (c === 'technology') {
    if (text.includes('agent') || text.includes('llm') || text.includes('neural') || text.includes('ai') || text.includes('model') || text.includes('voice') || text.includes('speech') || text.includes('translation') || text.includes('gpt')) {
      return { type: 'neural', label: 'NEURAL SYSTEM' };
    }
    return { type: 'sysarch', label: 'SYSTEM ARCHITECTURE' };
  }

  if (c === 'finance') {
    return { type: 'finance', label: 'VALUATION & MARKETS' };
  }

  if (c === 'product') {
    return { type: 'product', label: 'PRODUCT DISCOVERY' };
  }

  return { type: 'commuter', label: 'TECHNICAL ANALYSIS' };
}

// Generate the complete deterministic 16:9 (1200x675) SVG
export function generateCoverSvg({
  title,
  slug,
  category,
  tags = [],
  series = 'Technical Library · Verified Research',
  dateStr = 'November 2026',
  author = 'Aniket Thakur'
}) {
  const hash = hashString(slug || title);
  const visual = selectVisualSystem(category, title, slug, tags);

  // Category Theme Colors
  let bgGradStart = '#FAF9F6';
  let bgGradEnd = '#FFF7ED';
  let accent = '#C2410C';
  let dark = '#0F172A';
  let light = '#E2E8F0';
  let categoryPillBg = '#FFEDD5';
  let categoryPillText = '#9A3412';

  if (category.toLowerCase() === 'technology') {
    bgGradEnd = '#EEF2FF';
    accent = '#1D4ED8';
    categoryPillBg = '#E0E7FF';
    categoryPillText = '#1E40AF';
  } else if (category.toLowerCase() === 'finance') {
    bgGradEnd = '#ECFDF5';
    accent = '#047857';
    categoryPillBg = '#D1FAE5';
    categoryPillText = '#065F46';
  } else if (category.toLowerCase() === 'product') {
    bgGradEnd = '#FAF5FF';
    accent = '#7C3AED';
    categoryPillBg = '#F3E8FF';
    categoryPillText = '#6B21A8';
  }

  const titleLines = wrapText(title, 32, 4);

  // Render hero vector based on template type
  let heroArt = '';
  switch (visual.type) {
    case 'transmission': heroArt = renderTransmissionDiagram(accent, dark, light); break;
    case 'radar': heroArt = renderRadarTelemetry(accent, dark, light); break;
    case 'scooter': heroArt = renderScooter(accent, dark, light); break;
    case 'adv': heroArt = renderMotorcycleADV(accent, dark, light); break;
    case 'neural': heroArt = renderNeuralNetwork(accent, dark, light); break;
    case 'sysarch': heroArt = renderSystemArchitecture(accent, dark, light); break;
    case 'finance': heroArt = renderFinancialCharts(accent, dark, light); break;
    case 'product': heroArt = renderProductWireframe(accent, dark, light); break;
    default: heroArt = renderMotorcycleCommuter(accent, dark, light); break;
  }

  // Safe category display name
  const catDisplay = category.charAt(0).toUpperCase() + category.slice(1);
  const primaryTag = tags[0] || catDisplay;
  const secondaryTag = tags[1] || visual.label;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bgGrad_${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradStart}"/>
      <stop offset="100%" stop-color="${bgGradEnd}"/>
    </linearGradient>
    <pattern id="dotGrid_${hash}" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#94A3B8" opacity="0.25"/>
    </pattern>
  </defs>

  <!-- Background Base Canvas -->
  <rect width="1200" height="675" fill="url(#bgGrad_${hash})"/>
  <rect width="1200" height="675" fill="url(#dotGrid_${hash})"/>

  <!-- Outer Fine Card Border -->
  <rect x="36" y="36" width="1128" height="603" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>

  <!-- Left Editorial Typography Column -->
  <g transform="translate(85, 95)">
    <!-- Top Pillar Badges -->
    <rect x="0" y="0" width="160" height="32" rx="16" fill="${categoryPillBg}" stroke="${accent}" stroke-opacity="0.3"/>
    <circle cx="16" cy="16" r="4.5" fill="${accent}"/>
    <text x="28" y="21" font-family="Plus Jakarta Sans, -apple-system, sans-serif" font-size="12" font-weight="800" fill="${categoryPillText}" letter-spacing="1">${escapeXml(catDisplay.toUpperCase())}</text>
    
    <text x="175" y="21" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#64748B">${escapeXml(visual.label)}</text>

    <!-- Main Title Multi-line -->
    <g transform="translate(0, 75)">
      ${titleLines.map((line, idx) => `
        <text x="0" y="${idx * 44}" font-family="Plus Jakarta Sans, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#0F172A" letter-spacing="-0.6">${escapeXml(line)}</text>
      `).join('')}
    </g>

    <!-- Subtitle / Series -->
    <g transform="translate(0, ${75 + (titleLines.length * 44) + 15})">
      <text x="0" y="16" font-family="Newsreader, Georgia, serif" font-size="19" font-style="italic" fill="${accent}">
        ${escapeXml(series)}
      </text>

      <!-- Topic Pill Badges -->
      <g transform="translate(0, 36)">
        <rect x="0" y="0" width="160" height="28" rx="6" fill="#F1F5F9" stroke="#E2E8F0"/>
        <text x="80" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#475569" text-anchor="middle">${escapeXml(primaryTag.slice(0, 20))}</text>

        <rect x="175" y="0" width="170" height="28" rx="6" fill="#F1F5F9" stroke="#E2E8F0"/>
        <text x="260" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#475569" text-anchor="middle">${escapeXml(secondaryTag.slice(0, 22))}</text>
      </g>
    </g>

    <!-- Author & Research Attribution Stamp -->
    <g transform="translate(0, 445)">
      <circle cx="16" cy="16" r="16" fill="${accent}"/>
      <text x="16" y="21" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">AT</text>
      <text x="44" y="14" font-family="Plus Jakarta Sans, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#0F172A">${escapeXml(author)}</text>
      <text x="44" y="29" font-family="Plus Jakarta Sans, -apple-system, sans-serif" font-size="11" fill="#64748B">Engineering &amp; Research Library · ${escapeXml(dateStr)}</text>
    </g>
  </g>

  <!-- Right Visual Illustration Component -->
  ${heroArt}
</svg>`;
}

// Generate Category Fallback SVGs
export function generateFallbackSvgs() {
  const fallbackConfigs = [
    { cat: 'auto', title: 'Automotive Engineering & Systems', slug: 'fallback-auto' },
    { cat: 'technology', title: 'Software Engineering & AI Architecture', slug: 'fallback-technology' },
    { cat: 'finance', title: 'Quantitative Valuation & Market Models', slug: 'fallback-finance' },
    { cat: 'product', title: 'Product Discovery & Systems Design', slug: 'fallback-product' },
    { cat: 'default', title: 'Engineering & Technical Publication Library', slug: 'fallback-default' }
  ];

  const results = [];
  for (const c of fallbackConfigs) {
    const svg = generateCoverSvg({
      title: c.title,
      slug: c.slug,
      category: c.cat === 'default' ? 'technology' : c.cat,
      tags: [c.cat.toUpperCase(), 'RESEARCH GUIDE'],
      series: 'Aniket.app Technical Reference'
    });
    
    // Save to assets and public
    const p1 = path.join(ROOT, 'assets/images/fallback', `${c.slug}.svg`);
    const p2 = path.join(ROOT, 'apps/web/public/assets/images/fallback', `${c.slug}.svg`);
    fs.mkdirSync(path.dirname(p1), { recursive: true });
    fs.mkdirSync(path.dirname(p2), { recursive: true });
    fs.writeFileSync(p1, svg, 'utf8');
    fs.writeFileSync(p2, svg, 'utf8');
    results.push(p1);
  }
  return results;
}

// Batch Generator & Manifest Builder
export async function runCoverGeneration(options = {}) {
  const YAML = (await import('yaml')).default;
  const forceAll = options.all || false;
  const waveOnly = options.waveOnly ?? true;

  console.log('--- GENERATING CATEGORY FALLBACK COVERS ---');
  const fallbacks = generateFallbackSvgs();
  console.log(`Generated ${fallbacks.length} fallback SVGs in assets/images/fallback/`);

  console.log('--- SCANNING ARTICLES FOR COVER REGENERATION ---');
  const categories = ['auto', 'technology', 'finance', 'product'];
  const manifest = [];
  let regeneratedCount = 0;
  let skippedCount = 0;

  for (const cat of categories) {
    const dir = path.join(ROOT, 'data/blog', cat);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!m) continue;

      const data = YAML.parse(m[1]);
      const slug = data.slug;
      const title = data.title;
      const tags = data.tags || [];
      const coverRel = data.coverImage || `/assets/images/blog/${slug}/cover.svg`;
      const coverPath = path.join(ROOT, coverRel.replace(/^\//, ''));
      const pubCoverPath = path.join(ROOT, 'apps/web/public', coverRel.replace(/^\//, ''));

      let needsRegeneration = false;

      if (!fs.existsSync(coverPath) || forceAll) {
        needsRegeneration = true;
      } else {
        const existing = fs.readFileSync(coverPath, 'utf8');
        const isWavePlaceholder = existing.includes('WAVE 1') || 
                                  existing.includes('WAVE 2') || 
                                  (existing.length < 2000 && !existing.includes('viewBox="0 0 1200 675"')) ||
                                  existing.includes('viewBox="0 0 1200 630"');
        if (isWavePlaceholder && (waveOnly || forceAll)) {
          needsRegeneration = true;
        }
      }

      const visualInfo = selectVisualSystem(cat, title, slug, tags);

      if (needsRegeneration) {
        const svg = generateCoverSvg({
          title,
          slug,
          category: cat,
          tags,
          series: data.series || 'Technical Library · Verified Research',
          dateStr: data.datePublished || 'November 2026',
          author: data.author || 'Aniket Thakur'
        });

        fs.mkdirSync(path.dirname(coverPath), { recursive: true });
        fs.mkdirSync(path.dirname(pubCoverPath), { recursive: true });
        fs.writeFileSync(coverPath, svg, 'utf8');
        fs.writeFileSync(pubCoverPath, svg, 'utf8');
        regeneratedCount++;
      } else {
        skippedCount++;
        // Ensure present in public as well
        if (fs.existsSync(coverPath) && !fs.existsSync(pubCoverPath)) {
          fs.mkdirSync(path.dirname(pubCoverPath), { recursive: true });
          fs.copyFileSync(coverPath, pubCoverPath);
        }
      }

      manifest.push({
        slug,
        title,
        category: cat,
        tags,
        assetPath: coverRel,
        viewBox: '0 0 1200 675',
        aspectRatio: '16:9',
        dimensions: { width: 1200, height: 675 },
        visualSystem: cat,
        visualTemplate: visualInfo.type,
        visualLabel: visualInfo.label,
        generationMethod: 'deterministic-vector-engine',
        assetOrigin: 'original-procedural-vector',
        regenerated: needsRegeneration
      });
    }
  }

  // Save Manifests
  const manifestData = {
    version: 1,
    generatedAt: new Date().toISOString(),
    totalArticles: manifest.length,
    aspectRatio: '16:9',
    standards: { width: 1200, height: 675, format: 'svg' },
    articles: manifest
  };

  const manifestPath = path.join(ROOT, 'data/article_covers_manifest.json');
  const pubManifestPath = path.join(ROOT, 'apps/web/public/article_covers_manifest.json');
  const genManifestPath = path.join(ROOT, 'apps/web/generated/article_covers_manifest.json');

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.mkdirSync(path.dirname(pubManifestPath), { recursive: true });
  fs.mkdirSync(path.dirname(genManifestPath), { recursive: true });

  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
  fs.writeFileSync(pubManifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
  fs.writeFileSync(genManifestPath, JSON.stringify(manifestData, null, 2), 'utf8');

  console.log(`\nCover Generation Summary:`);
  console.log(`- Total articles processed: ${manifest.length}`);
  console.log(`- Regenerated high-craft SVGs: ${regeneratedCount}`);
  console.log(`- Existing verified SVGs preserved: ${skippedCount}`);
  console.log(`- Manifest saved to ${manifestPath}`);
}

// Auto-run when invoked directly from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const forceAll = process.argv.includes('--all');
  runCoverGeneration({ all: forceAll, waveOnly: true })
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Fatal error during cover generation:', err);
      process.exit(1);
    });
}

