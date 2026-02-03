import tseslint from "typescript-eslint";
import eslintPluginTurbo from "eslint-plugin-turbo";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            semi: "warn",
            "no-empty": "off",
            "prefer-const": "off",
            "no-unused-vars": "off",
        },
    },
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-empty-function": "off",
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
        plugins: {
            turbo: eslintPluginTurbo,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "error",
        },
    },

    eslintConfigPrettier,
];
