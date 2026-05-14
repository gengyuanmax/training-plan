# 如何修改训练数据

所有训练内容都在 **`data.js`** 一个文件里。改完推送到 GitHub,手机会自动更新。

本文档列出 7 种最常见的改动,每种都有完整步骤 + 示例。

> **每次改动后,把 `DATA_VERSION` 改成今天的日期**,例如 `'2026.05.14'` → `'2026.06.20'`。这样底部 footer 能让你确认手机上拿到的是不是新版。

---

## 1. 改某个动作的组数 / 次数

最常见。比如想把 A.2 拉日的 Face Pull 从 4×15 改成 5×12。

**找到位置**:在 `data.js` 里搜索 `'A.2'`,找到 items 数组里的 face_pull 那一行。

**改前**:
```js
{ id: 'face_pull', sets: 4, reps: '15', star: true },
```

**改后**:
```js
{ id: 'face_pull', sets: 5, reps: '12', star: true },
```

注意 `reps` 是字符串(用引号),`sets` 是数字(不用引号)。

---

## 2. 改某个动作的备注

比如想给 RDL 加一条今天的提醒。

**找到位置**:搜 `rdl:` 找到动作定义本身(在 `const ex = {` 块里)。

**改前**:
```js
rdl: { name: '罗马尼亚硬拉', en: 'Romanian Deadlift (DB)', primary: ['hamstrings'], secondary: ['glutes', 'lower-back'], note: '<strong>腘绳厚度的关键动作</strong>。第一次 2×8 哑铃 10kg 测试...' },
```

**改后**(改 note 字段):
```js
rdl: { name: '罗马尼亚硬拉', en: 'Romanian Deadlift (DB)', primary: ['hamstrings'], secondary: ['glutes', 'lower-back'], note: '<strong>腘绳厚度的关键动作</strong>。已通过髋弹响测试,可以加重到 15kg。' },
```

**或者**只在某个版本里覆盖(不影响默认 note),给 plan 的 item 加 `note` 字段:

```js
{ id: 'rdl', sets: 4, reps: '8-10', star: true, note: '今天试 15kg 哑铃' },
```

---

## 3. 加新动作

比如想加一个 "Cable Pullover"(背阔孤立)。

**第一步**:在 `const ex = {` 块里加一条新动作(放在拉日那段下面):

```js
cable_pullover: {
  name: '绳索过头下拉',
  en: 'Cable Pullover',
  primary: ['lats', 'lower-lats'],
  secondary: ['triceps'],
  note: '直臂从过头位向下拉到大腿。背阔最大拉伸 → 最大收缩。'
},
```

**字段说明**:
- `id`(对象 key):全小写 + 下划线,唯一不重复
- `name`:中文名
- `en`:英文名,用于 YouTube 搜索
- `primary`:主要肌群数组(最多 2-3 个)。可用值见 `muscleNames` 部分
- `secondary`:辅助肌群
- `note`:点开后显示的备注。可以用 `<strong>...</strong>` 加粗

**第二步**:把它加到某个版本的 items 里:

```js
'A.2': {
  // ...
  items: [
    { id: 'pull_down_close', sets: 4, reps: '10-12', star: true },
    { id: 'cable_pullover', sets: 3, reps: '12' },  // 新加这一行
    { id: 'chest_supported_row', sets: 4, reps: '8-10', star: true },
    // ...
  ],
}
```

顺序就是 UI 显示顺序。

---

## 4. 加新版本(例如 A.3)

比如想加一个 "A.3 极简版"(出差回归专用,只 5 个动作)。

**第一步**:在 `const plans = {` 块里加一条:

```js
'A.3': {
  module: 'A',
  code: 'A.3',
  name: '拉日 · 极简版',     // 用 · 分隔模块名和版本名
  target: '出差回归 5 动作',
  time: '40-45 min',
  // star: true,           // 可选,加这行后版本 pill 会有 ★
  items: [
    { id: 'pull_down_wide', sets: 3, reps: '12' },
    { id: 'cable_v_row', sets: 3, reps: '10' },
    { id: 'incline_curl', sets: 3, reps: '10' },
    { id: 'face_pull', sets: 3, reps: '15' },
    { id: 'back_ext', sets: 2, reps: '12' },
  ],
  tips: ['出差刚回来 5 天用','所有重量降 15%'],
},
```

**第二步**:把它加到 modules 数组里 A 模块的 versions 列表:

```js
{ key: 'A', label: '拉日', sub: 'Pull', versions: ['A.0', 'A.1', 'A.2', 'A.3'], default: 'A.2' },
```

顺序决定了 pill 显示顺序。如果想把 A.3 设为默认打开,把 `default: 'A.2'` 改成 `default: 'A.3'`。

---

## 5. 改一周排程

下面这块:

```js
const weekly = [
  { day: '周一', name: 'B 推日', ver: 'B.1' },
  { day: '周二', name: 'A 拉日', ver: 'A.2 ★' },
  { day: '周三', name: '休息 · 髋恢复', rest: true },
  // ...
];
```

- `day`:左侧的日期
- `name`:中间显示的内容
- `ver`:右侧显示的版本号(可以加 ★ 标记)
- `rest: true`:休息日,会显示成灰色无版本号

---

## 6. 改"参考"侧抽屉里的内容(营养、抑制协议、康复等)

这些**不在 `data.js` 里**,在 `index.html` 里搜索关键字找到。

例如改营养目标:搜索 `2400-2700 kcal` 直接改。
例如改抑制协议:搜索 `上斜方抑制协议` 找到那块。
例如改 8 周复评清单:搜索 `8 周复评清单` 找到。

为什么这些不在 data.js?因为它们更稳定,不像训练计划经常迭代。

---

## 7. 加新肌群(进阶,很少需要)

比如想区分"肱二头肌长头"和"短头"。这要做两件事:

**第一步**:在 `muscleNames` 加新 key:

```js
const muscleNames = {
  // ...
  'biceps-long': '二头长头',
  'biceps-short': '二头短头',
};
```

**第二步**:在 `index.html` 的 SVG 模板里加对应的 `<path data-muscle="biceps-long" d="...">`。这需要懂一点 SVG,可以让 Claude 帮你画。

然后就能在动作里用 `primary: ['biceps-long']`。

---

## 现有的肌群名称(给 data.js 用)

写动作的 `primary` / `secondary` 时只能用这些 key:

| 部位 | key |
|------|------|
| 上胸 | `upper-chest` |
| 胸 | `chest` |
| 前束 | `front-delts` |
| 中束 | `side-delts` |
| 后束 | `rear-delts` |
| 二头 | `biceps` |
| 三头 | `triceps` |
| 前臂 | `forearms` |
| 腹直肌 | `abs` |
| 腹斜 | `obliques` |
| 上斜方 | `upper-traps` |
| 中背 / 菱形肌 | `mid-back` |
| 背阔 | `lats` |
| 背阔下沿 | `lower-lats` |
| 下背 | `lower-back` |
| 臀 | `glutes` |
| 腘绳 | `hamstrings` |
| 股四 | `quads` |
| 小腿 | `calves` |

---

## 改完之后

1. **改 `DATA_VERSION`** 到今天日期(在 `data.js` 顶部)
2. **保存 / commit** 改动
3. 在 GitHub 网页 commit 一行说明(例如 "RDL 加重")
4. 等 1-3 分钟 GitHub Pages 重新部署
5. 手机 Safari **下拉刷新** 或重新打开主屏图标
6. 底部 footer 看到新日期 → 成功

---

## 让 Claude 帮你改

下次有大改动,直接把这种 prompt 给 Claude:

> 这是我现在的 data.js:[粘贴]
> 
> 这是新的 v6 计划:[粘贴 workout_plan_v6.md]
> 
> 帮我重新生成 data.js,保持原有格式和注释,顺便把 DATA_VERSION 改成今天。

Claude 看一眼现有结构就能输出完全兼容的新版。

也可以更小的改动:

> 我想给 C.3 加一个动作 "Glute-Ham Raise",放在 RDL 后面,3 组 × 8。
> 
> 帮我改 data.js。

---

## 常见错误

| 现象 | 原因 |
|------|------|
| 页面显示红框 "数据文件加载失败" | data.js 路径错或文件没传上去 |
| 某个动作卡片显示 "缺数据:xxx" | items 里的 `id` 写错了,在 ex 里找不到对应动作 |
| 改完手机看不到新版 | 缓存,见 README 缓存问题章节 |
| 肌肉图整个变灰没高亮 | primary / secondary 里的肌群 key 拼错了,对照上面表格 |
| 改完页面整个白屏 | data.js 有语法错误(漏逗号、漏引号)。打开浏览器 DevTools 看 Console 报错 |
