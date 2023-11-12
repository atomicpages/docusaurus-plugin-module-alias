/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, it, expect } from "vitest";
import plugin, { validateOptions } from "./index";
import type { DocusaurusContext } from "@docusaurus/types";

describe("module alias tests", () => {
  describe("validateOptions", () => {
    it.each([
      {
        valid: true,
        options: {
          alias: {
            "@foo": "bar",
          },
        },
      },
      {
        valid: false,
        options: {
          alias: {
            "@site": "foo",
          },
        },
      },
      {
        valid: false,
        options: {
          alias: {
            "~blog": "foo",
          },
        },
      },
      {
        valid: true,
        options: {
          alias: {},
        },
      },
      {
        valid: false,
        options: {
          alias: null,
        },
      },
    ])("should validate options: %o", ({ options, valid }) => {
      expect(validateOptions({ options } as any)).toBe(valid);
    });
  });

  describe("plugin tests", () => {
    it("should return the correct webpack config", () => {
      const p = plugin({} as DocusaurusContext, {
        mergeStrategy: {
          foo: "append",
        },
        alias: {
          "@foo": "foo",
        },
      });

      expect(p).toMatchObject({
        name: "docusaurus-plugin-local-resolve",
        configureWebpack: expect.any(Function),
      });

      // eslint-disable-next-line @typescript-eslint/ban-types
      const anyFn = p.configureWebpack as Function;

      expect(anyFn()).toMatchObject({
        mergeStrategy: { foo: "append" },
        resolve: {
          alias: {
            "@foo": "foo",
          },
        },
      });
    });
  });
});
