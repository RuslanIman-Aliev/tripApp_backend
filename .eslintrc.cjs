module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // или 2021/2022 — поддерживает optional chaining
    sourceType: "module",
  },
  extends: ["airbnb-base", "prettier", "plugin:node/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": ["error", { props: false }],
    "prefer-destructuring": ["error", { object: true, array: false }],
    "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next|val" }],
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
  },
};
