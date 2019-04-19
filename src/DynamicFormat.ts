import * as numeral from "numeral";

export interface DynamicFormat {
  format: string;
  threshold: number;
}

export class DynamicFormat {
  constructor(format: string, threshold: number) {
    this.format = format;
    this.threshold = threshold;
  }

  static parse(serializedFormat: string): DynamicFormat {
    const [dirtyFormat, dirtyThreshold] = serializedFormat.split("@").map(str => str.trim());

    const format = dirtyFormat.replace(/(?<!\.)([1-9]+0?[0-9]*)/, "0");
    const threshold = dirtyThreshold
      ? numeral(dirtyThreshold).value()
      : numeral(dirtyFormat).value();

    return new this(format, threshold);
  }

  toJSON() {
    return `${this.format}@${this.threshold}`;
  }
}
