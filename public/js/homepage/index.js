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
 * 工具类
 * 拖拽/事件绑定
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
    var addEvent = function (obj, sEv, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(sEv, function (ev) {
                if(false == fn.call(obj,ev)) {
                    ev.cancelBubble = true;
                    ev.preventDefault();
                }
            },false);
        } else {
            obj.attachEvent('on' + sEv, function () {
                if (false == fn.call(obj, event)) {
                    event.cancelBubble = true;
                    return false;
                }
            });
        }
    };
    window.addEvent = addEvent;
})(window, document);
/**
 * 精灵
 * options: {
 *     time: 切换时间 默认为10000,
 *     words: 语言库,
 *     menus: 菜单
 * }
 */
(function (window, document) {
    function ELF (options) {
        this.options = options;
        if (!(this.options.words && this.options.words.length > 0)) {
            this.options.words = [
                '你好啊～',
                '欢迎光临'
            ];   
        }
        if (!this.options.menus) {
            this.options.menus = {};
        }
        if (!this.options.time) {
            this.options.time = 10000;
        }
        this.init();
    }
    ELF.prototype = {
        init: function () {
            // 创建小精灵
            this.create();
            // 增加拖拽
            this.drag();
            // 绑定菜单
            this.bindMenus();
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
                '<div class="elf-menus" id="elf-menus"></div>',
                '<div class="elf-menu-btn" id="elf-menu-btn">menu</div>',
                '</div>'
            ].join('');
            document.body.appendChild(content);
            this.element = document.getElementById('elf');
            this.btn = document.getElementById('elf-btn');
            this.facePanel = document.getElementById('elf-face');
            this.wordPanel = document.getElementById('elf-word');
            this.menusPanel = document.getElementById('elf-menus');
            this.menusBtnPanel = document.getElementById('elf-menu-btn');       
        },
        drag: function () {
            window.drag && window.drag(this.element);
        },
        show: function () {
            this.emptyWord();
            this.say();
            this.element.style.display = 'block';
            this.btn.style.display = 'none';
        },
        hide: function () {
            this.dynamicSay('记得叫我出来哟～');
            var self = this;
            setTimeout(function () {
                // 停止说话
                clearInterval(self.sayTimer);
                // 停止统计闲置时间
                clearTimeout(this.menuTimer);
                self.element.style.display = 'none';
                self.btn.style.display = 'block';
            }, 2000);
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
            }, this.options.time);
        },
        emptyWord: function () {
            this.wordPanel.innerHTML = '';
        },
        dynamicSay: function (word) {
            var self = this;
            var words = word.split('');
            var result = '';
            function output() {
                clearTimeout(this.outputTimer);
                if(words.length) {
                    this.outputTimer = setTimeout(function() {
                        result += words.shift();
                        self.wordPanel.innerHTML = result;
                        output();
                    }, 150);
                }
            }
            output();
        },
        bindMenus: function () {
            var self = this;
            self.fillMenu(this.options.menus);
            window.addEvent(self.menusBtnPanel, 'click', function () {
                self.menusPanel.style.display = 'block';
                self.fillMenu(self.options.menus);
            });
            window.addEvent(self.btn, 'click', function () {
                self.show();
            });
        },
        closeMenu: function () {
            this.menusPanel.style.display = 'none';
            this.say();
        },
        fillMenu: function (obj) {
            var self = this;
            // 停止说话
            clearInterval(self.sayTimer);
            // 停止统计闲置时间
            clearTimeout(this.menuTimer);

            this.menuTimer = setTimeout(function () {
                self.closeMenu();
            }, this.options.time);

            self.menusPanel.innerHTML = '';
            if (obj.say) {
                this.dynamicSay(obj.say);
            }
            if (obj.menus) {
                for (var j = 0; j < obj.menus.length; j++) {
                    (function (j) {
                        var menu = obj.menus[j];
                        var menuBtn = document.createElement('a');
                        menuBtn.href = 'javascript:;';
                        menuBtn.innerHTML = menu.name;
                        self.menusPanel.appendChild(menuBtn);
                        window.addEvent(menuBtn, 'click', function () {
                            self.fillMenu(menu.child); 
                        });
                    })(j);
                }
            }
            if (obj.hide) {
                this.hide();   
            }
            obj.fn && obj.fn();
        }
    };
    window.ELF = ELF;
})(window, document);
/**
 * 实例化精灵
 */
(function (window, document) {
    window.onload = function () {
        var createTimestamp = (new Date('2017-03-30 00:00:00')).getTime();
        var defaults = {
            time: 12000,
            words: [
                '为了我们和大家的持续发展，请不要对本站进行任何和谐行为(灬ºωº灬)',
                '白日依山尽，黄河入海流，欲穷千里目，更上 .. .. 一层楼?',
                '咦你想做什么 oAo',
                '「不要啊」你以为我会这么说么噗噗～',
                '一起组团烧烤秋刀鱼',
                '啊啦啦 今天想吃点什么呢～'
            ],
            menus: {
                say: '你想要些做什么呢？',
                menus: [{
                    name: '显示公告',
                    child: {
                        say: '为了我们和大家的持续发展，请不要对本站进行任何和谐行为(灬ºωº灬)'
                    }
                }, {
                    name: '存活时间',
                    child: {
                        say: '咱已经和主人共同度过了' + Math.ceil((Date.now() - createTimestamp) / (1000 * 60 * 60 * 24)) + '天的人生了哦~   我是不是很棒呢~'
                    }
                }, {
                    name: '拍打喂食',
                    child: {
                        say: '要来点什么呢？',
                        menus: [{
                            name: '小饼干',
                            child: {
                                say: '嗷呜~ 多谢款待  >ω<'
                            }
                        }, {
                            name: '胡萝卜',
                            child: {
                                say: '人家又不是小兔子 QwQ'
                            }
                        }, {
                            name: '秋刀鱼',
                            child: {
                                say: '大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～'
                            }
                        }, {
                            name: '胖次',
                            child: {
                                say: '哇~ 好可爱的胖次~~~'
                            }
                        }, {
                            name: '淡定红茶',
                            child: {
                                say: '喝完了，ˊ_>ˋ和我签订契约成为淡定少女吧！'
                            }
                        }]
                    }
                }, {
                    name: '隐藏精灵',
                    child: {
                        hide: true
                    }
                }]
            }
        };
        new window.ELF(defaults);
    };
})(window, document);
/* eslint-enable */
