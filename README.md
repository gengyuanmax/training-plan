# Max Training

个人训练计划的手机网页版。基于 [workout_plan_v5.1.md](source/workout_plan_v5.1.md)(健身房 + 出差,当前主版本)+ [workout_plan_v6.md](source/workout_plan_v6.md)(居家版)+ [body_baseline_2026-05_v3.md](source/body_baseline_2026-05_v3.md) 渲染。

---

## 文件结构

```
max-training/
├── index.html      UI + 渲染逻辑(基本不动)
├── data.js         全部训练数据(以后所有迭代都改这个)
├── README.md       本文件
├── UPDATING.md     如何修改数据的详细手册
├── .gitignore
└── source/
    ├── workout_plan_v5.1.md         当前主计划 (健身房 + 出差,含 E-Push)
    ├── workout_plan_v6.md           居家版来源 (A-H / B-H / C-H / D-H)
    ├── workout_plan_v5.md           历史版本
    └── body_baseline_2026-05_v3.md  身体基线
```

---

## 部署到手机:GitHub Pages 步骤

完整流程从零开始,约 10 分钟。

### 1. 准备 GitHub 账号

如果没有,去 https://github.com 注册免费账号。

### 2. 新建仓库

- 点右上角 + → New repository
- Repository name: `max-training` (或你想要的名字)
- **Public**(免费版 Pages 必须 public,但仓库里没敏感信息,只有训练数据,问题不大)
- 不勾选任何初始化选项
- Create repository

### 3. 上传文件

最简单方式 — 用网页拖拽:

- 进入新建的空仓库
- 点 "uploading an existing file" 链接
- 把整个文件夹的内容拖进去:`index.html`、`data.js`、`README.md`、`UPDATING.md`、`.gitignore`、`source/` 文件夹
- 底部 commit 信息写"initial commit"
- 点 "Commit changes"

或者用 git 命令行(进阶):

```bash
cd max-training
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<你的用户名>/max-training.git
git push -u origin main
```

### 4. 开启 GitHub Pages

- 进入仓库的 Settings(顶部菜单最右)
- 左侧菜单找到 Pages
- Source: Deploy from a branch
- Branch: `main` / `(root)`
- Save

等 1-3 分钟,刷新这个页面会看到一行绿色:`Your site is live at https://<用户名>.github.io/max-training/`

### 5. 加到手机主屏

- iPhone Safari 打开 URL
- 底部分享按钮 → "添加到主屏幕"
- 给个名字,比如 "训练"
- 主屏出现图标,点开像 native app 一样全屏运行

Android Chrome:打开 URL → 右上角菜单 → "添加到主屏幕" 或 "安装应用"

### 6. 完成

以后:
- 改了 `data.js` 推送 → 手机下次打开自动是新版
- 想增删动作、改组数 → 改 `data.js` 即可
- 不需要重新部署、不需要点 button

---

## 日常更新流程

### 方式 A:直接在 GitHub 网页改(最方便)

适合改几个数字、动作组数、备注。

1. GitHub 仓库页打开 `data.js`
2. 右上角点铅笔图标(Edit this file)
3. 改内容,例如把 `{ id: 'rdl', sets: 4, reps: '8-10' }` 改成 `{ id: 'rdl', sets: 5, reps: '6-8' }`
4. 底部填一行 commit 信息,例如 "RDL 加重"
5. Commit changes
6. 等 1-2 分钟 GitHub Pages 重新部署
7. 手机上力下拉刷新就拿到新版

### 方式 B:把整个新计划交给 Claude 处理

适合每次大版本更新(v5 → v6 → v7)。

1. 复制改好的 `workout_plan_v6.md` 给 Claude
2. 一句话:"按照这个 v6 把 data.js 重新生成"
3. Claude 会输出新 data.js,你复制粘贴到 GitHub 网页编辑器里
4. Commit changes
5. 同时把新的 markdown 文件也存到 `source/` 文件夹

### 方式 C:本地编辑(适合熟悉 git)

```bash
git pull
# 编辑 data.js
git add data.js
git commit -m "update"
git push
```

---

## 缓存问题(很少遇到,但要知道)

如果手机上改了之后看不到新内容:

1. **下拉刷新**——iOS Safari 在页面顶部下拉即可
2. **从主屏图标启动 vs 在 Safari 打开**——主屏图标缓存更激进,实在不行 Safari 重开
3. **核武器**:Safari 设置 → 高级 → 网站数据 → 清掉这个域名的数据 → 重新打开

底部 footer 显示 `MAX · TRAINING · v5 · 2026.05.14` 里的日期就是 `data.js` 里的 `DATA_VERSION`,你能立刻看出加载的是新版还是旧版。

---

## 数据修改入口

每次想改内容,先看 `UPDATING.md`,里面列了所有常见改法的具体步骤:

- 改组数 / 次数 / 备注
- 加新动作
- 加新版本(比如 A.3)
- 改一周排程
- 改营养、抑制协议(在 index.html 里)

---

## 隐私说明

仓库默认 Public(GitHub 免费版要求)。里面有:
- ✅ 训练动作和组数 — 没问题,公开训练计划很正常
- ⚠️ `source/body_baseline_2026-05_v3.md` — 含体重估算、体脂估算、身体评估

**两种选择**:

**A. 不在意公开**(最简单):直接传上去。

**B. 想隐藏身体数据**:
- 把 `source/body_baseline_2026-05_v3.md` 加到 `.gitignore`
- 这个文件只存本地,不推送
- 仓库里只有训练相关内容

如果想 **整个仓库私有 + Pages 部署**,要么:
- 升级 GitHub Pro ($4/月)支持 private Pages
- 或者改用 **Cloudflare Pages**(免费,支持私有 GitHub 仓库)

---

## 版本历史

- **v5**(2026-05):初版 web 化。基于 workout_plan_v5.md
- **v6**(2026-05):新增所有模块的居家版(A-H / B-H / C-H / D-H)
- **v5.1**(2026-05-21,当前):推日重排 + 肩袖激活 + E-Push 出差推日专用版
  - B 模块:External Rotation 开头必做,胸容量补足,去 Lateral Raise 冗余
  - E 模块:新增 E-Push(对标 B 模块结构),E.0/E.1 热身加肩袖激活
  - 居家版(A-H/B-H/C-H/D-H)从 v6 保留
