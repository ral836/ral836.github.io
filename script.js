// 动态星空背景特效
const canvas = document.getElementById('starry-sky');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 100;
const starSize = 1.5;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = []; // 重新生成星星以适应新尺寸
    createStars();
}

function createStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * starSize,
            alpha: Math.random(),
            speed: Math.random() * 0.1 + 0.05
        });
    }
}

function updateStars() {
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1) {
            star.alpha = 0;
            star.speed = Math.random() * 0.1 + 0.05;
        }
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(star.alpha * Math.PI))})`;
        ctx.fill();
    });
}

function animateStars() {
    updateStars();
    drawStars();
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
// animateStars(); // 这一行应该在 resizeCanvas 之后调用一次，我已经包含在 resizeCanvas 中

// 鼠标跟随特效
const body = document.querySelector('body');
const follower = document.createElement('div');
follower.style.cssText = `
    position: fixed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: var(--primary-color);
    box-shadow: 0 0 15px var(--primary-color);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease-out, background-color 0.3s ease;
    z-index: 9999;
    opacity: 0.8;
`;
body.appendChild(follower);

document.addEventListener('mousemove', (e) => {
    follower.style.left = `${e.clientX}px`;
    follower.style.top = `${e.clientY}px`;
});

// Giscus 留言板配置
function loadGiscus() {
    const giscusContainer = document.getElementById('giscus-container');
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'ral836/ral836.github.io'); // 替换为你的仓库名
    script.setAttribute('data-repo-id', 'R_kgDOPWAl3g'); // 替换为你的仓库ID，在仓库设置中可找到
    script.setAttribute('data-category', 'Q&A'); // 替换为你的讨论分类
    script.setAttribute('data-category-id', 'DIC_kwDOPWAl3s4CtyoL'); // 替换为你的分类ID
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', '');
    giscusContainer.appendChild(script);
}
loadGiscus();