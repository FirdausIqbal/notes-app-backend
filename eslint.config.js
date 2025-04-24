import globals from "globals";
import pluginJs from "@eslint/js";
// import daStyle from "eslint-config-dicodingacademy"


export default [
  {
    files: ["**/*.js"],
    languageOptions: { globals: {
      ...globals.node,
    } },
  },{
    rules: {
      "no-unsued-vars": "off",
      "no-useless-catch": "off"
  }
  },
  pluginJs.configs.recommended,
];