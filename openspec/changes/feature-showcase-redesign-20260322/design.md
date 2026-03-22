# Design: Showcase Redesign

> Created: 2026-03-22
> Based on: proposal.md, specs/

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Showcase Page Architecture                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│   │  index.html  │───▶│  styles.css  │    │  script.js   │      │
│   │  (结构层)    │    │  (样式层)    │    │  (交互层)    │      │
│   └──────────────┘    └──────────────┘    └──────────────┘      │
│          │                   │                   │               │
│          └───────────────────┴───────────────────┘               │
│                              │                                   │
│   ┌──────────────────────────┴──────────────────────────┐       │
│   │                    页面板块                          │       │
│   ├──────────────────────────────────────────────────────┤       │
│   │  Hero Section (头像滚动 + 统计数据)                  │       │
│   │  Agent Cards (卡片滚动展示)                          │       │
│   │  Enterprise Features (4宫格功能卡片)                 │       │
│   │  Workflow Animation (保留现有)                       │       │
│   └──────────────────────────────────────────────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Models

### Agent Data

```typescript
interface Agent {
  id: string;
  name: string;
  role: string;
  skills: string[];
  stack: string[];
  cases: string[];
  color: string;
  avatar?: string;
}

interface TeamStats {
  agentCount: number;
  successRate: number;
  githubPRs: number;
}
```

### Enterprise Feature

```typescript
interface EnterpriseFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  details?: string;
}
```

## Component Design

### New Components

| 组件 | 位置 | 职责 |
|------|------|------|
| TeamAvatarScroller | script.js | 团队头像横向滚动动画 |
| StatCounter | script.js | 数字计数动画效果 |
| AgentCardScroller | script.js | Agent 卡片滚动容器 |
| EnterpriseFeatureGrid | index.html | 企业功能 4 宫格布局 |

### Modified Components

| 组件 | 变更类型 | 说明 |
|------|----------|------|
| Hero Section | 重构 | 新增头像滚动、徽章、统计数据 |
| Agent Showcase | 重构 | 改为卡片滚动形式 |
| CSS Variables | 扩展 | 新增企业板块配色 |

## CSS Architecture

### 新增 CSS 变量

```css
:root {
  /* Avatar colors */
  --avatar-kev: #6366f1;
  --avatar-rex: #06b6d4;
  --avatar-doc: #ec4899;
  --avatar-scout: #10b981;
  --avatar-morgan: #f59e0b;
  --avatar-sage: #8b5cf6;
  --avatar-verifier: #ef4444;

  /* Enterprise section */
  --enterprise-bg: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
  --card-hover-transform: translateY(-8px);
}
```

### 新增 CSS 类

```css
/* Avatar Scroller */
.avatar-scroller { /* 容器 */ }
.avatar-item { /* 单个头像 */ }
.avatar-ring { /* 头像边框动画 */ }

/* Agent Cards */
.agent-cards-container { /* 滚动容器 */ }
.agent-card { /* 单个卡片 */ }
.agent-card:hover { /* 悬浮效果 */ }

/* Enterprise Features */
.enterprise-section { /* 企业板块 */ }
.feature-card { /* 功能卡片 */ }
```

## JavaScript Modules

### 新增函数

```javascript
// Avatar Scroller
function initAvatarScroller(agents) { ... }
function startAvatarAnimation() { ... }
function pauseAvatarAnimation() { ... }

// Stat Counter
function animateCounter(element, target, duration) { ... }

// Agent Cards
function initAgentCards(agents) { ... }
function handleCardHover(event) { ... }
```

### 保留现有功能

- `initWorkflowCanvas()` - 工作流动画
- `initParticleCanvas()` - 粒子背景
- `agentData` - Agent 数据对象

## Error Handling

| 错误场景 | 处理方式 | 用户提示 |
|----------|----------|----------|
| 头像加载失败 | 显示首字母占位 | 无 |
| 卡片动画卡顿 | 降低帧率 | 无 |
| 移动端触摸冲突 | 禁用自动滚动 | 支持手动滑动 |

## Security Considerations

- [x] 无外部 API 调用
- [x] 无用户输入处理
- [x] CSP 已配置 (现有)
- [x] 无敏感数据

## Risks & Mitigations

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 滚动动画性能问题 | 中 | 中 | 使用 CSS transform + will-change |
| 移动端兼容性问题 | 低 | 高 | 媒体查询 + 触摸事件 |
| 文件体积增大 | 低 | 低 | 代码压缩 + 图片懒加载 |

## Dependencies

### Existing Dependencies

| Package | Version | 用途 |
|---------|---------|------|
| Google Fonts | - | Inter, JetBrains Mono 字体 |

### No New Dependencies

本项目为纯静态页面，不需要新增 npm 包。

## Breaking Changes

- **CSS 类名变更**: 部分 `.hero-*` 类名重构，可能影响自定义样式
- **HTML 结构变更**: Hero 区域结构重组，需要更新现有嵌入代码

## Testing Strategy

| 测试类型 | 覆盖目标 |
|----------|----------|
| 视觉回归 | 设计稿对比 |
| 响应式测试 | 320px - 1920px |
| 浏览器兼容 | Chrome, Firefox, Safari, Edge |
| 性能测试 | Lighthouse 90+ 分 |

## File Changes Summary

| 文件 | 操作 | 预估行数变化 |
|------|------|--------------|
| index.html | 修改 | +150 行 |
| styles.css | 修改 | +200 行 |
| script.js | 修改 | +100 行 |
| README.md | 新增 | +100 行 |

---

*Next: `openspec continue` to create tasks.md*