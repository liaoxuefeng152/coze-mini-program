# AI 相亲交友小程序 - 设计指南

## 一、品牌定位

**产品定位**：真实、高效、低骚扰、AI 驱动的严肃婚恋交友平台

**设计风格**：
- 浪漫温暖但不失专业
- 简洁现代，突出真人感
- AI 智能感，科技+人文结合

**目标用户**：25-45 岁，以恋爱、结婚为目的的用户

---

## 二、配色方案

### 主色系
- **主色（浪漫玫瑰粉）**：`bg-rose-500` / `text-rose-500` / `border-rose-500` (#f43f5e)
  - 用于：主要按钮、喜欢、高亮、TabBar 选中
- **主色变体**：
  - 深色：`bg-rose-600` (#e11d48) - 用于按压态
  - 浅色：`bg-rose-100` / `text-rose-100` (#ffe4e6) - 用于背景装饰

### 辅助色系
- **白色**：`bg-white` (#ffffff) - 主背景
- **浅灰色**：`bg-gray-50` / `bg-gray-100` (#f9fafb / #f3f4f6) - 卡片背景、分隔
- **中性灰**：`text-gray-500` / `text-gray-600` (#6b7280 / #4b5563) - 次要文本

### 语义色
- **成功（通过、匹配）**：`bg-green-500` (#22c55e)
- **警告（审核中、提示）**：`bg-amber-500` (#f59e0b)
- **错误（驳回、禁止）**：`bg-red-500` (#ef4444)
- **信息（待处理）**：`bg-blue-500` (#3b82f6)

### 文本色阶
- **主要文本**：`text-gray-900` (#111827)
- **次要文本**：`text-gray-600` (#4b5563)
- **辅助文本**：`text-gray-500` (#6b7280)
- **禁用文本**：`text-gray-400` (#9ca3af)

---

## 三、组件使用原则

### 通用 UI 组件优先级
**强制原则**：按钮、输入框、弹窗、Tabs、Toast、Card、Badge 等通用组件必须优先使用 `@/components/ui/*`，禁止用 View/Text 手搓。

### 必用组件清单
- **按钮**：`@/components/ui/button` - 所有按钮交互
- **卡片**：`@/components/ui/card` - 用户卡片、动态卡片
- **输入框**：`@/components/ui/input` - 表单输入
- **文本域**：`@/components/ui/textarea` - 多行文本
- **标签**：`@/components/ui/badge` - 认证徽章、状态标签
- **弹窗**：`@/components/ui/dialog` - 通用弹窗
- **警告弹窗**：`@/components/ui/alert-dialog` - 删除确认等危险操作
- **底部抽屉**：`@/components/ui/drawer` - 选择器、筛选器
- **标签页**：`@/components/ui/tabs` - 喜欢/匹配切换
- **开关**：`@/components/ui/switch` - 设置开关
- **头像**：`@/components/ui/avatar` - 用户头像
- **提示**：`@/components/ui/sonner` - 轻提示
- **Toast**：`@/components/ui/toast` - 操作反馈
- **分隔线**：`@/components/ui/separator` - 模块分隔
- **骨架屏**：`@/components/ui/skeleton` - 加载状态

### 页面级组件选型（必须提前拆分 UI 单元）
**首页（AI推荐）**：
- 推荐卡片：Card + Avatar + Badge
- 喜欢/跳过按钮：Button（大图标按钮）
- 匹配分数：大号数字 + Badge

**个人资料页**：
- 表单输入：Input + Textarea + RadioGroup
- 下拉选择：Select
- 步骤条：自定义组件（基于 View）

**聊天页**：
- 消息气泡：Card（圆角、阴影）
- 输入框：Input + Button
- AI助手面板：Dialog 或 Drawer

**动态页**：
- 动态卡片：Card + Avatar + Badge
- 图片/视频：Image/Video（Taro 原生）
- 点赞/评论：Button

---

## 四、间距系统

### 页面边距
- **页面左右边距**：`px-4` (16px)
- **页面上下边距**：`py-4` (16px)
- **模块间距**：`gap-4` (16px)

### 组件间距
- **卡片内边距**：`p-4` (16px)
- **表单元素间距**：`gap-3` (12px)
- **按钮间距**：`gap-2` (8px)

### 文本间距
- **标题与内容间距**：`mb-3` (12px)
- **列表项间距**：`gap-3` (12px)
- **段落间距**：`mb-4` (16px)

---

## 五、容器样式

### 圆角规范
- **页面级卡片**：`rounded-xl` (12px)
- **小型卡片**：`rounded-lg` (8px)
- **按钮**：`rounded-full` (圆形) 或 `rounded-lg` (圆角)
- **头像**：`rounded-full` (圆形)

### 阴影规范
- **卡片**：`shadow-sm` / `shadow-md`
- **弹窗**：`shadow-lg`
- **悬浮元素**：`shadow-md`

### 边框规范
- **分割线**：`border-gray-200`
- **卡片边框**：`border border-gray-100`
- **输入框**：`border-gray-300`（聚焦：`border-rose-500`）

---

## 六、导航结构

### TabBar 配置
底部 4 个 Tab：

1. **首页**（推荐卡片）
   - 路径：`pages/index/index`
   - 图标：Heart（心形）
   - 文字：首页

2. **圈子**（兴趣圈子）
   - 路径：`pages/circles/index`
   - 图标：Users（用户组）
   - 文字：圈子

3. **消息**（聊天列表）
   - 路径：`pages/messages/index`
   - 图标：MessageSquare（消息气泡）
   - 文字：消息

4. **我的**（个人中心）
   - 路径：`pages/profile/index`
   - 图标：User（用户）
   - 文字：我的

### 页面路由规则
- **TabBar 页面**：使用 `Taro.switchTab()` 切换
- **普通页面**：使用 `Taro.navigateTo()` 跳转
- **返回上一页**：使用 `Taro.navigateBack()`

---

## 七、字体规范

### 字体大小
- **大标题**：`text-2xl` (24px) - 页面标题
- **小标题**：`text-lg` (18px) - 模块标题
- **正文**：`text-base` (16px) - 主要内容
- **辅助文本**：`text-sm` (14px) - 次要信息
- **小字**：`text-xs` (12px) - 提示文字

### 字重
- **标题**：`font-bold` (700)
- **强调**：`font-semibold` (600)
- **正文**：`font-normal` (400)

---

## 八、状态展示原则

### 加载状态
- 使用 `@/components/ui/skeleton` 占位
- 大卡片：Skeleton + 模拟内容
- 列表项：Skeleton 行

### 空状态
- **无内容**：图标 + 标题 + 描述 + 操作按钮
- **网络错误**：提示文字 + 重试按钮
- **加载失败**：错误图标 + 提示 + 重试

### 错误提示
- **表单错误**：Input 下方红色小字
- **操作失败**：Sonner 轻提示（红色）
- **系统错误**：Dialog 弹窗

---

## 九、小程序约束

### 包体积限制
- 主包 ≤ 2MB
- 总包 ≤ 20MB
- 所有图片/视频上传到对象存储（TOS）

### 图片策略
- **头像**：建议 200x200，JPG/PNG，≤ 200KB
- **动态图片**：建议 800x800，JPG/PNG，≤ 1MB
- **短视频**：最长 10 秒，MP4，≤ 5MB
- **封面图**：建议 750x500，JPG，≤ 500KB

### 性能优化
- 图片懒加载：`lazyLoad` 属性
- 长列表：虚拟列表
- 分包加载：按功能分包

### 跨端兼容
- 平台检测：`Taro.getEnv() === Taro.ENV_TYPE.WEAPP`
- H5 降级提示：录音、相机等原生功能
- Input 样式：View 包裹，样式放外层
- Text 换行：添加 `block` 类

---

## 十、AI 功能展示

### AI 匹配分
- **分数展示**：大号数字（`text-3xl font-bold text-rose-500`）
- **匹配理由**：列表形式，每条理由前加 ✓ 图标
- **风险提示**：红色警告标签

### AI 助手
- **触发方式**：按钮点击（"帮我聊"）
- **展示位置**：底部抽屉或弹窗
- **内容类型**：开场白、话题、回复建议

### AI 审核
- **审核中**：黄色标签 + "AI 审核中"
- **审核通过**：绿色标签 + "已通过"
- **审核驳回**：红色标签 + 驳回原因

---

## 十一、特殊场景设计

### 双向匹配成功
- **弹窗设计**：心形动画 + 匹配成功文案
- **操作按钮**：立即聊天 / 返回

### 14天沉默归档
- **灰色提示**：顶部固定提示栏
- **可激活**：发送消息后自动恢复

### 风控拦截
- **顶部红框**：红色背景 + 图标 + 提示文字
- **操作限制**：禁止发送，提示原因

---

## 十二、图标使用规范

### 图标库：lucide-react-taro
- 推荐、喜欢：`Heart`、`HeartFilled`
- 用户：`User`、`Users`
- 消息：`MessageSquare`、`MessageCircle`
- 设置：`Settings`、`ChevronRight`
- 认证：`Shield`、`CheckCircle`
- 更多：`MoreHorizontal`

### 图标尺寸
- **TabBar**：24px
- **列表图标**：16-20px
- **大图标按钮**：28-32px
- **小图标**：14px

### 图标颜色
- **主色**：`color="#f43f5e"` (rose-500)
- **选中**：`color="#f43f5e"`
- **未选中**：`color="#9ca3af"` (gray-400)
- **白色**：`color="#ffffff"`

---

## 十三、设计一致性检查清单

开发前必须逐项检查：

- [ ] 使用主色 `bg-rose-500` / `text-rose-500` 作为主要操作色
- [ ] 通用组件优先使用 `@/components/ui/*`
- [ ] 所有 Text 垂直排列时添加 `block` 类
- [ ] Input/Textarea 使用 View 包裹，样式放外层
- [ ] 圆角使用 `rounded-xl` / `rounded-lg`
- [ ] 卡片使用 `shadow-sm` / `shadow-md`
- [ ] 间距使用 `gap-4` / `p-4` / `mb-4`
- [ ] TabBar 图标已生成并配置正确路径
- [ ] 所有页面已注册到 `app.config.ts`
- [ ] 跨端兼容性已处理（平台检测 + H5 降级）
