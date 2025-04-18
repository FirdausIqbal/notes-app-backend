import globals from "globals";
import pluginJs from "@eslint/js";
// import daStyle from "eslint-config-dicodingacademy"


export default [
  {
    files: ["**/*.js"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  },
  pluginJs.configs.recommended,
];