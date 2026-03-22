# Spec: Agent Cards Showcase

> Created: 2026-03-22
> Based on: proposal.md

## Feature: Agent Cards with Scrolling Animation

**Description:**
用滚动卡片展示 Agent 能力，每个卡片包含 Agent 名称、角色、技能描述和典型用例。

---

## Scenario 1: Agent 卡片展示

### Happy Path

```gherkin
Feature: Agent Cards Display

  Scenario: 用户浏览 Agent 展示区
    Given 页面已加载
    When 用户滚动到 Agent 展示区域
    Then 显示 Agent 卡片横向滚动列表
    And 每个卡片包含 Agent 名称、角色、技能标签
    And 卡片自动滚动，速度适中

  Scenario: 用户悬浮查看详情
    Given Agent 卡片正在滚动
    When 用户鼠标悬浮在某张卡片上
    Then 滚动暂停
    And 显示 Agent 详细技能描述
    And 显示典型用例列表
```

### Edge Cases

```gherkin
  Scenario: 卡片数量较少时
    Given Agent 数量少于 3 个
    When 展示卡片
    Then 居中显示，不滚动
```

### Error Cases

```gherkin
  Scenario: JavaScript 禁用
    Given 用户浏览器禁用了 JavaScript
    When 页面加载
    Then 显示静态卡片网格布局
    And 功能仍然可访问
```

---

## Acceptance Criteria

- [ ] 卡片滚动动画流畅
- [ ] 悬浮暂停功能正常
- [ ] 移动端支持触摸滑动
- [ ] 卡片内容完整展示
- [ ] 无障碍访问支持 (ARIA)

## Test Data

```json
{
  "agents": [
    {
      "id": "kev",
      "name": "Kev",
      "role": "协调官",
      "skills": ["策略规划", "资源调度", "风险管理"],
      "stack": ["Python", "AI Orchestrator", "Task Planning"],
      "cases": ["GitHub Issue 修复", "团队展示页面", "自动化工作流"],
      "color": "#6366f1"
    },
    {
      "id": "rex",
      "name": "Rex",
      "role": "全栈工程师",
      "skills": ["代码开发", "系统架构", "Bug 修复"],
      "stack": ["Python", "JavaScript", "Go", "FastAPI", "React"],
      "cases": ["前端开发", "后端 API", "数据库优化"],
      "color": "#06b6d4"
    },
    {
      "id": "doc",
      "name": "Doc",
      "role": "文档专家",
      "skills": ["知识管理", "文档生成", "内容结构化"],
      "stack": ["Markdown", "Obsidian", "Content Generation"],
      "cases": ["技术文档", "API 文档", "用户手册"],
      "color": "#ec4899"
    },
    {
      "id": "scout",
      "name": "Scout",
      "role": "信息采集官",
      "skills": ["信息检索", "数据采集", "趋势分析"],
      "stack": ["Web Scraping", "Data Analysis", "Search API"],
      "cases": ["市场调研", "竞品分析", "数据收集"],
      "color": "#10b981"
    },
    {
      "id": "morgan",
      "name": "Morgan",
      "role": "发布专员",
      "skills": ["内容发布", "媒体运营", "渠道管理"],
      "stack": ["CMS", "Social Media API", "Automation"],
      "cases": ["微信公众号", "技术博客", "内容分发"],
      "color": "#f59e0b"
    },
    {
      "id": "sage",
      "name": "Sage",
      "role": "战略顾问",
      "skills": ["战略规划", "决策支持", "风险评估"],
      "stack": ["Strategic Planning", "Risk Analysis", "Decision Support"],
      "cases": ["技术咨询", "架构评审", "风险评估"],
      "color": "#8b5cf6"
    },
    {
      "id": "verifier",
      "name": "Verifier",
      "role": "质量验证",
      "skills": ["代码审查", "质量保证", "合规检查"],
      "stack": ["Code Review", "Quality Assurance", "Compliance"],
      "cases": ["代码审查", "质量检查", "合规验证"],
      "color": "#ef4444"
    }
  ]
}
```

## Notes

- 卡片宽度约 320px，高度自适应
- 滚动间隔 5s 切换一张卡片
- 支持键盘导航 (左右箭头)

---

*Part of change: feature-showcase-redesign-20260322*