# @resolid/config

Resolid 通用配置, 包含了 `TypeScript`, `ESLint` 和 `Prettier` 的基础配置

## 使用方法

### 安装

```bash
pnpm i -D eslint prettier @resolid/config
```

### TypeScript 配置

增加下面内容到 `tsconfig.json`

#### 普通项目

```json
{
  "extends": "@resolid/config/tsconfig.base"
}
```

#### React 项目

```json
{
  "extends": "@resolid/config/tsconfig.react"
}
```

### ESLint 配置

本配置包是纯 ESM 包, 并使用了 ESLint 扁平配置, 需要使用 `eslint.config.js` 文件来进行配置

语言选项默认为 `ecmaVersion: 2022`, `sourceType: 'module'`

#### TypeScript Lint 配置

```js
// eslint.config.js
import eslintTypescript from "@resolid/config/eslint.typescript";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [...eslintTypescript];
```

#### React Lint 配置

```js
// eslint.config.js
import eslintReact from "@resolid/config/eslint.react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [...eslintReact];
```

### ESLint 环境设置

```js
// eslint.config.js

// 浏览器环境
import eslintBowser from "@resolid/config/eslint.bowser";

// Node 环境
import eslintNode from "@resolid/config/eslint.node";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [...eslintBowser, ...eslintNode];
```

### Prettier 配置

Prettier 会自动导入 `.editorconfig` 的配置, 所以推荐先进行 editorconfig 配置, 另外内置了 `prettier-plugin-organize-imports` 插件

```editorconfig
# .editorconfig
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

```js
// .prettierrc.js
import prettierConfig from "@resolid/config/prettier";

/** @type {import('prettier').Options} */
export default {
  ...prettierConfig,
};
```
