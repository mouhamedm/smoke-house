import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Custom brand-* tokens are defined in globals.css @theme (Tailwind v4).
      // The ESLint Tailwind plugin doesn't read CSS-defined tokens, so we silence it.
      "@next/next/no-html-link-for-pages": "off",
      
      // French text uses a lot of apostrophes. Disabling unescaped entities rule to allow normal text writing.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
