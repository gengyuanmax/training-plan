/* ===========================================
   Max 训练数据 · v5
   ===========================================
   修改方式见 UPDATING.md
   
   修改后请更新 DATA_VERSION 日期,这样能在底部看到生效。
   =========================================== */

const DATA_VERSION = '2026.05.14';

/* ---------- 肌群中文名 ---------- 
   只在新增 SVG 肌群时改。增加肌群需同步改 index.html 里的 SVG。
*/
const muscleNames = {
  'upper-chest': '上胸', 'chest': '胸', 'front-delts': '前束', 'side-delts': '中束',
  'rear-delts': '后束', 'biceps': '二头', 'triceps': '三头', 'forearms': '前臂',
  'abs': '腹直肌', 'obliques': '腹斜', 'upper-traps': '上斜方', 'mid-back': '中背',
  'lats': '背阔', 'lower-lats': '背阔下沿', 'lower-back': '下背', 'glutes': '臀',
  'hamstrings': '腘绳', 'quads': '股四', 'calves': '小腿'
};

/* ---------- 动作库 ---------- 
   每个动作的元数据。所有版本通过 id 引用。
   
   字段说明:
   - name: 中文名
   - en: 英文名(决定 YouTube 搜索关键词)
   - primary: 主要肌群 (亮橙色高亮)
   - secondary: 辅助肌群 (暗橙色高亮)
   - note: 默认备注。可以含 HTML(<strong> 等)
   
   新增动作:加一条,id 用全小写+下划线即可。
*/
const ex = {
  // ===== 拉日 A =====
  pull_down_wide: { name: '高位下拉(宽握)', en: 'Lat Pull Down · Wide Grip', primary: ['lats'], secondary: ['biceps', 'rear-delts', 'mid-back'], note: '肩胛先下沉,肘往口袋方向。不要用上半身代偿。' },
  pull_down_close: { name: '高位下拉(窄握)', en: 'Lat Pull Down · Close Grip', primary: ['lats', 'lower-lats'], secondary: ['biceps'], note: '<strong>窄握 / V-bar 把手</strong>,更短力臂让背阔下沿吃力。这是 A.2 的关键改动。' },
  cable_v_row: { name: 'Cable V 把手坐姿划船', en: 'Cable V-Handle Seated Row', primary: ['mid-back', 'lats'], secondary: ['biceps', 'rear-delts'], note: '主菜,挺胸拉到肚脐。肩胛骨主动下沉收紧。' },
  chest_supported_row: { name: '俯身机械划船', en: 'Chest-Supported Row', primary: ['mid-back', 'lats'], secondary: ['rear-delts', 'biceps'], note: '<strong>胸贴垫子,完全去掉腰代偿</strong>,纯粹背部发力。中背最直接刺激。' },
  machine_row: { name: '坐姿机械划船', en: 'Machine Row', primary: ['mid-back'], secondary: ['lats', 'rear-delts', 'biceps'], note: '第二角度背厚。重量稳定不晃。' },
  machine_row_wide: { name: '坐姿机械划船(宽握/Y握)', en: 'Machine Row · Wide Grip', primary: ['mid-back', 'upper-traps'], secondary: ['rear-delts'], note: '<strong>双手比肩宽,肘部外展约 75°</strong>,刺激中斜方+菱形肌。注意是中斜方不是上斜方。' },
  straight_arm_pulldown: { name: '直臂下压', en: 'Cable Straight Arm Pull Down', primary: ['lats', 'lower-lats'], secondary: [], note: '背阔孤立,直臂向下压,感受背阔从顶到底的收缩。' },
  face_pull: { name: 'Face Pull(肘部低于肩)', en: 'Face Pull · Elbows Below Shoulder', primary: ['rear-delts'], secondary: ['mid-back'], note: '<strong>绳索胸口高度</strong>(不是过头),拉到下巴,<strong>肘部在肩水平线下方</strong> — 中下斜方主导,避开上斜方代偿。' },
  rear_delt_row: { name: '哑铃后束划船', en: 'DB Rear Delt Row', primary: ['rear-delts'], secondary: ['mid-back'], note: '俯身,大臂外展拉到耳后。轻重量高次数。' },
  incline_curl: { name: '上斜哑铃弯举', en: 'DB Incline Bicep Curl', primary: ['biceps'], secondary: [], note: '二头长头,完全伸展,顶峰挤压。手腕略外旋。' },
  rope_curl: { name: '绳索弯举', en: 'Cable Rope Bicep Curl', primary: ['biceps'], secondary: ['forearms'], note: '收尾,顶峰外旋,绳子分开。' },
  cable_behind_curl: { name: '体后绳索弯举', en: 'Cable Behind-the-Body Curl', primary: ['biceps'], secondary: [], note: '手臂在身后位,二头长头最大拉伸。' },
  hammer_curl: { name: '锤式弯举', en: 'Hammer Curl', primary: ['biceps', 'forearms'], secondary: [], note: '<strong>必加 — 你的肱肌弱点</strong>。手腕中立位,锤击。' },
  back_ext: { name: '坐姿背伸展', en: 'Seated Back Extension', primary: ['lower-back'], secondary: ['glutes'], note: '下背收尾,轻重量,感受下背启动。' },

  // ===== 推日 B =====
  incline_press: { name: '机械上斜推胸', en: 'Machine Incline Bench Press', primary: ['upper-chest'], secondary: ['front-delts', 'triceps'], note: '<strong>上胸优先 — 你的真正弱点</strong>。重量必须加重。目标 4 周内 +5kg。' },
  arnold_press: { name: '阿诺德推举', en: 'DB Arnold Press', primary: ['front-delts', 'side-delts'], secondary: ['triceps'], note: '肩推主菜。<strong>起始位肩膀放松下沉</strong>,推起过程不要让肩往耳朵方向走。' },
  machine_lat_raise: { name: '机械侧平举', en: 'Machine Lateral Raise', primary: ['side-delts'], secondary: [], note: '必做。<strong>抬到与肩平就够,别再往高抬</strong> — 再高就是上斜方。' },
  cable_lat_raise: { name: '绳索单臂侧平举', en: 'Cable Single-Arm Lateral Raise', primary: ['side-delts'], secondary: [], note: '中束补量,阻力曲线和机械互补。' },
  pec_dec: { name: '蝴蝶机', en: 'Machine Fly (Pec Dec)', primary: ['chest'], secondary: ['front-delts'], note: '胸部孤立,完全收缩。' },
  rope_pushdown: { name: '绳索三头下压', en: 'Cable Rope Tricep Pushdown', primary: ['triceps'], secondary: [], note: '三头外侧头,底部分开绳子。' },
  overhead_tri_ext: { name: '过顶单臂三头伸展', en: 'Single DB Overhead Tri Extension', primary: ['triceps'], secondary: [], note: '三头长头,完全伸展位最关键。' },
  cable_overhead_rope: { name: '绳索过顶三头伸展', en: 'Cable Overhead Rope Extension', primary: ['triceps'], secondary: [], note: '泵感收尾。轻重量高次数。' },

  // ===== 腿日 C =====
  hip_thrust: { name: '机械臀推', en: 'Machine Hip Thrust', primary: ['glutes'], secondary: ['hamstrings'], note: '臀部启动。<strong>顶峰挤压 3 秒</strong>。骨盆主动后倾。' },
  bulgarian: { name: '保加利亚分腿蹲', en: 'DB Bulgarian Split Squat', primary: ['glutes', 'quads'], secondary: ['hamstrings'], note: '<strong>前脚远</strong> = 更多臀腘绳。单侧训练。' },
  hack_squat: { name: 'Hack Squat / 高脚杯深蹲', en: 'Hack Squat / Goblet Squat', primary: ['quads'], secondary: ['glutes'], note: 'Quad 主菜。坐姿动作对膝盖友好。' },
  leg_press: { name: '机械腿举', en: 'Machine Leg Press', primary: ['quads'], secondary: ['glutes'], note: '脚位高 = 更多臀腘绳。膝盖友好。' },
  rdl: { name: '罗马尼亚硬拉', en: 'Romanian Deadlift (DB)', primary: ['hamstrings'], secondary: ['glutes', 'lower-back'], note: '<strong>腘绳厚度的关键动作</strong>。第一次 2×8 哑铃 10kg 测试,观察髋弹响 24h。无加重 → 下次正常做。' },
  ham_curl: { name: '坐姿勾腿', en: 'Seated Hamstring Curl', primary: ['hamstrings'], secondary: [], note: '腘绳孤立。重量加重,顶峰停 1s。' },
  leg_ext: { name: '腿屈伸', en: 'Machine Leg Extension', primary: ['quads'], secondary: [], note: '股四孤立。注意 tempo,慢速离心。' },
  walking_lunges: { name: '行走 / 后退弓步', en: 'Walking / Reverse Lunges', primary: ['glutes', 'quads'], secondary: ['hamstrings'], note: '后退弓步对膝盖更友好。' },
  hip_abd_add: { name: '髋外展 + 内收(super set)', en: 'Hip Abduction + Adduction', primary: ['glutes'], secondary: [], note: '臀中肌 + 内收肌,髋稳定。' },
  calf_raise: { name: '坐姿提踵', en: 'Seated Calf Raise', primary: ['calves'], secondary: [], note: '小腿。你的小腿已不错,2-4 组维持即可。' },

  // ===== 肩+胳膊 D =====
  rear_delt_fly: { name: '机械反向飞鸟', en: 'Machine Rear Delt (Reverse) Fly', primary: ['rear-delts'], secondary: ['mid-back'], note: '后束直接刺激。' },
  db_curl: { name: '哑铃弯举', en: 'DB Bicep Curl', primary: ['biceps'], secondary: ['forearms'], note: '胳膊补量。' },
  hanging_leg_raise: { name: '悬垂举腿', en: 'Hanging Leg Raise', primary: ['abs'], secondary: ['obliques'], note: '核心。控制,不要靠惯性甩。' },
  plank: { name: '平板支撑', en: 'Plank', primary: ['abs'], secondary: ['obliques', 'lower-back'], note: '核心稳定。骨盆保持中立。' },
  ss_curl_pushdown: { name: 'Superset: 弯举 + 下压', en: 'SS: DB Curl + Cable Pushdown', primary: ['biceps', 'triceps'], secondary: ['forearms'], note: '4×4 组,组间休息 60s。胳膊泵感拉满。' },
  ss_hammer_overhead: { name: 'Superset: 锤举 + 过顶三头', en: 'SS: Hammer Curl + Overhead Rope', primary: ['biceps', 'triceps'], secondary: ['forearms'], note: '3×3 组,无间歇。' },
  ds_cable_curl: { name: 'Drop Set: 绳索弯举力竭', en: 'Drop Set: Cable Curl', primary: ['biceps'], secondary: [], note: '力竭 → 降重 → 力竭 → 降重。一轮足够。' },

  // ===== 出差 E =====
  pushup: { name: '俯卧撑', en: 'Push-Up', primary: ['chest'], secondary: ['front-delts', 'triceps'], note: '标准位。手指尖朝前。' },
  diamond_pushup: { name: '钻石俯卧撑', en: 'Diamond Push-Up', primary: ['triceps'], secondary: ['chest'], note: '三头主力。手呈钻石形。' },
  band_press: { name: '弹力带肩推', en: 'Resistance Band Shoulder Press', primary: ['front-delts', 'side-delts'], secondary: ['triceps'], note: '<strong>不耸肩</strong>。脚踩弹力带中段。' },
  band_lat_raise: { name: '弹力带侧平举', en: 'Resistance Band Lateral Raise', primary: ['side-delts'], secondary: [], note: '必做。脚踩,侧平举到肩。' },
  band_row: { name: '弹力带划船(门锚)', en: 'Resistance Band Row · Door Anchor', primary: ['mid-back', 'lats'], secondary: ['biceps', 'rear-delts'], note: '模拟划船,肘部贴近身体。' },
  band_face_pull: { name: '弹力带 Face Pull', en: 'Resistance Band Face Pull', primary: ['rear-delts'], secondary: ['mid-back'], note: '必做。<strong>肘部低于肩</strong>。' },
  band_curl: { name: '弹力带弯举', en: 'Resistance Band Bicep Curl', primary: ['biceps'], secondary: [], note: '二头。' },
  bulgarian_bw: { name: '保加利亚分腿蹲(自重)', en: 'BW Bulgarian Split Squat', primary: ['glutes', 'quads'], secondary: ['hamstrings'], note: '后脚搭椅子。自重已足够刺激。' },
  single_leg_bridge: { name: '单腿臀桥', en: 'Single-Leg Glute Bridge', primary: ['glutes'], secondary: ['hamstrings'], note: '顶峰挤压 2s。' },
  bw_calf_raise: { name: '提踵', en: 'BW Calf Raise', primary: ['calves'], secondary: [], note: '单腿更好。' },
  band_overhead_tri: { name: '弹力带过顶三头', en: 'Band Overhead Tri Extension', primary: ['triceps'], secondary: [], note: '三头长头。脚踩,手臂过顶向下伸展。' },
  diamond_finisher: { name: '钻石俯卧撑收尾', en: 'Diamond Push-Up Finisher', primary: ['triceps'], secondary: ['chest'], note: '2 组力竭,三头泵感收尾。' },
};

/* ---------- 计划版本 ---------- 
   每个版本一个 key (例如 'A.2')。
   - module: 所属模块,要和 modules 数组里的 key 对应
   - code: 显示用的代号
   - name: '模块名 · 版本名',会被自动按 · 拆开
   - target: 当天主要目标(大字标题)
   - time: 预计时长
   - star: true 表示推荐主用(在版本 pill 上加 ★)
   - items: 动作列表
     - id: 引用 ex 里的 key
     - sets: 组数
     - reps: 次数(字符串,可以带"/腿"等)
     - star: 该动作的关键星标
     - note: 覆盖默认 note(可选)
   - tips: 当天提示列表(支持 HTML)
*/
const plans = {
  'A.0': {
    module: 'A', code: 'A.0', name: '拉日 · 基础版',
    target: '维持背 + 二头', time: '60-65 min',
    items: [
      { id: 'pull_down_wide', sets: 4, reps: '10-12' },
      { id: 'cable_v_row', sets: 4, reps: '8-10' },
      { id: 'machine_row', sets: 4, reps: '10' },
      { id: 'straight_arm_pulldown', sets: 3, reps: '12' },
      { id: 'rear_delt_row', sets: 4, reps: '12-15' },
      { id: 'incline_curl', sets: 4, reps: '10' },
      { id: 'rope_curl', sets: 3, reps: '12' },
      { id: 'back_ext', sets: 3, reps: '12' },
    ],
    tips: ['出差刚回归 / 状态差 / 时间紧的默认版本','重量降 10-15%,一周内涨回来'],
  },
  'A.1': {
    module: 'A', code: 'A.1', name: '拉日 · 扩展版',
    target: '强化胳膊线条', time: '65-70 min',
    items: [
      { id: 'pull_down_wide', sets: 4, reps: '10-12' },
      { id: 'cable_v_row', sets: 4, reps: '8-10' },
      { id: 'machine_row', sets: 4, reps: '10' },
      { id: 'straight_arm_pulldown', sets: 3, reps: '12' },
      { id: 'rear_delt_row', sets: 4, reps: '12-15' },
      { id: 'incline_curl', sets: 4, reps: '10' },
      { id: 'cable_behind_curl', sets: 3, reps: '12' },
      { id: 'hammer_curl', sets: 3, reps: '12' },
      { id: 'back_ext', sets: 3, reps: '12' },
    ],
    tips: ['相对 A.0:换 Cable Behind Curl + 加 Hammer Curl(肱肌)'],
  },
  'A.2': {
    module: 'A', code: 'A.2', name: '拉日 · 专项版',
    target: '中背 + 背阔下沿(V 字形)', time: '65-70 min', star: true,
    items: [
      { id: 'pull_down_close', sets: 4, reps: '10-12', star: true },
      { id: 'chest_supported_row', sets: 4, reps: '8-10', star: true },
      { id: 'machine_row_wide', sets: 4, reps: '10', star: true },
      { id: 'straight_arm_pulldown', sets: 4, reps: '12', star: true, note: '<strong>4 组,背阔下沿主菜</strong>' },
      { id: 'face_pull', sets: 4, reps: '15', star: true },
      { id: 'incline_curl', sets: 4, reps: '10' },
      { id: 'cable_behind_curl', sets: 3, reps: '12' },
      { id: 'hammer_curl', sets: 3, reps: '12' },
      { id: 'back_ext', sets: 3, reps: '12' },
    ],
    tips: [
      '<strong>你的真正弱点</strong>:中背 + 背阔下沿,星标动作是关键',
      '窄握 Pull Down → 背阔下半段',
      'Chest-Supported Row → 去腰代偿,纯粹背部发力',
      '宽握 Row → 中斜方+菱形肌(不是上斜方)',
      'Face Pull 肘部低于肩 → 避免上斜方代偿',
    ],
  },
  'B.0': {
    module: 'B', code: 'B.0', name: '推日 · 基础版',
    target: '维持胸肩三头 · 上胸优先', time: '60-65 min',
    items: [
      { id: 'incline_press', sets: 4, reps: '8-10', star: true, note: '<strong>上胸优先,你的弱点,重量必须加重</strong>。目标 4 周内 +5kg。' },
      { id: 'arnold_press', sets: 4, reps: '8-10' },
      { id: 'machine_lat_raise', sets: 4, reps: '12-15' },
      { id: 'cable_lat_raise', sets: 3, reps: '15' },
      { id: 'pec_dec', sets: 3, reps: '12' },
      { id: 'rope_pushdown', sets: 4, reps: '12' },
      { id: 'overhead_tri_ext', sets: 3, reps: '10' },
    ],
    tips: ['不要做任何 Shrug / 耸肩类动作','肩推不要耸肩 — 避免加剧上斜方过度发达'],
  },
  'B.1': {
    module: 'B', code: 'B.1', name: '推日 · 扩展版',
    target: '强化三头长头 + 上胸', time: '65-70 min', star: true,
    items: [
      { id: 'incline_press', sets: 4, reps: '8-10', star: true, note: '<strong>上胸优先,重量必须加重</strong>' },
      { id: 'arnold_press', sets: 4, reps: '8-10' },
      { id: 'machine_lat_raise', sets: 4, reps: '12-15' },
      { id: 'cable_lat_raise', sets: 3, reps: '15' },
      { id: 'pec_dec', sets: 3, reps: '12' },
      { id: 'rope_pushdown', sets: 4, reps: '12' },
      { id: 'overhead_tri_ext', sets: 4, reps: '10', note: '3→4 组' },
      { id: 'cable_overhead_rope', sets: 2, reps: '15', note: '新增,泵感收尾' },
    ],
    tips: ['相对 B.0:三头加量(过顶 3→4 组 + 新增过顶绳索)','Incline Press 加重是 8 周第一目标'],
  },
  'C.0': {
    module: 'C', code: 'C.0', name: '腿日 · 基础版',
    target: '髋友好维持(髋弹响严重期)', time: '65 min',
    items: [
      { id: 'hip_thrust', sets: 4, reps: '10' },
      { id: 'bulgarian', sets: 3, reps: '8 / 腿' },
      { id: 'leg_press', sets: 4, reps: '10-12' },
      { id: 'ham_curl', sets: 4, reps: '12' },
      { id: 'leg_ext', sets: 3, reps: '12' },
      { id: 'hip_abd_add', sets: 3, reps: '15 / 项' },
      { id: 'calf_raise', sets: 4, reps: '15' },
    ],
    tips: ['髋弹响明显期使用','不做 RDL'],
  },
  'C.2': {
    module: 'C', code: 'C.2', name: '腿日 · 扩展版',
    target: 'Quad 紧实 + 分界', time: '75-80 min',
    items: [
      { id: 'hip_thrust', sets: 4, reps: '10-12', note: '顶峰挤压 3s' },
      { id: 'bulgarian', sets: 3, reps: '10 / 腿', note: '前脚远' },
      { id: 'hack_squat', sets: 4, reps: '8-10' },
      { id: 'rdl', sets: 3, reps: '10' },
      { id: 'leg_ext', sets: 4, reps: '12-15', note: '4 组 + tempo' },
      { id: 'ham_curl', sets: 4, reps: '12' },
      { id: 'walking_lunges', sets: 3, reps: '10 / 腿' },
      { id: 'calf_raise', sets: 4, reps: '15' },
    ],
    tips: ['髋已改善 + 想 quad 更紧实时用','去掉 Hip Abd/Add,加 Hack Squat + RDL'],
  },
  'C.3': {
    module: 'C', code: 'C.3', name: '腿日 · 专项版',
    target: '腘绳厚度 + 臀腿分界', time: '70-75 min', star: true,
    items: [
      { id: 'hip_thrust', sets: 4, reps: '10-12', note: '重量优先于组数' },
      { id: 'rdl', sets: 4, reps: '8-10', star: true, note: '<strong>主菜,腘绳厚度的关键</strong>' },
      { id: 'bulgarian', sets: 3, reps: '10 / 腿', note: '前脚远' },
      { id: 'ham_curl', sets: 4, reps: '10-12', star: true, note: '<strong>重量加重</strong>' },
      { id: 'hack_squat', sets: 3, reps: '10' },
      { id: 'walking_lunges', sets: 3, reps: '10 / 腿' },
      { id: 'leg_ext', sets: 2, reps: '15', note: '4→2 组(维持)' },
      { id: 'calf_raise', sets: 2, reps: '15', note: '4→2 组(你够了)' },
    ],
    tips: [
      '<strong>训练量分配</strong>:后链 12 组 | Quad 11 组 | 小腿 2 组',
      'RDL 安全协议:第一次 2×8 哑铃 10kg → 观察髋弹响 24h',
      '无加重 → 下次正常做 4×8-10',
      '加重 → 暂停 RDL,回 C.0',
    ],
  },
  'D.0': {
    module: 'D', code: 'D.0', name: '肩+胳膊 · 基础版',
    target: '肩+胳膊补量', time: '50-55 min',
    items: [
      { id: 'machine_lat_raise', sets: 5, reps: '12-15' },
      { id: 'cable_lat_raise', sets: 4, reps: '15 / 侧' },
      { id: 'rear_delt_fly', sets: 4, reps: '12' },
      { id: 'face_pull', sets: 4, reps: '15' },
      { id: 'db_curl', sets: 4, reps: '10' },
      { id: 'rope_pushdown', sets: 4, reps: '12' },
      { id: 'hanging_leg_raise', sets: 3, reps: '10' },
      { id: 'plank', sets: 3, reps: '60s' },
    ],
    tips: ['Lateral Raise 高量刷中束 — 你的目标', 'Face Pull 肘部低于肩'],
  },
  'D.1': {
    module: 'D', code: 'D.1', name: '肩+胳膊 · 扩展版',
    target: '胳膊雕刻', time: '60-65 min',
    items: [
      { id: 'machine_lat_raise', sets: 5, reps: '12-15' },
      { id: 'cable_lat_raise', sets: 4, reps: '15 / 侧' },
      { id: 'rear_delt_fly', sets: 4, reps: '12' },
      { id: 'face_pull', sets: 4, reps: '15' },
      { id: 'ss_curl_pushdown', sets: 4, reps: '10 / 12', note: '60s 休息' },
      { id: 'ss_hammer_overhead', sets: 3, reps: '12 / 15' },
      { id: 'ds_cable_curl', sets: 1, reps: '力竭轮' },
      { id: 'hanging_leg_raise', sets: 3, reps: '10' },
      { id: 'plank', sets: 3, reps: '60s' },
    ],
    tips: ['<strong>48 小时恢复 — 第二天别再练胳膊</strong>','Superset + Drop Set 强度技巧'],
  },
  'E.0': {
    module: 'E', code: 'E.0', name: '出差 · 基础版',
    target: '出差维持', time: '45 min',
    items: [
      { id: 'pushup', sets: 4, reps: '10-15' },
      { id: 'diamond_pushup', sets: 3, reps: '8-12' },
      { id: 'band_press', sets: 4, reps: '10-12' },
      { id: 'band_lat_raise', sets: 4, reps: '15' },
      { id: 'band_row', sets: 4, reps: '12' },
      { id: 'band_face_pull', sets: 4, reps: '15' },
      { id: 'band_curl', sets: 4, reps: '12' },
      { id: 'bulgarian_bw', sets: 3, reps: '10 / 腿' },
      { id: 'single_leg_bridge', sets: 3, reps: '12 / 腿' },
      { id: 'bw_calf_raise', sets: 3, reps: '20' },
    ],
    tips: ['装备:管状弹力绳(中阻+重阻,带把手)+ 门锚扣','收尾:Plank 3×45s + Lying Leg Raise 3×12'],
  },
  'E.1': {
    module: 'E', code: 'E.1', name: '出差 · 扩展版',
    target: '加强胳膊线条', time: '50-55 min',
    items: [
      { id: 'pushup', sets: 4, reps: '10-15' },
      { id: 'diamond_pushup', sets: 3, reps: '8-12' },
      { id: 'band_press', sets: 4, reps: '10-12' },
      { id: 'band_lat_raise', sets: 4, reps: '15' },
      { id: 'band_row', sets: 4, reps: '12' },
      { id: 'band_face_pull', sets: 4, reps: '15' },
      { id: 'band_curl', sets: 3, reps: '15' },
      { id: 'band_overhead_tri', sets: 3, reps: '15' },
      { id: 'diamond_finisher', sets: 2, reps: '力竭' },
      { id: 'bulgarian_bw', sets: 3, reps: '10 / 腿' },
      { id: 'single_leg_bridge', sets: 3, reps: '12 / 腿' },
      { id: 'bw_calf_raise', sets: 3, reps: '20' },
    ],
    tips: ['加三头长头 + 钻石收尾'],
  },
};

/* ---------- 模块定义 ---------- 
   key: 模块字母
   label: 中文显示名
   sub: 英文小字(目前没显示,保留)
   versions: 该模块下所有版本的 key(顺序就是 UI 显示顺序)
   default: 进入该模块默认打开的版本
*/
const modules = [
  { key: 'A', label: '拉日', sub: 'Pull', versions: ['A.0', 'A.1', 'A.2'], default: 'A.2' },
  { key: 'B', label: '推日', sub: 'Push', versions: ['B.0', 'B.1'], default: 'B.1' },
  { key: 'C', label: '腿日', sub: 'Legs', versions: ['C.0', 'C.2', 'C.3'], default: 'C.3' },
  { key: 'D', label: '肩+臂', sub: 'Shldr+Arms', versions: ['D.0', 'D.1'], default: 'D.0' },
  { key: 'E', label: '出差', sub: 'Travel', versions: ['E.0', 'E.1'], default: 'E.0' },
];

/* ---------- 一周排程 ---------- 
   rest=true 的天显示成灰色无版本号
*/
const weekly = [
  { day: '周一', name: 'B 推日', ver: 'B.1' },
  { day: '周二', name: 'A 拉日', ver: 'A.2 ★' },
  { day: '周三', name: '休息 · 髋恢复', rest: true },
  { day: '周四', name: 'D 肩+臂', ver: 'D.0' },
  { day: '周五', name: 'C 腿日', ver: 'C.3 ★' },
  { day: '周六', name: '网球 1-2h', rest: true },
  { day: '周日', name: '休息 · 髋部康复', rest: true },
];
