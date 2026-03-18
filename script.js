// ==================== AGENT DATA ====================
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

// ==================== WORKFLOW NODES ====================
const workflowNodes = [
    { id: 'user', name: '用户输入', type: 'user', x: 0.1, y: 0.5 },
    { id: 'kev', name: 'Kev', type: 'coordinator', x: 0.3, y: 0.5 },
    { id: 'rex', name: 'Rex', type: 'developer', x: 0.5, y: 0.3 },
    { id: 'doc', name: 'Doc', type: 'analyst', x: 0.5, y: 0.7 },
    { id: 'scout', name: 'Scout', type: 'collector', x: 0.7, y: 0.2 },
    { id: 'morgan', name: 'Morgan', type: 'publisher', x: 0.7, y: 0.8 },
    { id: 'result', name: '返回用户', type: 'result', x: 0.9, y: 0.5 }
];

// ==================== WORKFLOW EDGES ====================
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

// ==================== COLOR CONSTANTS ====================
const COLORS = {
    coordinator: '#6366f1',    // Cyber Purple
    developer: '#06b6d4',      // Neon Blue
    analyst: '#ec4899',        // Neon Pink
    publisher: '#10b981',      // Neon Green
    user: '#94a3b8',
    result: '#6366f1'
};

// ==================== GLOBAL VARIABLES ====================
let workflowCanvas, workflowCtx;
let particleCanvas, particleCtx;
let workflowAnimationId;
let particleAnimationId;
let activeNodes = new Set();
let currentAnimationStep = 0;
let particles = [];
let mousePosition = { x: 0, y: 0 };
let isMobile = window.innerWidth <= 768;

// ==================== INITIALIZE ON DOM LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    initParticleBackground();
    initWorkflowCanvas();
    initAnimations();
    initCounterAnimations();
    initScrollAnimations();
    initCardEffects();
    initParallax();
    initTypingEffect();
    initAgentDetails();
    startWorkflowAnimation();
    createWorkflowNodes();
    initMouseGlow();
    initFlipCards();
    initMagneticCards();
    initPerformanceMonitoring();
});

// ==================== FULLSCREEN PARTICLE BACKGROUND ====================
function initParticleBackground() {
    particleCanvas = document.getElementById('particleCanvas');
    if (!particleCanvas) return;

    particleCtx = particleCanvas.getContext('2d');
    resizeParticleCanvas();
    
    window.addEventListener('resize', () => {
        resizeParticleCanvas();
        initParticles();
    });

    window.addEventListener('mousemove', (e) => {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
    });

    initParticles();
    animateParticles();
}

function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function initParticles() {
    particles = [];
    const particleCount = isMobile ? 50 : 100; // Performance optimization for mobile

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? COLORS.coordinator : COLORS.developer
        });
    }
}

function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    // Update and draw particles
    particles.forEach((particle, i) => {
        // Mouse repulsion effect
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150;

        if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            particle.vx -= (dx / distance) * force * 0.5;
            particle.vy -= (dy / distance) * force * 0.5;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > particleCanvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > particleCanvas.height) particle.vy *= -1;

        // Draw particle
        particleCtx.beginPath();
        particleCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        particleCtx.fillStyle = particle.color;
        particleCtx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const d = Math.sqrt(
                (particle.x - other.x) ** 2 + 
                (particle.y - other.y) ** 2
            );

            if (d < 100) {
                const opacity = 1 - d / 100;
                particleCtx.beginPath();
                particleCtx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
                particleCtx.lineWidth = 0.5;
                particleCtx.moveTo(particle.x, particle.y);
                particleCtx.lineTo(other.x, other.y);
                particleCtx.stroke();
            }
        }
    });

    particleAnimationId = requestAnimationFrame(animateParticles);
}

// ==================== WORKFLOW CANVAS ====================
function initWorkflowCanvas() {
    workflowCanvas = document.getElementById('workflowCanvas');
    if (!workflowCanvas) return;

    workflowCtx = workflowCanvas.getContext('2d');
    resizeWorkflowCanvas();
    window.addEventListener('resize', resizeWorkflowCanvas);
    drawWorkflow();
}

function resizeWorkflowCanvas() {
    const container = workflowCanvas.parentElement;
    workflowCanvas.width = container.clientWidth;
    workflowCanvas.height = 600;
    drawWorkflow();
}

function drawWorkflow() {
    if (!workflowCtx) return;

    workflowCtx.clearRect(0, 0, workflowCanvas.width, workflowCanvas.height);

    // Draw edges with gradient and animation
    workflowEdges.forEach((edge, index) => {
        const fromNode = workflowNodes.find(n => n.id === edge.from);
        const toNode = workflowNodes.find(n => n.id === edge.to);
        if (fromNode && toNode) {
            drawAnimatedEdge(fromNode, toNode, edge, index);
        }
    });

    // Draw nodes with glow effects
    workflowNodes.forEach(node => {
        drawEnhancedNode(node);
    });
}

function drawAnimatedEdge(from, to, edge, index) {
    const startX = from.x * workflowCanvas.width;
    const startY = from.y * workflowCanvas.height;
    const endX = to.x * workflowCanvas.width;
    const endY = to.y * workflowCanvas.height;

    // Bezier curve for smooth connections
    const controlX1 = startX + (endX - startX) * 0.5;
    const controlY1 = startY;
    const controlX2 = startX + (endX - startX) * 0.5;
    const controlY2 = endY;

    // Draw dashed line with animation
    workflowCtx.beginPath();
    workflowCtx.setLineDash([5, 5]);
    workflowCtx.lineDashOffset = -Date.now() / 50; // Animated dash
    workflowCtx.moveTo(startX, startY);
    workflowCtx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    
    const gradient = workflowCtx.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');
    workflowCtx.strokeStyle = gradient;
    workflowCtx.lineWidth = 2;
    workflowCtx.stroke();
    workflowCtx.setLineDash([]); // Reset dash

    // Draw beam effect for active path
    if (activeNodes.has(from.id) && activeNodes.has(to.id)) {
        workflowCtx.beginPath();
        workflowCtx.moveTo(startX, startY);
        workflowCtx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
        const activeGradient = workflowCtx.createLinearGradient(startX, startY, endX, endY);
        activeGradient.addColorStop(0, COLORS.coordinator);
        activeGradient.addColorStop(1, COLORS.developer);
        workflowCtx.strokeStyle = activeGradient;
        workflowCtx.lineWidth = 3;
        workflowCtx.shadowColor = COLORS.coordinator;
        workflowCtx.shadowBlur = 15;
        workflowCtx.stroke();
        workflowCtx.shadowBlur = 0;
    }
}

function drawEnhancedNode(node) {
    const x = node.x * workflowCanvas.width;
    const y = node.y * workflowCanvas.height;
    const radius = 40;
    const isActive = activeNodes.has(node.id);

    // Draw outer glow for active nodes
    if (isActive) {
        const glowGradient = workflowCtx.createRadialGradient(x, y, radius, x, y, radius * 2.5);
        glowGradient.addColorStop(0, `${COLORS[node.type] || COLORS.coordinator}40`);
        glowGradient.addColorStop(1, 'transparent');
        workflowCtx.beginPath();
        workflowCtx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
        workflowCtx.fillStyle = glowGradient;
        workflowCtx.fill();

        // Pulse animation
        const pulseScale = 1 + Math.sin(Date.now() / 200) * 0.1;
        const pulseGradient = workflowCtx.createRadialGradient(x, y, radius * pulseScale, x, y, radius * 2 * pulseScale);
        pulseGradient.addColorStop(0, `${COLORS[node.type] || COLORS.coordinator}30`);
        pulseGradient.addColorStop(1, 'transparent');
        workflowCtx.beginPath();
        workflowCtx.arc(x, y, radius * 2 * pulseScale, 0, Math.PI * 2);
        workflowCtx.fillStyle = pulseGradient;
        workflowCtx.fill();
    }

    // Draw node circle with gradient
    workflowCtx.beginPath();
    workflowCtx.arc(x, y, radius, 0, Math.PI * 2);

    const nodeColor = COLORS[node.type] || COLORS.coordinator;
    const gradient = workflowCtx.createRadialGradient(x - radius/3, y - radius/3, 0, x, y, radius);
    gradient.addColorStop(0, nodeColor);
    gradient.addColorStop(1, adjustColorBrightness(nodeColor, -40));
    workflowCtx.fillStyle = gradient;
    workflowCtx.fill();

    // Draw border
    workflowCtx.strokeStyle = isActive ? COLORS.publisher : nodeColor;
    workflowCtx.lineWidth = isActive ? 3 : 2;
    if (isActive) {
        workflowCtx.shadowColor = nodeColor;
        workflowCtx.shadowBlur = 20;
    }
    workflowCtx.stroke();
    workflowCtx.shadowBlur = 0;

    // Draw label
    workflowCtx.fillStyle = '#ffffff';
    workflowCtx.font = 'bold 12px Inter, -apple-system, sans-serif';
    workflowCtx.textAlign = 'center';
    workflowCtx.textBaseline = 'middle';
    workflowCtx.fillText(node.name, x, y);
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

// ==================== WORKFLOW ANIMATION ====================
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

    // Create multiple particles for data flow
    createDataFlowParticles(fromNode, toNode);

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

function createDataFlowParticles(fromNode, toNode) {
    const particlesContainer = document.querySelector('.data-flow-particles');
    if (!particlesContainer) return;

    // Create 3 particles for each data flow
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
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

            // Add glow effect
            particle.style.boxShadow = '0 0 10px #6366f1, 0 0 20px #6366f1';

            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 300);
    }
}

// ==================== WORKFLOW NODES ====================
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

// ==================== AGENT DETAILS PANEL ====================
function initAgentDetails() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger flip when clicking on back card
            if (!e.target.closest('.flip-card') || e.target.closest('.card-back')) {
                return;
            }
            const agentName = card.dataset.agent;
            if (agentName && !card.classList.contains('flipped')) {
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

document.addEventListener('click', (e) => {
    const panel = document.getElementById('agentDetails');
    if (panel.classList.contains('visible') && !panel.contains(e.target) && !e.target.closest('.member-card') && !e.target.closest('.workflow-node')) {
        closeAgentDetails();
    }
});

// ==================== COUNTER ANIMATIONS ====================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .metric-value, .case-metric .metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target) || parseInt(counter.textContent);
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    // easeOutQuart easing function
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        current = Math.floor(easedProgress * target);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

// ==================== SCROLL ANIMATIONS ====================
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

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Stagger animation
    const addStaggerAnimation = (selector, baseDelay) => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.animationDelay = `${baseDelay + index * 0.1}s`;
            card.style.opacity = '0';
            card.style.animation = `fadeInUp 0.6s ease-out forwards ${baseDelay + index * 0.1}s`;
        });
    };

    setTimeout(() => {
        addStaggerAnimation('.member-card', 0);
        addStaggerAnimation('.case-card', 0);
        addStaggerAnimation('.metric-card', 0);
        addStaggerAnimation('.why-card', 0);
    }, 500);
}

// ==================== CARD EFFECTS ====================
function initCardEffects() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==================== MAGNETIC CARDS ====================
function initMagneticCards() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const magnetStrength = 0.3;
            const moveX = x * magnetStrength;
            const moveY = y * magnetStrength;

            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== FLIP CARDS ====================
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't flip if clicking on back card
            if (e.target.closest('.card-back')) {
                return;
            }
            card.classList.toggle('flipped');
        });
    });
}

// ==================== PARALLAX EFFECT ====================
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

// ==================== MOUSE GLOW EFFECT ====================
function initMouseGlow() {
    const mouseGlow = document.getElementById('mouseGlow');
    if (!mouseGlow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateGlow() {
        // Smooth follow
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        mouseGlow.style.left = `${glowX}px`;
        mouseGlow.style.top = `${glowY}px`;

        requestAnimationFrame(updateGlow);
    }

    updateGlow();
}

// ==================== TYPING EFFECT ====================
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

// ==================== GENERAL ANIMATIONS ====================
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

// ==================== REVEAL ON SCROLL ====================
function reveal() {
    const reveals = document.querySelectorAll('.glass-card');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ==================== PERFORMANCE MONITORING ====================
function initPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();

    function monitorFPS() {
        const currentTime = performance.now();
        frameCount++;

        if (currentTime - lastTime >= 1000) {
            const fps = frameCount;
            console.log(`FPS: ${fps}`);
            
            // Optimize if FPS drops below 30
            if (fps < 30 && particles.length > 50) {
                particles = particles.slice(0, 50);
                console.log('Optimized: Reduced particle count to 50');
            }

            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(monitorFPS);
    }

    monitorFPS();
}

// ==================== THROTTLE SCROLL EVENTS ====================
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        reveal();
    });
});

// ==================== RESIZE HANDLER ====================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        isMobile = window.innerWidth <= 768;
        if (!isMobile && particles.length < 100) {
            initParticles();
        }
    }, 250);
});

console.log('✨ Kev Team Showcase loaded successfully with enhanced visual effects!');
