import js from "@eslint/js";
import tseslint from "typescript-eslint";
import turbo from "eslint-plugin-turbo";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** Shared base config for all TypeScript packages. */
export const baseConfig = [
  {
    ignores: [
      "dist/**",
      ".next/**",
      "node_modules/**",
      "storybook-static/**",
      "coverage/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node } },
    plugins: { turbo },
    rules: { "turbo/no-undeclared-env-vars": "warn" },
  },
  prettier,
];

export default baseConfig;
