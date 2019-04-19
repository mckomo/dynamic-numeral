import { assert } from "chai";
import { DynamicFormat } from "../src/DynamicFormat";

describe("DynamicFormat", function() {
  it("is serializable", () => {
    const dynamicFormat = new DynamicFormat("$0.0a", 1000);

    assert.equal(dynamicFormat.toJSON(), "$0.0a@1000");
  });

  it("is parsable", () => {
    const dynamicFormat = DynamicFormat.parse("$0.0a@1k");

    assert.equal(dynamicFormat.format, "$0.0a");
    assert.equal(dynamicFormat.threshold, 1000);
  });
});
