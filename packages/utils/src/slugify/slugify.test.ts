import { describe, it, expect } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("lowercases and hyphenates words", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips non-alphanumeric characters", () => {
    expect(slugify("React & TypeScript!")).toBe("react-typescript");
  });

  it("collapses repeated separators and trims edges", () => {
    expect(slugify("  multiple   spaces  ")).toBe("multiple-spaces");
  });
});
