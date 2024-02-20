# 贡献指南

感谢你考虑为 Resolid Remix 做出贡献

## 步骤

1. 克隆存储库
   `git clone https://github.com/huijiewei/resolid-remix.git`

2. 安装依赖
   `pnpm install`

3. 本地运行
   `pnpm run --filter website dev`

## Git 提交规范

Resolid Remix 的子项目都使用 Git 的子树管理

### commit message 格式

一个个规范的 commit message 表明了对项目的用心, 所以我们使用 `commitlint` 工具对 commit message 限定了格式

```
<type>(<scope?>): <subject>
<body?>
<footer?>
```

type 有以下几个值:

- `feat`: 表示增加了新功能
- `fix`: 表示修复了一个 BUG
- `build`: 用于修改项目构建系统, 例如修改依赖, 外部接口等
- `ci`: 用于修改持续集成流程, 例如修改 Travis,Jenkins,Github Action 等工作流配置
- `chore`: 用于对非业务性代码进行修改, 例如修改构建流程或者工具配置等
- `docs`: 用于修改文档, 例如修改 README 文件, API 文档等
- `style`: 用于修改代码的样式, 例如调整缩进, 空格, 空行等
- `refactor`: 用于重构代码, 例如修改代码结构, 变量名, 函数名等但不修改功能逻辑
- `revert`: 回退版本
- `perf`: 用于优化性能, 例如提升代码的性能, 减少内存占用等
- `test`: 用于修改测试用例, 例如添加, 删除, 修改代码的测试用例等

更多详细资料可以查看 [约定式提交](https://www.conventionalcommits.org/zh-hans)
