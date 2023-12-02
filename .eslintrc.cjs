module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    ENVIRONMENT: true,
    "process.env": true
  },
  parserOptions: {
    project: ["./tsconfig.json"],
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"]
    },
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2021,
    sourceType: "module"
  },
  parser: "@babel/eslint-parser",
  extends: [
    "plugin:react/recommended",
    "airbnb-typescript"
  ],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "linebreak-style": 0,
    "indent": "off",
    "@typescript-eslint/indent": "off",
    "import/no-import-module-exports": 0,
    "react/jsx-uses-react": 0,
    "react/react-in-jsx-scope": 0,
    "import/prefer-default-export": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "react/function-component-definition": 0,
    "react/jsx-filename-extension": 0,
    "react/state-in-constructor": 0,
    "react/forbid-prop-types": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-one-expression-per-line": 0,
    "consistent-return": 0,
    "no-plusplus": 0,
    "default-param-last": 0,
    "no-use-before-define": 0,
    "max-len": 0,
    "prefer-regex-literals": 0,
    "react/jsx-props-no-spreading": 0,
    "no-promise-executor-return": 0,
    "react/no-array-index-key": 0,
    "class-methods-use-this": 0,
    "no-unsafe-optional-chaining": 0,
    "no-nested-ternary": 0,
    "no-underscore-dangle": 0,
    semi: ["error", "always"],
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "implicit-arrow-linebreak": 0,
    "no-unused-expressions": 0,
    "no-param-reassign": 1,
    "jsx-a11y/label-has-associated-control": 0,
    "object-curly-newline": ["error", {
      ImportDeclaration: { consistent: false, multiline: true }
    }]
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      rules: {
        "linebreak-style": 0,
        "indent": "off",
        "@typescript-eslint/indent": "off",
        "import/no-import-module-exports": 0,
        "react/jsx-uses-react": 0,
        "react/react-in-jsx-scope": 0,
        "import/prefer-default-export": 0,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "import/order": "error",
        "react/function-component-definition": 0,
        "react/jsx-filename-extension": 0,
        "react/state-in-constructor": 0,
        "react/forbid-prop-types": 0,
        "react/destructuring-assignment": 0,
        "react/jsx-one-expression-per-line": 0,
        "consistent-return": 0,
        "no-plusplus": 0,
        "default-param-last": 0,
        "no-use-before-define": 0,
        "max-len": 0,
        "prefer-regex-literals": 0,
        "react/jsx-props-no-spreading": 0,
        "no-promise-executor-return": 0,
        "react/no-array-index-key": 0,
        "class-methods-use-this": 0,
        "no-unsafe-optional-chaining": 0,
        "no-nested-ternary": 0,
        "no-underscore-dangle": 0,
        semi: ["error", "always"],
        "no-console": ["warn", { allow: ["info", "warn", "error"] }],
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "implicit-arrow-linebreak": 0,
        "no-unused-expressions": 0,
        "no-param-reassign": 1,
        "jsx-a11y/control-has-associated-label": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "object-curly-newline": ["error", {
          ImportDeclaration: { consistent: false, multiline: true }
        }],
        "import/no-extraneous-dependencies": [
          "error", {
            "devDependencies": false,
            "optionalDependencies": false,
            "peerDependencies": false
          }
        ],
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never"
          }
        ],
        "react/require-default-props": 0,
        "react/prop-types": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/no-inferrable-types": 0,
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": 0,
        "@typescript-eslint/no-unused-vars": 2,
        "no-unused-vars": 0
      }
    }
  ]
};
