# Jiaxin Fang — Personal Homepage

A locally built, English-only personal website. The homepage now follows the layout and typography of [Junqi Jing’s website](https://yuankjing.github.io/JunqiJing/), with a lively green and blue palette and Jiaxin Fang’s supplied personal information.

## 本地构建与预览

需要 Node.js 20 或更新版本，无第三方构建依赖。

```bash
npm run build
npm run preview
```

打开 http://127.0.0.1:4173 。修改源文件后重新构建并刷新页面。`npm run dev` 会先构建再启动服务；可以通过 `PORT=8080 npm run preview` 更改端口。

构建会验证生成页面引用的本地页面、图片和字体是否存在。所有资源均使用相对路径，适用于 GitHub Pages 的域名根目录和仓库子目录。

## 本次样式

- 桌面端：232px 固定左侧导航、16:9 全宽横幅、横向身份栏。
- 正文：方形头像与 Biography 双列、News 列表、联系区和页脚。
- 手机端：68px 顶栏、可展开菜单和单列正文。
- 尺寸、间距、圆角、断点和横幅标题动效依据参考页实现；横幅标题使用 Cabinet Grotesk Bold。
- 配色为翠绿到海蓝的侧栏、浅薄荷绿正文与蓝绿色联系区。

导航包含 About me、Research、Publication、Robot Demos、Hobbies，以及 News 列表页。未提供的内容显示待补充；不会虚构论文、经历或外部链接。

## 内容入口

- `src/profile.mjs`：姓名、身份、简介、邮箱、社交链接，以及项目、论文、演示、爱好和动态。
- `src/reference.css`：保留的参考页样式基底；来源记录见下方。
- `src/styles.css`：本站配色、独立导航壳和头像占位样式。
- `src/app.js`：手机菜单和手写标题动效。
- `scripts/build.mjs`：生成 6 个静态页面并验证本地资源。
- `assets/`：本地字体、横幅、favicon，可在此添加头像和项目图片。
- `dist/`：构建结果，不要直接修改。

当前头像为 `assets/IMG_4058.jpeg`；可在 `src/profile.mjs` 的 `avatar` 字段中替换。

项目、论文、演示、爱好的条目格式：

```js
{ title: 'Title', description: 'Description', url: 'https://example.com/', image: 'assets/project.jpg' }
```

`url` 和 `image` 可省略。动态格式：

```js
{ date: 'Oct 2026', text: 'Update text', url: '' }
```

## 当前横幅

当前网页使用 `assets/home-palms-hd.png`：通过内置 imagegen 对用户照片进行 AI 细节增强的横幅版本，实际输出 **1672 × 941**，并非原生 4K。保持 16:9 展示；AI 重建的树叶、草地等细节可能与原照片略有差异。

原始照片完整保留在 `assets/home-palms.jpg`（1440 × 1427），是 `/Users/f66/Downloads/20261010-052328.jpg` 的原样副本。最终增强提示词见 `assets/home-palms-hd-wide.prompt.txt`。

## 参考资源与署名

按用户要求对齐参考网站，以下公开资源于 2026-10-10 从 https://yuankjing.github.io/JunqiJing/ 获取：

- `src/reference.css`：改编自该站 `css/custom.min.b602c72f070868771f9a63a5654ed0ed62bed7b975824a015fb2150b36ae6f6a.css`；本地字体路径已调整，未用到的两条字体声明已移除。
- `assets/home-motorcycle.webp`（旧参考图，当前页面不再使用）：该站 `media/portfolio/home-motorcycle_hu492259050483401407.webp`；原摄影署名为 **Photographed by JJ**。此图已被用户提供的照片替换，页面上也已移除旧署名。
- `assets/fonts/`：从该站 `fonts/` 取得的 Atkinson Hyperlegible、IBM Plex Mono、Newsreader、Caveat、Allura 和 Lato 字体文件。

参考作者的个人经历、联系方式、头像和项目资料未用于本站。原版原创山水 SVG 仍保存在 `assets/landscape.svg`，当前页面未引用。

## GitHub Pages 发布

源码仓库：https://github.com/jxfang04/self-page

网站地址：https://jxfang04.github.io/self-page/

`.github/workflows/pages.yml` 在推送到 `main` 时自动构建、验证并部署 `dist/`。也可在 GitHub Actions 中手动运行。仓库 Settings → Pages 的 Source 使用 GitHub Actions。

本地预览截图、生成目录和已从照片墙移除的攀岩照不纳入版本控制。

当前横幅字体：`assets/fonts/cabinet-grotesk-700.woff2`，来自 Fontshare 官方 CDN：https://www.fontshare.com/fonts/cabinet-grotesk 。使用条款：https://www.fontshare.com/licenses 。原 Baloo 2 字体与许可保留，当前页面不再使用。
