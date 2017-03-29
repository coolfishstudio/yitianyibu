/* eslint-disable */
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
$(function () {
    /**
     * 小精灵
     */
    function elf (options) {
        this.options = options;
        this.init();
    }
    elf.prototype = {
        init: function () {
            // 创建小精灵
            this.create();
            // 增加拖拽
            // 绑定菜单
            // 显示精灵
        },
        create: function () {
            $('<a class="elf-btn" href="javascript:;">召唤精灵</a>').appendTo($('body'));

            var content = [
                '<div class="elf">',
                '<div class="elf-face elf-face-00">',
                '<div class="elf-face-eye"></div>',
                '</div>',
                '<div class="elf-chat">',
                '<div class="elf-word"></div>',
                '<div class="elf-menu"></div>',
                '<div class="elf-menu-btn"></div>',
                '</div>',
                '</div>'
            ].join('');
            this.element = $(content);
            $('body').append(this.element);
        }
    };

    new elf();
});
/* eslint-enable */
