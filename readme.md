# ⏰ 60s API v2

一系列 **高质量、开源、可靠、全球 CDN 加速的** 开放 API 集合，使用 [Deno](https://deno.com/) 构建，托管在 [Deno Deploy](https://deno.com/deploy) 上，也支持 [Cloudflare Workers](https://www.cloudflare.com/zh-cn/developer-platform/products/workers/)、[Bun](https://bun.sh/) 和 [Node.js](https://nodejs.org/) 部署。

> v1 版本已于 2025/1/15 停止更新，在 [v1-legacy](https://github.com/vikiboss/60s/tree/v1-legacy) 分支上，请尽快迁移至 v2 版本，v1 版本将于 2025/6/31 完全停止服务，届时域名会切换到 v2 版本。

## 🤔️ 起因

参考 [这篇文章](https://xlog.viki.moe/60s) 了解更多。

## ⚖️ API 实现原则和使用建议

- 只采用官方、权威的数据源头，保证准确性和可用性
- 对日更数据采取缓存加速策略，对用户无感、毫秒级响应
- 为了追求更快的响应，可以查看源码，直接访问对应 API 的原 API 数据（但原始数据量大、字段繁多，不易处理）

> 待续

## 🍱 API 包含哪些？

目前包含的接口如下，仍在持续增加中...

> 可直接访问 https://60s-api.viki.moe (备用域名 https://60s-api.114128.xyz) 查看所有可用的 API Endpoints。

- ⏰ 日更资讯
  - 🌍 每天 60 秒读懂世界
  - 🏞️ 必应每日壁纸（Bing）
  - 💰 当日货币汇率
  - 📅 历史上的今天
- 🎉 热搜榜单
  - 📺 哔哩哔哩热搜榜
  - 🦊 微博热搜榜
  - ❓ 知乎热门话题
  - 🎵 抖音热搜榜
  - 📰 头条热搜榜
- 🚀 实用功能
  - 🎮 Epic Games 免费游戏
  - ❓ 百度百科词条
  - 🌍 在线翻译（支持 109 种语言）
  - 📡 公网 IP 地址
  - 🐦 链接 [OG](https://ogp.me/) 信息
  - 🌈 哈希/解压/压缩（包含 `md5`、`base64`、`URL`、`GZIP` 等）
- 😄 消遣娱乐
  - 💬 随机一言
  - ✨ 随机运势
  - 🎤 随机唱歌音频
  - 🤣 随机搞笑段子
  - 🤭 随机发病文学
  - 📖 随机答案之书
- ... 更多功能持续增加中

## 🧩 API 文档

API 文档已公开托管在 [Apifox](https://docs.60s-api.viki.moe) 上，可在线调试、生成业务代码、查看接口参数等。

- 主域名: https://60s-api.viki.moe （部分地区可能被墙）
- 备用域名: https://60s-api.114128.xyz

## 💻 本地部署

### Deno

```bash
deno install && deno run -A deno.ts
```

### Bun

```bash
bun install && bun run bun.ts
```

### Node.js

> 要求 Node.js 版本 >= 22.6 以支持 `--experimental-strip-types` 参数来执行 TypeScript 文件

```bash
npm install && node --experimental-strip-types node.ts
```

### Cloudflare Workers

```bash
wrangler publish
```

## 🧑‍🤝‍🧑 用户群

