/* eslint-disable */
/**
 * 菜单
 */
(function () {
    $(function () {
        // 导航菜单
        (function () {
            $('.top-nav-menu-toggle').on('click', function () {
                if ($('.top-nav-menu-toggle').hasClass('active')) {
                    $('.top-nav-menu-toggle').removeClass('active');
                    $('.top-nav-menu').removeClass('top-nav-menu-show');
                } else {
                    $('.top-nav-menu-toggle').addClass('active');
                    $('.top-nav-menu').addClass('top-nav-menu-show');
                }
            });
        })();
    });
})($);
/**
 * 拖拽
 */
(function (window, document) {
    var drag = function (obj) {
        obj.onmousedown = function (ev) {
            var oEvent = ev || event;
            // 计算鼠标点击的相对位置
            var disX = oEvent.clientX - obj.offsetLeft;
            var disY = oEvent.clientY - obj.offsetTop;

            document.onmousemove = function (ev) {
                var oEvent = ev || event;
                var x = oEvent.clientX - disX;
                var y = oEvent.clientY - disY;

                obj.style.left = x + 'px';
                obj.style.top = y + 'px';
            };
            document.onmouseup = function (ev) {
                document.onmousemove = null;
                document.onmouseup = null;
                obj.releaseCapture && obj.releaseCapture();
            }
            obj.setCapture && obj.setCapture();
            return false;
        }
    }
    window.drag = drag;
})(window, document);
/**
 * 精灵
 */
(function (window, document) {
    window.onload = function () {
        function ELF (options) {
            this.options = options;
            if (!(this.options.words && this.options.words.length > 0)) {
                this.options.words = [
                    '你好啊～',
                    '欢迎光临'
                ];   
            }
            this.init();
        }
        ELF.prototype = {
            init: function () {
                // 创建小精灵
                this.create();
                // 增加拖拽
                this.drag();
                // 显示精灵
                this.show();
            },
            create: function () {
                var btn = document.createElement('a');
                btn.className = 'elf-btn';
                btn.id = 'elf-btn';
                btn.href = 'javascript:;';
                btn.innerHTML = '召唤精灵';
                document.body.appendChild(btn);

                var content = document.createElement('div');
                content.className = 'elf';
                content.id = 'elf';
                content.innerHTML = [
                    '<div class="elf-face elf-face-00" id="elf-face">',
                    '<div class="elf-face-eye"></div>',
                    '</div>',
                    '<div class="elf-chat">',
                    '<div class="elf-word" id="elf-word"></div>',
                    '<div class="elf-menu"></div>',
                    '<div class="elf-menu-btn"></div>',
                    '</div>'
                ].join('');
                document.body.appendChild(content);
                this.element = document.getElementById('elf');
                this.btn = document.getElementById('elf-btn');
                this.facePanel = document.getElementById('elf-face');
                this.wordPanel = document.getElementById('elf-word')
            },
            drag: function () {
                window.drag && window.drag(this.element);
            },
            show: function () {
                this.emptyWord();
                this.say();
                this.btn.style.display = 'none';
            },
            say: function () {
                var self = this;
                clearInterval(this.sayTimer);
                // 打印文字
                self.dynamicSay(self.options.words[ Math.floor(Math.random() * self.options.words.length) ]);
                // 随机表情
                self.facePanel.className = 'elf-face elf-face-0' + Math.floor(Math.random() * 3);
                this.sayTimer = setInterval(function () {
                    // 打印文字
                    self.dynamicSay(self.options.words[ Math.floor(Math.random() * self.options.words.length) ]);
                    // 随机表情
                    self.facePanel.className = 'elf-face elf-face-0' + Math.floor(Math.random() * 3);
                }, 10000);
            },
            emptyWord: function () {
                this.wordPanel.innerHTML = '';
            },
            dynamicSay: function (word) {
                var self = this;
                var words = word.split('');
                var result = '';
                function output() {
                    if(words.length) {
                        setTimeout(function() {
                            result += words.shift();
                            self.wordPanel.innerHTML = result;
                            output();
                        }, 150);
                    }
                }
                output();
            }
        };
        var defaults = {
            words: [
                "为了我们和大家的持续发展，请不要对本站进行任何和谐行为(灬ºωº灬)",
                "白日依山尽，黄河入海流，欲穷千里目，更上 .. .. 一层楼?",
                "咦你想做什么 oAo"
            ]
        };
        new ELF(defaults); 
    };
})(window, document);
/* eslint-enable */
