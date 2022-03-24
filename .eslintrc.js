module.exports = {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended",
      "@vue/typescript/recommended",
    //   "@vue/prettier",
    //   "@vue/prettier/@typescript-eslint"
    ],
    "parserOptions": {
      "ecmaVersion": 2020
    },
    "rules": {
        "indent": 2, //缩进风格
        "no-unused-vars": 0, //不允许有声明后未使用的变量或者参数
        "no-var": 0, //禁用var，用let和const代替
        "key-spacing": [ //对象字面量中冒号的前后空格
            2,
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "comma-spacing": [ //逗号前后的空格
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        "no-mixed-spaces-and-tabs": [ //禁止混用tab和空格
            2,
            "smart-tabs"
        ],
        "no-multiple-empty-lines": [ //空行最多不能超过2行
            2,
            {
                "max": 2
            }
        ],
        // "no-console": 2, //禁止使用console
        "no-undef": 0, //不允许未声明的变量
        "no-useless-escape": 0, //
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-this-alias": ["off"]
    },
    "overrides": [
      {
        "files": [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)"
        ],
        "env": {
          "mocha": true
        }
      }
    ]
};
