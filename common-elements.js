// 公共元素脚本 - 为所有页面添加灵动岛和状态栏

// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加灵动岛（如果页面中没有）
    if (!document.querySelector('.dynamic-island')) {
        addDynamicIsland();
    }
    
    // 添加状态栏（如果页面中没有）
    if (!document.querySelector('.status-bar')) {
        addStatusBar();
    }
    
    // 为iPhone框架内的内容区域添加适当的上边距
    adjustContentPadding();
    
    // 更新时间显示
    updateTime();
    
    // 每分钟更新一次时间
    setInterval(updateTime, 60000);
    
    // 处理底部导航栏链接
    modifyNavLinks();
});

// 添加灵动岛
function addDynamicIsland() {
    // 找到iPhone框架
    const iphoneFrame = document.querySelector('.iphone-frame');
    if (!iphoneFrame) return;
    
    // 找到主要内容区域
    const mainContent = iphoneFrame.querySelector('.bg-gradient-main');
    if (!mainContent) return;
    
    // 创建灵动岛元素
    const dynamicIsland = document.createElement('div');
    dynamicIsland.className = 'dynamic-island';
    
    // 添加摄像头
    const camera = document.createElement('div');
    camera.className = 'camera';
    dynamicIsland.appendChild(camera);
    
    // 添加扬声器
    const speaker = document.createElement('div');
    speaker.className = 'speaker';
    dynamicIsland.appendChild(speaker);
    
    // 将灵动岛添加到内容区域的顶部
    mainContent.appendChild(dynamicIsland);
}

// 添加状态栏
function addStatusBar() {
    // 找到iPhone框架
    const iphoneFrame = document.querySelector('.iphone-frame');
    if (!iphoneFrame) return;
    
    // 找到主要内容区域
    const mainContent = iphoneFrame.querySelector('.bg-gradient-main');
    if (!mainContent) return;
    
    // 创建状态栏元素
    const statusBar = document.createElement('div');
    statusBar.className = 'status-bar';
    
    // 添加时间和图标
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    
    statusBar.innerHTML = `
        <div class="text-white text-xs">${hours}:${minutes}</div>
        <div class="text-white text-xs flex space-x-1">
            <i class="fas fa-signal"></i>
            <i class="fas fa-wifi"></i>
            <i class="fas fa-battery-three-quarters"></i>
        </div>
    `;
    
    // 将状态栏添加到内容区域的顶部
    mainContent.appendChild(statusBar);
}

// 更新时间显示
function updateTime() {
    const timeElements = document.querySelectorAll('.status-bar div:first-child');
    if (timeElements.length === 0) return;
    
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    
    timeElements.forEach(element => {
        element.textContent = `${hours}:${minutes}`;
    });
}

// 调整内容区域的上边距
function adjustContentPadding() {
    // 找到iPhone框架
    const iphoneFrame = document.querySelector('.iphone-frame');
    if (!iphoneFrame) return;
    
    // 找到内容区中的主要元素，通常是第一个div之后的元素
    const mainContent = iphoneFrame.querySelector('.bg-gradient-main');
    if (!mainContent) return;
    
    // 调整内容区的直接子元素（非utility元素）的上边距
    const contentElements = mainContent.children;
    for (let i = 0; i < contentElements.length; i++) {
        const element = contentElements[i];
        // 跳过灵动岛和状态栏
        if (element.classList.contains('dynamic-island') || element.classList.contains('status-bar')) {
            continue;
        }
        
        // 为顶部内容区域添加适当的内边距
        if (!element.classList.contains('pt-16')) {
            element.classList.add('pt-16');
        }
    }
}

// 修改底部导航栏链接，使其在点击时保持全屏状态
function modifyNavLinks() {
    // 查找底部导航栏中的所有链接
    const navLinks = document.querySelectorAll('.bottom-nav a, .nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 检查是否存在全屏状态的检查函数
            if (typeof isFullScreen === 'function' && isFullScreen()) {
                // 保存全屏状态到localStorage
                localStorage.setItem('isFullScreen', 'true');
            }
        });
    });
    
    // 处理返回按钮
    const backButtons = document.querySelectorAll('a[href] i.fa-chevron-left, a.flex i.fa-chevron-left');
    
    backButtons.forEach(btn => {
        // 获取父元素（链接元素）
        const parentLink = btn.closest('a');
        if (parentLink) {
            parentLink.addEventListener('click', function(e) {
                // 检查是否存在全屏状态的检查函数
                if (typeof isFullScreen === 'function' && isFullScreen()) {
                    // 保存全屏状态到localStorage
                    localStorage.setItem('isFullScreen', 'true');
                }
            });
        }
    });
} 