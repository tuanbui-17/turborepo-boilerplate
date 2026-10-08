import next from "@next/eslint-plugin-next";
import { reactConfig } from "./react.js";

/** Config for the Next.js app. */
export const nextConfig = [
  ...reactConfig,
  { ignores: ["next-env.d.ts"] },
  {
    plugins: { "@next/next": next },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
];

export default nextConfig;
