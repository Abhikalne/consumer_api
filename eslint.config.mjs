import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,

  {
    settings: {
      react: { version: "detect" },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      indent: ["error", 4],
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    },
  },
];
