import assert from "node:assert/strict";
import test from "node:test";
import { archiveState } from "../lib/archive";

test("archive canonical preserves valid pagination and cleans page one", () => {
  assert.equal(archiveState("all").canonical, "/blog/");
  assert.equal(archiveState("all", { page: "1" }).canonical, "/blog/");
  assert.equal(archiveState("all", { page: "2" }).canonical, "/blog/?page=2");
  for (const category of archiveState("all").categories) {
    assert.equal(archiveState(category).canonical, `/blog/${category}/`);
    if (archiveState(category).totalPages > 1)
      assert.equal(archiveState(category, { page: "2" }).canonical, `/blog/${category}/?page=2`);
  }
});

test("invalid pages cannot duplicate the last archive page", () => {
  for (const page of ["0", "-1", "2garbage", "1.5", "999999", "Infinity", ["1", "2"]]) {
    assert.throws(() => archiveState("all", { page }));
  }
  assert.throws(() => archiveState("nonexistent"));
});
