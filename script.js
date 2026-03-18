// Agent Data
const agentData = {
    'Kev': {
        role: '协调官',
        skills: ['策略规划', '资源调度', '风险管理'],
        stack: ['Python', 'AI Orchestrator', 'Task Planning'],
        cases: ['GitHub Issue 修复', '团队展示页面', '自动化工作流']
    },
    'Rex': {
        role: '全栈工程师',
        skills: ['代码开发', '系统架构', 'Bug 修复'],
        stack: ['Python', 'JavaScript', 'Go', 'FastAPI', 'React'],
        cases: ['前端开发', '后端 API', '数据库优化']
    },
    'Doc': {
        role: '文档专家',
        skills: ['知识管理', '文档生成', '内容结构化'],
        stack: ['Markdown', 'Obsidian', 'Content Generation'],
        cases: ['技术文档', 'API 文档', '用户手册']
    },
    'Scout': {
        role: '信息采集官',
        skills: ['信息检索', '数据采集', '趋势分析'],
        stack: ['Web Scraping', 'Data Analysis', 'Search API'],
        cases: ['市场调研', '竞品分析', '数据收集']
    },
    'Morgan': {
        role: '发布专员',
        skills: ['内容发布', '媒体运营', '渠道管理'],
        stack: ['CMS', 'Social Media API', 'Automation'],
        cases: ['微信公众号', '技术博客', '内容分发']
    },
    'Sage': {
        role: '战略顾问',
        skills: ['战略规划', '决策支持', '风险评估'],
        stack: ['Strategic Planning', 'Risk Analysis', 'Decision Support'],
        cases: ['技术咨询', '架构评审', '风险评估']
    },
    'Verifier': {
        role: '质量验证',
        skills: ['代码审查', '质量保证', '合规检查'],
        stack: ['Code Review', 'Quality Assurance', 'Compliance'],
        cases: ['代码审查', '质量检查', '合规验证']
    }
};

// Workflow Node Positions
const workflowNodes = [
    { id: 'user', name: '用户输入', type: 'user', x: 0.1, y: 0.5 },
    { id: 'kev', name: 'Kev', type: 'coordinator', x: 0.3, y: 0.5 },
    { id: 'rex', name: 'Rex', type: 'developer', x: 0.5, y: 0.3 },
    { id: 'doc', name: 'Doc', type: 'analyst', x: 0.5, y: 0.7 },
    { id: 'scout', name: 'Scout', type: 'collector', x: 0.7, y: 0.2 },
    { id: 'morgan', name: 'Morgan', type: 'publisher', x: 0.7, y: 0.8 },
    { id: 'result', name: '返回用户', type: 'result', x: 0.9, y: 0.5 }
];

// Workflow Edges (Data flow)
const workflowEdges = [
    { from: 'user', to: 'kev', type: 'request' },
    { from: 'kev', to: 'rex', type: 'dispatch' },
    { from: 'kev', to: 'doc', type: 'dispatch' },
    { from: 'rex', to: 'scout', type: 'collaborate' },
    { from: 'doc', to: 'morgan', type: 'collaborate' },
    { from: 'rex', to: 'result', type: 'result' },
    { from: 'doc', to: 'result', type: 'result' },
    { from: 'scout', to: 'result', type: 'result' },
    { from: 'morgan', to: 'result', type: 'result' }
];

// Canvas and Animation Variables
let canvas, ctx;
let animationId;
let particles = [];
let activeNodes = new Set();
let currentAnimationStep = 0;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initWorkflowCanvas();
    initAnimations();
    initCounterAnimations();
    initScrollAnimations();
    initCardEffects();
    initParallax();
    initTypingEffect();
    initParticles();
    initAgentDetails();
    startWorkflowAnimation();
    createWorkflowNodes();
});

// Initialize Workflow Canvas
function initWorkflowCanvas() {
    canvas = document.getElementById('workflowCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawWorkflow();
}

function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = 600;
    drawWorkflow();
}

// Draw Workflow
function drawWorkflow() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    workflowEdges.forEach(edge => {
        const fromNode = workflowNodes.find(n => n.id === edge.from);
        const toNode = workflowNodes.find(n => n.id === edge.to);
        if (fromNode && toNode) {
            drawEdge(fromNode, toNode);
        }
    });

    // Draw nodes
    workflowNodes.forEach(node => {
        drawNode(node);
    });
}

function drawEdge(from, to) {
    const startX = from.x * canvas.width;
    const startY = from.y * canvas.height;
    const endX = to.x * canvas.width;
    const endY = to.y * canvas.height;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    // Bezier curve for smooth connections
    const controlX1 = startX + (endX - startX) * 0.5;
    const controlY1 = startY;
    const controlX2 = startX + (endX - startX) * 0.5;
    const controlY2 = endY;
    
    ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add gradient to edge
    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(123, 44, 191, 0.1)');
    ctx.strokeStyle = gradient;
    ctx.stroke();
}

function drawNode(node) {
    const x = node.x * canvas.width;
    const y = node.y * canvas.height;
    const radius = 40;

    // Draw glow effect for active nodes
    if (activeNodes.has(node.id)) {
        const glowGradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 2);
        glowGradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        glowGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
    }

    // Draw node circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    // Node color based on type
    let nodeColor;
    switch (node.type) {
        case 'coordinator':
            nodeColor = '#00d4ff';
            break;
        case 'developer':
            nodeColor = '#7b2cbf';
            break;
        case 'analyst':
            nodeColor = '#f72585';
            break;
        case 'publisher':
            nodeColor = '#00ff88';
            break;
        case 'user':
            nodeColor = '#94a3b8';
            break;
        case 'result':
            nodeColor = '#00d4ff';
            break;
        default:
            nodeColor = '#00d4ff';
    }

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, nodeColor);
    gradient.addColorStop(1, adjustColorBrightness(nodeColor, -30));
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw border
    ctx.strokeStyle = activeNodes.has(node.id) ? '#00ff88' : nodeColor;
    ctx.lineWidth = activeNodes.has(node.id) ? 3 : 2;
    ctx.stroke();

    // Draw label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.name, x, y);
}

function adjustColorBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Create Workflow Nodes in DOM
function createWorkflowNodes() {
    const nodesContainer = document.querySelector('.workflow-nodes');
    if (!nodesContainer) return;

    workflowNodes.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.className = `workflow-node workflow-node-${node.type}`;
        nodeElement.style.left = `${node.x * 100}%`;
        nodeElement.style.top = `${node.y * 100}%`;
        nodeElement.style.transform = 'translate(-50%, -50%)';
        nodeElement.dataset.nodeId = node.id;

        if (agentData[node.name]) {
            nodeElement.addEventListener('click', () => showAgentDetails(node.name));
        }

        const icon = getNodeIcon(node.type);
        const text = node.name;

        nodeElement.innerHTML = `
            <span class="workflow-node-icon">${icon}</span>
            <span class="workflow-node-text">${text}</span>
        `;

        nodesContainer.appendChild(nodeElement);
    });
}

function getNodeIcon(type) {
    switch (type) {
        case 'coordinator':
            return '🎯';
        case 'developer':
            return '💻';
        case 'analyst':
            return '📊';
        case 'publisher':
            return '📢';
        case 'user':
            return '👤';
        case 'result':
            return '✅';
        default:
            return '⚡';
    }
}

// Start Workflow Animation
function startWorkflowAnimation() {
    currentAnimationStep = 0;
    animateWorkflow();
}

function animateWorkflow() {
    if (currentAnimationStep >= workflowEdges.length) {
        currentAnimationStep = 0;
        setTimeout(animateWorkflow, 3000);
        return;
    }

    const edge = workflowEdges[currentAnimationStep];
    animateDataFlow(edge.from, edge.to);
    currentAnimationStep++;

    setTimeout(animateWorkflow, 2000);
}

function animateDataFlow(fromNodeId, toNodeId) {
    const fromNode = workflowNodes.find(n => n.id === fromNodeId);
    const toNode = workflowNodes.find(n => n.id === toNodeId);

    if (!fromNode || !toNode) return;

    // Activate nodes
    activeNodes.add(fromNodeId);
    activeNodes.add(toNodeId);

    // Highlight DOM nodes
    const fromDomNode = document.querySelector(`[data-node-id="${fromNodeId}"]`);
    const toDomNode = document.querySelector(`[data-node-id="${toNodeId}"]`);
    
    if (fromDomNode) fromDomNode.classList.add('active');
    if (toDomNode) toDomNode.classList.add('active');

    // Create particle
    createParticle(fromNode, toNode);

    // Redraw canvas
    drawWorkflow();

    // Deactivate after animation
    setTimeout(() => {
        activeNodes.delete(fromNodeId);
        activeNodes.delete(toNodeId);
        
        if (fromDomNode) fromDomNode.classList.remove('active');
        if (toDomNode) toDomNode.classList.remove('active');
        
        drawWorkflow();
    }, 2000);
}

function createParticle(fromNode, toNode) {
    const particlesContainer = document.querySelector('.data-flow-particles');
    if (!particlesContainer) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const startX = fromNode.x * 100;
    const startY = fromNode.y * 100;
    const endX = toNode.x * 100;
    const endY = toNode.y * 100;

    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}%`;
    particle.style.setProperty('--tx', `${endX - startX}%`);
    particle.style.setProperty('--ty', `${endY - startY}%`);

    particlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Agent Details Panel
function initAgentDetails() {
    // Add click listeners to member cards
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', () => {
            const agentName = card.dataset.agent;
            if (agentName) {
                showAgentDetails(agentName);
            }
        });
    });
}

function showAgentDetails(agentName) {
    const agent = agentData[agentName];
    if (!agent) return;

    const panel = document.getElementById('agentDetails');
    document.getElementById('agentName').textContent = agentName;
    document.getElementById('agentRole').textContent = agent.role;

    const skillsContainer = document.getElementById('agentSkills');
    skillsContainer.innerHTML = agent.skills.map(skill => `<span>${skill}</span>`).join('');

    const stackContainer = document.getElementById('agentStack');
    stackContainer.innerHTML = agent.stack.map(tech => `<span>${tech}</span>`).join('');

    const casesContainer = document.getElementById('agentCases');
    casesContainer.innerHTML = agent.cases.map(c => `<span>${c}</span>`).join('');

    panel.classList.add('visible');
}

function closeAgentDetails() {
    const panel = document.getElementById('agentDetails');
    panel.classList.remove('visible');
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('agentDetails');
    if (panel.classList.contains('visible') && !panel.contains(e.target) && !e.target.closest('.member-card') && !e.target.closest('.workflow-node')) {
        closeAgentDetails();
    }
});

// Initialize Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target) || parseInt(counter.textContent);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Initialize Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add stagger animation delay to cards
    const addStaggerAnimation = (selector, baseDelay) => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.animationDelay = `${baseDelay + index * 0.1}s`;
            card.style.opacity = '0';
            card.style.animation = `fadeInUp 0.6s ease-out forwards ${baseDelay + index * 0.1}s`;
        });
    };

    // Apply stagger animations
    setTimeout(() => {
        addStaggerAnimation('.member-card', 0);
        addStaggerAnimation('.case-card', 0);
        addStaggerAnimation('.metric-card', 0);
        addStaggerAnimation('.why-card', 0);
    }, 500);
}

// Initialize Card Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.member-card, .capability-card, .case-card, .metric-card, .why-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1) translateY(-2px)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Initialize Parallax Effect
function initParallax() {
    const heroCircles = document.querySelectorAll('.hero-bg .circle');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        heroCircles.forEach((circle, index) => {
            const speed = (index + 1) * 10;
            circle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Initialize Typing Effect
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
}

// Initialize Particles
function initParticles() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: particleRise ${Math.random() * 3 + 2}s linear forwards;
        `;

        heroBg.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    setInterval(createParticle, 500);

    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleRise {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize General Animations
function initAnimations() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add fadeInUp keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.member-card, .capability-card, .case-card, .metric-card, .why-card');
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        reveal();
    });
});

console.log('✨ Kev Team Showcase loaded successfully!');
