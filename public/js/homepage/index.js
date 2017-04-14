/* eslint-disable */
/**
 * 网站相关
 */
$(document).ready(function () {
    // 导航菜单
    (function () {
        $('.top-nav-menu-toggle').on('click', function () {
            $('.top-nav-share').removeClass('top-nav-share-show');
            $('.top-nav-menu-search').removeClass('active');
            if ($('.top-nav-menu-toggle').hasClass('active')) {
                $('.top-nav-menu-toggle').removeClass('active');
                $('.top-nav-menu').removeClass('top-nav-menu-show');
            } else {
                $('.top-nav-menu-toggle').addClass('active');
                $('.top-nav-menu').addClass('top-nav-menu-show');
            }
        });
        $('.top-nav-menu-search').on('click', function () {
            $('.top-nav-menu').removeClass('top-nav-menu-show');
            $('.top-nav-menu-toggle').removeClass('active');
            if ($('.top-nav-menu-search').hasClass('active')) {
                $('.top-nav-menu-search').removeClass('active');
                $('.top-nav-share').removeClass('top-nav-share-show');
            } else {
                $('.top-nav-menu-search').addClass('active');
                $('.top-nav-share').addClass('top-nav-share-show');
            }
        });
    })();
    // 返回顶部
    (function () {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 100) {
                $('.gotop').css('transform', 'translateY(0)');
            } else {
                $('.gotop').css('transform', 'translateY(2.5rem)');
            }
        });
        $('.gotop').on('click', function () {
            $('body').stop().animate({
                scrollTop: 0
            }, 500);
        });
    })();
    // 分享
    (function () {
        $(function() {
            if (!$('.post-share-data-temp').length > 0) { return false; }
            var shareId = $('.post-share-data-temp').attr('data-id');
            var shareType = $('.post-share-data-temp').attr('data-type');
            var shareOid = $('.post-share-data-temp').attr('data-oid');
            var ua = navigator.userAgent.toLowerCase();
            var isPc = !((ua.indexOf('Android') !== -1)
                        || (ua.indexOf('iPhone') !== -1)
                        || (ua.indexOf('iPad') !== -1)
                        || (ua.indexOf('iPod') !== -1));
            $('#' + shareId).click(function () {
                if (isPc) {
                    $('.post-share-text-save').html('右键保存图片，分享给好友即可；');
                } else {
                    $('.post-share-text-save').html('长按保存图片，分享给好友即可；');
                }
                $('.post-share-card-box').show();
                initCardTheme();
            });
            $('#shareCancelBtn').click(function () {
                $('.post-share-card-box').hide();
            });
            $('.post-share-card-box').click(function () {
                if (parseInt($('.post-share-card-panel').width()) > 400 ) {
                    $('.post-share-card-box').hide();
                }
            });
            // TODO 更换主题
            var initCardTheme = function () {
                $('#inviteCard').removeAttr('src').hide();
                setTimeout(function() {
                    $('#inviteCard').show();
                    $('.post-share-card').attr('src', '/' + shareType + '/' + shareOid + '/share');
                }, 0);
            };
        });

    })();
});
/**
 * 工具类
 * 拖拽/事件绑定
 */
(function (window, document) {
    /* 拖拽 */
    var drag = function (obj, options, callback) {
        var clientWidth = document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight;
        obj.onmousedown = function (ev) {
            var oEvent = ev || event;
            // 计算鼠标点击的相对位置
            var disX = oEvent.clientX - obj.offsetLeft;
            var disY = oEvent.clientY - obj.offsetTop;

            document.onmousemove = function (ev) {
                var oEvent = ev || event;
                var x = oEvent.clientX - disX;
                var y = oEvent.clientY - disY;

                if (options.l && x <= 10 + options.l) {
                    x = 10 + options.l;
                }
                if (options.w && x >= clientWidth - options.w - 10) {
                    x = clientWidth - options.w - 10;
                }
                if (options.h && y <= 10) {
                    y = 10;
                }
                if (options.h && y >= clientHeight - options.h - 10) {
                    y = clientHeight - options.h - 10;
                }
                obj.style.left = x + 'px';
                obj.style.top = y + 'px';
                callback && callback(x, y);
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
    /* 事件绑定 */
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
    /* 数据存储 */
    var store = {
        set: function (key, value) {
            localStorage.setItem(key, value);
        },
        get: function (key) {
            return localStorage.getItem(key);
        },
        remove: function (key) {
            localStorage.removeItem(key);
        }
    };
    window.drag = drag;
    window.addEvent = addEvent;
    window.store = store;
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
            window.drag && window.drag(this.element, {l: 227, w: 85, h: 152}, this.savePos);
        },
        show: function () {
            if (window.store.get('elf_pos')) {
                var pos = JSON.parse(window.store.get('elf_pos'));
                this.element.style.left = pos.x + 'px';
                this.element.style.top = pos.y + 'px';
            }
            if (window.store.get('elf_status') === 'hide') {
                this.element.style.display = 'none';
                this.btn.style.display = 'block';
            } else {
                if (this.menusPanel.style.display === 'none') {
                    this.emptyWord();
                    this.say();
                }
                this.element.style.display = 'block';
                this.btn.style.display = 'none';
            }
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
                window.store.set('elf_status', 'hide');
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
                window.store.set('elf_status', 'show');
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
        },
        savePos: function (x, y) {
            clearTimeout(this.saveTimer);
            this.saveTimer = setTimeout(function () {
                window.store.set('elf_pos', JSON.stringify({x: x, y: y}));
            }, 500);
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
            time: 15000,
            words: [
                '为了我们和大家的持续发展，请不要对本站进行任何和谐行为(灬ºωº灬)',
                '白日依山尽，黄河入海流，欲穷千里目，更上 .. .. 一层楼?',
                '咦你想做什么 oAo',
                '「不要啊」你以为我会这么说么噗噗～',
                '一起组团烧烤秋刀鱼',
                '啊啦啦 今天想吃点什么呢～',
                '主人长这么大唯一坚持的一件事就是每天给手机充电。',
                '自习课上学妹问主人：这道题怎么做? 主人：你没有男朋友么? 学妹：有啊 主人：哦，这道题，我也不会做。',
                '对于主人来说，三分天注定，七分靠打拼，剩下的九十分，全部靠长相。',
                '有一天，主人请兽医给猪配种，兽医说：看来需要人工配种，主人犹豫了半天，鼓起勇气说：行是行，就是怕它咬我。',
                '公交汽车上有人放屁，主人咽了口吐沫说，呸呸呸。旁边的人说道，吃了屁还要吐壳?',
                '留级复读的学生叫“留学生”，家里有钱的学生叫“高财生”，上课打瞌睡的学生叫“特困生”，而打架无敌手的主人则被称为“学霸”',
                '公交车上，一个站着的孕妇，对身旁坐着的主人说：你不知道我怀孕了吗?主人很紧张的说：可孩子不是我的呀!',
                '老师家访问主人：你们家幸福吗? 主人骄傲地答道：幸福! 父亲过来给了他记耳光说：小子，谁让你改姓的!',
                '主人怒气冲冲的冲进某单位嚷道：这里是动物保护协会吗? 工作人员：是啊，请问是谁欺负你了?',
                '女朋友问：失败是成功之母，那什么是成功之父? 主人哭着说：每当双十一叫我付款的时候，叫成功支付。',
                '主人买了一盆含羞草，回去怎么动都不会害羞，过去问老板 老板说：你买的这盆可能随你，不要脸。',
                '一场秋雨一场寒，十场秋雨穿上棉，主人在七十场秋雨之后，穿着臃肿的棉衣，终于中暑住院了。',
                '主人有幸坐在女神旁，聊到了朋友圈，主人：为什么你很少发朋友圈，女神说：我也天天发，只是，你看不到。',
                '主人吃了麻婆豆腐，被娇羞不已的麻婆一刀捅死了。QwQ',
                '面到了穷凶极恶的歹徒，主人，临危不惧沉着冷静，放了个响屁。>ω<',
                '主人3岁从文，4岁习武，5岁精通诗词歌赋，6岁胸口碎大石，8岁通晓琴棋书画，我问主人7岁你干嘛去了? ...7岁养了一年的伤。',
                '老师：什么词能把人和动物完美结合?主人说：美人鱼，我说：错，应该是单身狗。 >ω<',
                '心狠手辣的主人，舔了一下，自己的手指，结果，被辣哭了。(๑• . •๑)',
                '主人，通过努力过，才知道智商上的差距是，不可逾越的。 >ω<'
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
                        say: '咱已经和主人共同度过了' + Math.ceil(((new Date()).getTime() - createTimestamp) / (1000 * 60 * 60 * 24)) + '天的人生了哦~   我是不是很棒呢~'
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
