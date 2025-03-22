// 全屏控制脚本

// 在页面加载时创建全屏按钮
document.addEventListener('DOMContentLoaded', function() {
    // 添加全屏按钮
    createFullscreenButton();
    
    // 检查localStorage中的全屏状态，如果之前是全屏，则自动恢复
    if (localStorage.getItem('isFullScreen') === 'true') {
        // 延迟一下执行全屏操作，确保DOM已完全加载
        setTimeout(function() {
            requestFullscreen(document.documentElement);
            updateFullscreenButtonIcon();
        }, 300);
    }
    
    // 修改所有链接，使其保持全屏状态
    preserveFullscreenOnNavigation();
});

// 创建全屏切换按钮
function createFullscreenButton() {
    var fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'fullscreen-btn';
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullscreenBtn.style.position = 'fixed';
    fullscreenBtn.style.bottom = '20px';
    fullscreenBtn.style.right = '20px';
    fullscreenBtn.style.zIndex = '9999';
    fullscreenBtn.style.width = '40px';
    fullscreenBtn.style.height = '40px';
    fullscreenBtn.style.borderRadius = '50%';
    fullscreenBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    fullscreenBtn.style.color = 'white';
    fullscreenBtn.style.border = 'none';
    fullscreenBtn.style.cursor = 'pointer';
    fullscreenBtn.style.display = 'flex';
    fullscreenBtn.style.alignItems = 'center';
    fullscreenBtn.style.justifyContent = 'center';
    fullscreenBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    
    // 点击按钮切换全屏状态
    fullscreenBtn.addEventListener('click', function() {
        toggleFullScreen();
        updateFullscreenButtonIcon();
    });
    
    document.body.appendChild(fullscreenBtn);
    
    // 监听全屏状态变化，更新按钮图标
    document.addEventListener('fullscreenchange', function() {
        updateFullscreenButtonIcon();
        // 存储全屏状态到localStorage
        localStorage.setItem('isFullScreen', isFullScreen() ? 'true' : 'false');
    });
    document.addEventListener('webkitfullscreenchange', function() {
        updateFullscreenButtonIcon();
        localStorage.setItem('isFullScreen', isFullScreen() ? 'true' : 'false');
    });
    document.addEventListener('mozfullscreenchange', function() {
        updateFullscreenButtonIcon();
        localStorage.setItem('isFullScreen', isFullScreen() ? 'true' : 'false');
    });
    document.addEventListener('MSFullscreenChange', function() {
        updateFullscreenButtonIcon();
        localStorage.setItem('isFullScreen', isFullScreen() ? 'true' : 'false');
    });
    
    // 初始更新按钮图标
    updateFullscreenButtonIcon();
}

// 请求全屏
function requestFullscreen(element) {
    // 检查是否已经是全屏状态
    if (isFullScreen()) {
        return;
    }
    
    try {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) { /* Firefox */
            element.mozRequestFullScreen();
        }
    } catch (e) {
        console.log('全屏请求失败:', e);
    }
}

// 退出全屏
function exitFullscreen() {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        }
    } catch (e) {
        console.log('退出全屏失败:', e);
    }
}

// 切换全屏状态
function toggleFullScreen() {
    if (isFullScreen()) {
        exitFullscreen();
    } else {
        requestFullscreen(document.documentElement);
    }
}

// 检查是否处于全屏状态
function isFullScreen() {
    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}

// 更新全屏按钮图标
function updateFullscreenButtonIcon() {
    var btn = document.querySelector('.fullscreen-btn');
    if (!btn) return;
    
    if (isFullScreen()) {
        btn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        btn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}

// 修改所有链接，使其保持全屏状态
function preserveFullscreenOnNavigation() {
    // 获取页面上所有链接
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // 仅处理同源链接
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
                // 如果当前是全屏状态
                if (isFullScreen()) {
                    // 保存全屏状态
                    localStorage.setItem('isFullScreen', 'true');
                }
            }
        });
    });
} 