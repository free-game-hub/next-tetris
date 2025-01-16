## 中文

### 项目简介
使用 Next.js 15 和 React 19 开发的现代版俄罗斯方块游戏。项目采用复古游戏机的 UI 设计，同时融合现代网页技术。

### 技术栈
- Next.js 15
- React 19
- TailwindCSS
- TypeScript
- Web Audio API

### 特性
- 复古游戏机 UI 设计
- 响应式布局，同时支持桌面和移动端
- 键盘和触摸控制
- Web Audio API 音效系统
- 游戏状态持久化
- 分数追踪和统计
- 成就系统

### 开发说明
本项目在 AI Cursor 的协助下仅用 4 小时完成开发。项目灵感来源于 [chvin/react-tetris](https://github.com/chvin/react-tetris/)，但使用现代网页技术完全重写。

### 安装
```base
npm install
npm run dev
```
### 控制方式
- 方向键/WASD：移动方块
- 空格：快速下落
- P：暂停游戏
- R：重新开始
- S：音效开关

### 项目优化
1. 使用 Next.js 15 的 App Router
2. 采用 TailwindCSS 实现响应式设计
3. TypeScript 确保类型安全
4. 使用 Web Audio API 实现精确的音效控制
5. 游戏状态持久化存储

### 致谢
- 感谢 [chvin/react-tetris](https://github.com/chvin/react-tetris/) 提供的灵感
- 感谢 AI Cursor 在开发过程中的协助