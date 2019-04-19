import * as numeral from "numeral";
import { assert } from "chai";
import { registerDynamicFormat } from "../src/registration";

registerDynamicFormat();

describe("Registered dynamic format", function() {
  it("works with multiple formats", () => {
    const multipleFormats = "0.000|0.10|1.0|10";

    const results = [
      numeral(0.002).format(multipleFormats),
      numeral(0.167).format(multipleFormats),
      numeral(1.52).format(multipleFormats),
      numeral(11.231).format(multipleFormats)
    ];

    assert.equal(results[0], "0.002");
    assert.equal(results[1], "0.17");
    assert.equal(results[2], "1.5");
    assert.equal(results[3], "11");
  });

  it("works with threshold definition", () => {
    const multipleFormats = "0.0000|0.000@0.1|0.00@1|0.0@1.5|0@2";

    const results = [
      numeral(0.00005).format(multipleFormats),
      numeral(0.2212).format(multipleFormats),
      numeral(1.111).format(multipleFormats),
      numeral(1.51).format(multipleFormats),
      numeral(2.1).format(multipleFormats)
    ];

    assert.equal(results[0], "0.0001");
    assert.equal(results[1], "0.221");
    assert.equal(results[2], "1.11");
    assert.equal(results[3], "1.5");
    assert.equal(results[4], "2");
  });

  it("works with currency formats", () => {
    const complexFormats = "$0.00|$1000.0a";

    const results = [
      numeral(999.99).format(complexFormats),
      numeral(1050.521).format(complexFormats)
    ];

    assert.equal(results[0], "$999.99");
    assert.equal(results[1], "$1.1k");
  });

  it("works with bytes formats", () => {
    const complexFormats = "0b|0.0b@1KB|0.00b@1MB";

    const results = [
      numeral(765).format(complexFormats),
      numeral(1024 + 885).format(complexFormats),
      numeral(1048576 + 512321).format(complexFormats)
    ];

    assert.equal(results[0], "765B");
    assert.equal(results[1], "1.9KB");
    assert.equal(results[2], "1.56MB");
  });

  it("does not break standard formats", () => {
    const scenarios = [
      [0, null, "0"],
      [0, "0.00", "0.00"],
      [null, null, "0"],
      [NaN, "0.0", "0.0"],
      [1.23, "0,0", "1"],
      [10000, "0,0.0000", "10,000.0000"],
      [10000.23, "0,0", "10,000"],
      [-10000, "0,0.0", "-10,000.0"],
      [10000.1234, "0.000", "10000.123"],
      [10000, "0[.]00", "10000"],
      [10000.1, "0[.]00", "10000.10"],
      [10000.123, "0[.]00", "10000.12"],
      [10000.456, "0[.]00", "10000.46"],
      [10000.001, "0[.]00", "10000"],
      [10000.45, "0[.]00[0]", "10000.45"],
      [10000.456, "0[.]00[0]", "10000.456"],
      [10000, "(0,0.0000)", "10,000.0000"],
      [-10000, "(0,0.0000)", "(10,000.0000)"],
      [-12300, "+0,0.0000", "-12,300.0000"],
      [1230, "+0,0", "+1,230"],
      [1230, "-0,0", "1,230"],
      [-1230, "-0,0", "-1,230"],
      [-1230.4, "0,0.0+", "1,230.4-"],
      [-1230.4, "0,0.0-", "1,230.4-"],
      [1230.4, "0,0.0-", "1,230.4"],
      [100.78, "0", "101"],
      [100.28, "0", "100"],
      [1.932, "0.0", "1.9"],
      [1.9687, "0", "2"],
      [1.9687, "0.0", "2.0"],
      [-0.23, ".00", "-.23"],
      [-0.23, "(.00)", "(.23)"],
      [0.23, "0.00000", "0.23000"],
      [0.67, "0.0[0000]", "0.67"],
      [3162.63, "0.0[00000000000000]", "3162.63"],
      [1.99, "0.[0]", "2"],
      [1.0501, "0.00[0]", "1.05"],
      [1.005, "0.00", "1.01"],
      // leading zero
      [0, "00.0", "00.0"],
      [0.23, "000.[00]", "000.23"],
      [4, "000", "004"],
      [10, "00000", "00010"],
      [1000, "000,0", "1,000"],
      [1000, "00000,0", "01,000"],
      [1000, "0000000,0", "0,001,000"],
      // abbreviations
      [2000000000, "0.0a", "2.0b"],
      [1230974, "0.0a", "1.2m"],
      [1460, "0a", "1k"],
      [-104000, "0 a", "-104 k"],
      [999950, "0.0a", "1.0m"],
      [999999999, "0a", "1b"],
      // forced abbreviations
      [-5444333222111, "0,0 ak", "-5,444,333,222 k"],
      [5444333222111, "0,0 am", "5,444,333 m"],
      [-5444333222111, "0,0 ab", "-5,444 b"],
      [-5444333222111, "0,0 at", "-5 t"],
      [123456, "0.0[0] ak", "123.46 k"],
      [150, "0.0 ak", "0.2 k"]
    ];

    for (const scenario of scenarios) {
      const [value, format, expected] = scenario;

      const result = numeral(value).format(format as string);

      assert.equal(result, expected);
    }
  });
});
