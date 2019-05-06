import * as numeral from "numeral";
import { DynamicFormat } from "./DynamicFormat";

const memoize =  require("lodash.memoize");

// Usage of '0' makes dynamic format be the first to consider when 'Numeral.format' is called
export const DYNAMIC_FORMAT_IDENTIFIER = "0";

const formatterFactory = memoize(function formatterFactory(format: string) {
  const dynamicFormats = format.split("|").map(format => DynamicFormat.parse(format));
  const orderedFormats = dynamicFormats.sort((lhs, rhs) => rhs.threshold - lhs.threshold);

  return function dynamicFormatter(value: number) {
    let matching = orderedFormats.find(dynamic => value >= dynamic.threshold) || dynamicFormats[0];

    return numeral(value).format(matching.format);
  };
});

export function registerDynamicFormat() {
  return numeral.register("format", DYNAMIC_FORMAT_IDENTIFIER, {
    regexps: {
      format: /(\|)/,
      unformat: /(\|)/
    },
    format: (value, format) => {
      const formatter = formatterFactory(format);

      return formatter(value);
    },
    unformat: function(string) {
      return numeral(string).value();
    }
  });
}
