/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:eslint-comments/recommended",
		"plugin:n/recommended",
		"plugin:perfectionist/recommended-natural",
		"plugin:regexp/recommended",
	],
	overrides: [
		{
			extends: ["plugin:markdown/recommended"],
			files: ["**/*.md"],
			processor: "markdown/markdown",
			rules: {
				"eslint-comments/disable-enable-pair": "off",
			},
		},
		{
			extends: [
				"plugin:jsdoc/recommended-typescript-error",
				"plugin:@typescript-eslint/strict",
				"plugin:@typescript-eslint/stylistic",
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"jsdoc/informative-docs": "error",
				"logical-assignment-operators": [
					"error",
					"always",
					{ enforceForIfStatements: true },
				],
				"operator-assignment": "error",

				// These on-by-default rules don't work well for this repo and we like them off.
				"jsdoc/require-jsdoc": "off",
				"jsdoc/require-param": "off",
				"jsdoc/require-property": "off",
				"jsdoc/require-returns": "off",
			},
		},
		{
			excludedFiles: ["**/*.md/*.ts"],
			extends: [
				"plugin:@typescript-eslint/strict-type-checked",
				"plugin:@typescript-eslint/stylistic-type-checked",
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"deprecation/deprecation": "error",
				"eslint-comments/disable-enable-pair": "off",
			},
		},
		{
			excludedFiles: ["package.json"],
			extends: ["plugin:jsonc/recommended-with-json"],
			files: ["*.json", "*.jsonc"],
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error",
			},
		},
		{
			files: ["*.jsonc"],
			rules: {
				"jsonc/no-comments": "off",
			},
		},
		{
			files: "**/*.test.ts",
			rules: {
				// These on-by-default rules aren't useful in test files.
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
			},
		},
		{
			extends: ["plugin:yml/standard", "plugin:yml/prettier"],
			files: ["**/*.{yml,yaml}"],
			parser: "yaml-eslint-parser",
			rules: {
				"yml/file-extension": ["error", { extension: "yml" }],
				"yml/sort-keys": [
					"error",
					{
						order: { type: "asc" },
						pathPattern: "^.*$",
					},
				],
				"yml/sort-sequence-values": [
					"error",
					{
						order: { type: "asc" },
						pathPattern: "^.*$",
					},
				],
			},
		},
		{
			files: ["./examples/sse/**/*.ts"],
			rules: {
				"n/no-missing-import": "off",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"deprecation",
		"jsdoc",
		"no-only-tests",
		"perfectionist",
		"regexp",
		"vitest",
	],
	reportUnusedDisableDirectives: true,
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.

		"@typescript-eslint/no-unused-vars": "off",
		"eslint-comments/disable-enable-pair": "off",
		"no-only-tests/no-only-tests": "error",

		// These on-by-default rules don't work well for this repo and we like them off.
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", next: "*", prev: "block-like" },
		],
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"no-inner-declarations": "off",

		// Stylistic concerns that don't interfere with Prettier

		"no-mixed-spaces-and-tabs": "off",
		"perfectionist/sort-objects": [
			"error",
			{
				order: "asc",
				"partition-by-comment": true,
				type: "natural",
			},
		],
	},
};
