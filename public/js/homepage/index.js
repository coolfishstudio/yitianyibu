/* eslint-disable */
window.onload = function () {
    // 分块轮播图
    (function () {
        var oBox = document.getElementById('slide-pic')
        // 自定义行列个数
        var R = 6;
        var C = 13;
        var arrSpan = [];
        // 创建span元素模拟一张图片 创建二维数组
        for (var r = 0; r < R; r++) { // 循环行
            arrSpan[r] = [];
            for (var c = 0; c < C; c++) { // 循环列
                var oA = document.createElement('a');
                oA.style.width = oBox.offsetWidth / C + 'px';
                oA.style.height = oBox.offsetHeight / R + 'px';
                oA.style.display = 'block';
                oA.href = '/post/1';
                oBox.appendChild(oA);
                oA.style.position = 'absolute';
                oA.style.left = oA.offsetWidth * c + 'px';
                oA.style.top = oA.offsetHeight * r + 'px';
                oA.style.background = 'url(../images/homepage/slider/slider_0.png) no-repeat ' + -oA.offsetWidth * c + 'px ' + -oA.offsetHeight * r + 'px';
                oA.style.backgroundSize = oBox.offsetWidth + 'px ' + oBox.offsetHeight + 'px';
                arrSpan[r][c] = oA;
            }
        }
        var oAs = oBox.children;
        var imgCount = 3;
        var currentNumber = 0;
        var timer = null;
        // 动画
        setInterval(function () {
            currentNumber++;
            for (var r = 0; r < R; r++) {
                for (var c = 0; c < C; c++) {
                    (function (r, c) {
                        // 随机更换
                        setTimeout(function () {
                            arrSpan[r][c].style.backgroundImage = 'url(../images/homepage/slider/slider_' + (currentNumber + 1) % imgCount + '.png)';
                            arrSpan[r][c].href = '/post/' + ((currentNumber + 1) % imgCount + 1);
                        }, Math.random() * 700);
                    })(r, c);
                }
            }
        }, 4000);
    })()
}
/* eslint-enable */
