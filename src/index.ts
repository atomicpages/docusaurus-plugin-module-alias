import { object, record, string, optional, define, is } from "superstruct";
import type {
  Plugin,
  DocusaurusContext,
  OptionValidationContext,
} from "@docusaurus/types";

type CustomizeRuleString = "match" | "merge" | "append" | "prepend" | "replace";

type Options = {
  alias: Record<string, string>;
  mergeStrategy?: Record<string, CustomizeRuleString>;
};

const BLACKLIST = [
  "@site",
  "@generated",
  "@docusaurus",
  "~docs",
  "~blog",
  "~pages",
  "~debug",
] as const;

const WhitelistedString = define<string>("WhitelistedString", (value) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  return !BLACKLIST.includes(value as any);
});

const name = "docusaurus-plugin-local-resolve";

export default function plugin(
  _: DocusaurusContext,
  { alias, mergeStrategy }: Options,
): Plugin<void> {
  return {
    name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    configureWebpack() {
      return {
        mergeStrategy,
        resolve: {
          alias,
        },
      };
    },
  };
}

const optionSchema = object({
  alias: record(WhitelistedString, string()),
  mergeStrategy: optional(record(string(), string())),
});

export const validateOptions = ({
  options, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Omit<OptionValidationContext<Options, any>, "validate">): boolean => {
  return is(options, optionSchema);
};
