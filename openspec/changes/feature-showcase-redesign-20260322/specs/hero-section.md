# Spec: Hero Section Redesign

> Created: 2026-03-22
> Based on: proposal.md

## Feature: Hero Section with Team Avatars

**Description:**
改版 Hero 区域，添加团队成员头像滚动展示、里程碑徽章、以及优化的统计数据展示。

---

## Scenario 1: 页面加载展示

### Happy Path

```gherkin
Feature: Hero Section Display

  Scenario: 用户首次访问页面
    Given 用户打开 team-showcase 页面
    When 页面加载完成
    Then Hero 区域显示大标题 "ClawTeam - 智能协作系统"
    And 显示里程碑徽章 "GitHub 级别编排能力"
    And 显示团队成员头像滚动动画
    And 显示统计数据 (7 Agents, 95% 成功率, 100+ PRs)

  Scenario: 用户查看团队头像
    Given 页面已加载
    When 用户观察 Hero 区域
    Then 显示 7 个 Agent 头像横向滚动
    And 每个头像显示 Agent 名称和角色标签
    And 悬浮时显示 Agent 简要描述
```

### Edge Cases

```gherkin
  Scenario: 移动端适配
    Given 用户使用移动设备访问
    When 页面加载完成
    Then 头像滚动改为垂直方向
    And 统计数据改为 2x2 网格布局
    And Hero 高度自适应屏幕
```

### Error Cases

```gherkin
  Scenario: 头像图片加载失败
    Given 某个 Agent 头像图片 URL 无效
    When 页面尝试加载头像
    Then 显示默认占位头像
    And 不影响其他头像正常显示
```

---

## Acceptance Criteria

- [x] Hero 标题显示正确
- [ ] 里程碑徽章样式符合设计
- [ ] 团队头像滚动动画流畅
- [ ] 统计数据计数动画正确
- [ ] 移动端响应式布局正常

## Test Data

```json
{
  "teamName": "ClawTeam",
  "tagline": "智能协作系统",
  "badge": "GitHub 级别编排能力",
  "stats": [
    { "value": 7, "label": "专业 Agent" },
    { "value": 95, "label": "成功率 %" },
    { "value": 100, "label": "GitHub PR" }
  ],
  "agents": [
    { "name": "Kev", "role": "协调官" },
    { "name": "Rex", "role": "全栈工程师" },
    { "name": "Doc", "role": "文档专家" },
    { "name": "Scout", "role": "信息采集官" },
    { "name": "Morgan", "role": "发布专员" },
    { "name": "Sage", "role": "战略顾问" },
    { "name": "Verifier", "role": "质量验证" }
  ]
}
```

## Notes

- 头像可使用 SVG 占位符或彩色首字母圆圈
- 滚动速度约 30s 一轮
- 参考 Gumloop 的头像展示风格

---

*Part of change: feature-showcase-redesign-20260322*