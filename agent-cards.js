// Agent Cards Showcase Module

(function() {
    'use strict';

    // Test data from specs
    const agents = [
        {
            id: "kev",
            name: "Kev",
            role: "协调官",
            skills: ["策略规划", "资源调度", "风险管理"],
            stack: ["Python", "AI Orchestrator", "Task Planning"],
            cases: ["GitHub Issue 修复", "团队展示页面", "自动化工作流"],
            color: "#6366f1"
        },
        {
            id: "rex",
            name: "Rex",
            role: "全栈工程师",
            skills: ["代码开发", "系统架构", "Bug 修复"],
            stack: ["Python", "JavaScript", "Go", "FastAPI", "React"],
            cases: ["前端开发", "后端 API", "数据库优化"],
            color: "#06b6d4"
        },
        {
            id: "doc",
            name: "Doc",
            role: "文档专家",
            skills: ["知识管理", "文档生成", "内容结构化"],
            stack: ["Markdown", "Obsidian", "Content Generation"],
            cases: ["技术文档", "API 文档", "用户手册"],
            color: "#ec4899"
        },
        {
            id: "scout",
            name: "Scout",
            role: "信息采集官",
            skills: ["信息检索", "数据采集", "趋势分析"],
            stack: ["Web Scraping", "Data Analysis", "Search API"],
            cases: ["市场调研", "竞品分析", "数据收集"],
            color: "#10b981"
        },
        {
            id: "morgan",
            name: "Morgan",
            role: "发布专员",
            skills: ["内容发布", "媒体运营", "渠道管理"],
            stack: ["CMS", "Social Media API", "Automation"],
            cases: ["微信公众号", "技术博客", "内容分发"],
            color: "#f59e0b"
        },
        {
            id: "sage",
            name: "Sage",
            role: "战略顾问",
            skills: ["战略规划", "决策支持", "风险评估"],
            stack: ["Strategic Planning", "Risk Analysis", "Decision Support"],
            cases: ["技术咨询", "架构评审", "风险评估"],
            color: "#8b5cf6"
        },
        {
            id: "verifier",
            name: "Verifier",
            role: "质量验证",
            skills: ["代码审查", "质量保证", "合规检查"],
            stack: ["Code Review", "Quality Assurance", "Compliance"],
            cases: ["代码审查", "质量检查", "合规验证"],
            color: "#ef4444"
        }
    ];

    // Configuration
    const CONFIG = {
        scrollInterval: 5000, // 5 seconds
        cardWidth: 320,
        gap: 32, // 2rem
        padding: 32, // 2rem
        autoScroll: true,
        pauseOnHover: true
    };

    // State
    let state = {
        currentIndex: 0,
        isAutoScrolling: CONFIG.autoScroll,
        scrollIntervalId: null,
        isHovering: false
    };

    // DOM Elements
    let elements = {};

    /**
     * Initialize Agent Cards Showcase
     */
    function init() {
        // Get DOM elements
        elements.scrollContainer = document.getElementById('agentCardsScroll');
        elements.indicatorsContainer = document.getElementById('scrollIndicators');
        elements.autoScrollToggle = document.getElementById('autoScrollToggle');
        elements.prevBtn = document.querySelector('.scroll-prev');
        elements.nextBtn = document.querySelector('.scroll-next');

        // Check if elements exist
        if (!elements.scrollContainer) {
            console.error('Agent cards scroll container not found');
            return;
        }

        // Render cards
        renderCards();

        // Render indicators
        renderIndicators();

        // Bind events
        bindEvents();

        // Start auto-scroll
        if (state.isAutoScrolling) {
            startAutoScroll();
        }

        // Highlight first card
        updateActiveCard(0);

        console.log('Agent Cards Showcase initialized');
    }

    /**
     * Render Agent Cards
     */
    function renderCards() {
        elements.scrollContainer.innerHTML = agents.map((agent, index) => {
            return `
                <article class="agent-card glass-card neon-card"
                         role="article"
                         tabindex="0"
                         aria-label="${agent.name} - ${agent.role}"
                         data-index="${index}"
                         data-agent-id="${agent.id}">
                    <div class="agent-card-header">
                        <div class="agent-card-avatar" style="background: linear-gradient(135deg, ${agent.color} 0%, ${adjustColor(agent.color, -30)} 100%);">
                            ${agent.name.charAt(0)}
                        </div>
                        <div class="agent-card-name">
                            <h3>${agent.name}</h3>
                            <p class="agent-card-role">${agent.role}</p>
                        </div>
                    </div>

                    <div class="agent-card-skills">
                        ${agent.skills.map(skill => `<span class="agent-skill-tag">${skill}</span>`).join('')}
                    </div>

                    <div class="agent-card-detail">
                        <h4 class="agent-detail-title">技术栈</h4>
                        <div class="agent-detail-content">
                            ${agent.stack.map(tech => `<span class="agent-detail-item">${tech}</span>`).join('')}
                        </div>

                        <h4 class="agent-detail-title">典型用例</h4>
                        <div class="agent-cases">
                            ${agent.cases.map(case_item => `<span class="agent-case-item">${case_item}</span>`).join('')}
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Animate cards in
        const cards = elements.scrollContainer.querySelectorAll('.agent-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
        });
    }

    /**
     * Render Scroll Indicators
     */
    function renderIndicators() {
        if (!elements.indicatorsContainer) return;

        elements.indicatorsContainer.innerHTML = agents.map((_, index) => {
            return `
                <button class="scroll-indicator"
                        role="tab"
                        aria-label="查看第 ${index + 1} 个 Agent"
                        aria-selected="${index === 0}"
                        data-index="${index}"
                        tabindex="0">
                </button>
            `;
        }).join('');
    }

    /**
     * Bind Event Listeners
     */
    function bindEvents() {
        // Scroll container hover events
        if (elements.scrollContainer) {
            elements.scrollContainer.addEventListener('mouseenter', handleMouseEnter);
            elements.scrollContainer.addEventListener('mouseleave', handleMouseLeave);
            elements.scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
            elements.scrollContainer.addEventListener('touchend', handleTouchEnd);
        }

        // Navigation buttons
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', () => scrollCard(-1));
        }
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', () => scrollCard(1));
        }

        // Auto-scroll toggle
        if (elements.autoScrollToggle) {
            elements.autoScrollToggle.addEventListener('click', toggleAutoScroll);
        }

        // Click on card
        elements.scrollContainer.addEventListener('click', handleCardClick);

        // Click on indicator
        if (elements.indicatorsContainer) {
            elements.indicatorsContainer.addEventListener('click', handleIndicatorClick);
        }

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
    }

    /**
     * Handle Mouse Enter (Pause Auto-scroll)
     */
    function handleMouseEnter() {
        state.isHovering = true;
        if (state.isAutoScrolling) {
            pauseAutoScroll();
        }
    }

    /**
     * Handle Mouse Leave (Resume Auto-scroll)
     */
    function handleMouseLeave() {
        state.isHovering = false;
        if (state.isAutoScrolling) {
            resumeAutoScroll();
        }
    }

    /**
     * Handle Touch Start
     */
    let touchStartX = 0;
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        state.isHovering = true;
        if (state.isAutoScrolling) {
            pauseAutoScroll();
        }
    }

    /**
     * Handle Touch End
     */
    function handleTouchEnd(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) { // Threshold for swipe
            if (diff > 0) {
                scrollCard(1); // Swipe left - next card
            } else {
                scrollCard(-1); // Swipe right - previous card
            }
        }

        state.isHovering = false;
        if (state.isAutoScrolling) {
            resumeAutoScroll();
        }
    }

    /**
     * Handle Card Click
     */
    function handleCardClick(e) {
        const card = e.target.closest('.agent-card');
        if (card) {
            const index = parseInt(card.dataset.index);
            updateActiveCard(index);
        }
    }

    /**
     * Handle Indicator Click
     */
    function handleIndicatorClick(e) {
        if (e.target.classList.contains('scroll-indicator')) {
            const index = parseInt(e.target.dataset.index);
            scrollToCard(index);
        }
    }

    /**
     * Handle Keyboard Navigation
     */
    function handleKeyDown(e) {
        // Check if focus is on agent cards section
        const activeElement = document.activeElement;
        const isInAgentCards = activeElement.closest('.agent-cards-showcase');

        if (!isInAgentCards) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                scrollCard(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                scrollCard(1);
                break;
            case 'Home':
                e.preventDefault();
                scrollToCard(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToCard(agents.length - 1);
                break;
        }
    }

    /**
     * Scroll to specific card
     */
    function scrollToCard(index) {
        if (index < 0) index = 0;
        if (index >= agents.length) index = agents.length - 1;

        state.currentIndex = index;
        const scrollPosition = index * (CONFIG.cardWidth + CONFIG.gap);

        elements.scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        updateActiveCard(index);
    }

    /**
     * Scroll by direction
     */
    function scrollCard(direction) {
        const newIndex = state.currentIndex + direction;
        scrollToCard(newIndex);
    }

    /**
     * Update Active Card
     */
    function updateActiveCard(index) {
        // Update cards
        const cards = elements.scrollContainer.querySelectorAll('.agent-card');
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
                card.setAttribute('aria-selected', 'true');
            } else {
                card.classList.remove('active');
                card.setAttribute('aria-selected', 'false');
            }
        });

        // Update indicators
        const indicators = elements.indicatorsContainer.querySelectorAll('.scroll-indicator');
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-selected', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-selected', 'false');
            }
        });

        // Update navigation buttons
        if (elements.prevBtn) {
            elements.prevBtn.disabled = index === 0;
        }
        if (elements.nextBtn) {
            elements.nextBtn.disabled = index === agents.length - 1;
        }
    }

    /**
     * Start Auto-scroll
     */
    function startAutoScroll() {
        if (state.scrollIntervalId) return;

        state.scrollIntervalId = setInterval(() => {
            const nextIndex = (state.currentIndex + 1) % agents.length;
            scrollToCard(nextIndex);
        }, CONFIG.scrollInterval);

        console.log('Auto-scroll started');
    }

    /**
     * Pause Auto-scroll
     */
    function pauseAutoScroll() {
        if (state.scrollIntervalId) {
            clearInterval(state.scrollIntervalId);
            state.scrollIntervalId = null;
            console.log('Auto-scroll paused');
        }
    }

    /**
     * Resume Auto-scroll
     */
    function resumeAutoScroll() {
        startAutoScroll();
    }

    /**
     * Toggle Auto-scroll
     */
    function toggleAutoScroll() {
        state.isAutoScrolling = !state.isAutoScrolling;

        if (state.isAutoScrolling) {
            startAutoScroll();
            elements.autoScrollToggle.setAttribute('aria-pressed', 'true');
            elements.autoScrollToggle.querySelector('.toggle-icon').textContent = '⏸';
            elements.autoScrollToggle.querySelector('.toggle-text').textContent = '自动滚动';
        } else {
            pauseAutoScroll();
            elements.autoScrollToggle.setAttribute('aria-pressed', 'false');
            elements.autoScrollToggle.querySelector('.toggle-icon').textContent = '▶';
            elements.autoScrollToggle.querySelector('.toggle-text').textContent = '手动滚动';
        }
    }

    /**
     * Adjust color brightness
     */
    function adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const r = (num >> 16) + amount;
        const g = ((num >> 8) & 0x00FF) + amount;
        const b = (num & 0x0000FF) + amount;
        const newNum = Math.min(Math.max(0, Math.min(255, r)) << 16) |
                       Math.min(Math.max(0, Math.min(255, g)) << 8) |
                       Math.min(Math.max(0, Math.min(255, b));
        return '#' + newNum.toString(16).padStart(6, '0');
    }

    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API
    window.AgentCardsShowcase = {
        init,
        scrollToCard,
        toggleAutoScroll,
        startAutoScroll,
        pauseAutoScroll
    };

})();
