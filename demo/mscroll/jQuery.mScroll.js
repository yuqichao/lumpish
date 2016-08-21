//添加鼠标滚动事件
(function($){
    $.fn.extend({
        mouseWheel: function(fn){
            return this.each(function() {
                var doc = document,
                    elem = $(this),
                    key = true,
                    cache = [],
                    type = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel',
                    _addMouseWheel = function () {
                        key = true;
                        if (fn && (jQuery.inArray(elem, cache) === -1) && jQuery.isFunction(fn)) {
                            var eventFn = function (e) {
                                if (key) fn.call(elem, e);
                            };
                            cache.push(elem);
                            //w3c
                            if (doc.addEventListener) {
                                doc.addEventListener(type, eventFn, false);
                                //IE
                            } else if (doc.attachEvent) {
                                doc.attachEvent('onmousewheel', eventFn);
                                //其他
                            } else {
                                doc.onmousewheel = eventFn;
                            }
                        }
                    },
                    _removeMouseWheel = function () {
                        key = false;
                    };
                elem.mouseover(_addMouseWheel);
                elem.mouseout(_removeMouseWheel);
                return this;
            });
        }
    })
})(jQuery);

//元素RESIZE监听
(function($){
    $.fn.extend({
        elemResize: function(fn, delay){
            return this.each(function(){
                var elem = $(this),
                    data = {},
                    inter;
                delay = delay || 50;
                data.width = elem.width();
                data.height = elem.height();
                elem.data('noResize', false);
                return (function loop (){
                    if(elem.data('noResize')){ return false;}

                    var newData = {
                        w: elem.width(),
                        h: elem.height()
                    };
                    inter = setTimeout(function(){
                        elem.data('elemResizeInter', inter);
                        if( newData.w !== data.width || newData.h !== data.height){
                            data.width = newData.w;
                            data.height = newData.h;
                            fn.call(elem,newData);
                        }
                        loop();
                    }, delay);

                    return this;

                })();
            })
        },
        removeElemResize: function(){
            return this.each(function(){
                var inter = $(this).data('elemResizeInter');
                $(this).data('noResize', true);
                clearTimeout(inter);

                return this;
            })
        }
    });
})(jQuery);
(function($){
    $.extend({
        prevent : function(e){
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }
        }
    });
})(jQuery);
(function($,window,undefined){
    $.fn.extend({
        mScroll: function(option){
            return this.each(function(){
                var elem = $(this),
                    _default = {
                        contBox: 'ys-scroll-content',
                        barBox: 'ys-scroll-bar',
                        barRange: 'ys-range-box',
                        barRangeBtn: 'ys-range-btn',
                        barBtnTop: 'ys-btn-top',
                        barBtnBtm: 'ys-btn-btm',
                        barBtnLeft: 'ys-btn-left',
                        barBtnRight: 'ys-btn-right',
                        callbackStatus: {},
                        step: 10,
                        box: {},
                        content: {},
                        bar: {
                            top:{},
                            btm:{},
                            left:{},
                            right:{},
                            range: {},
                            ctrl: {}
                        }
                    },
                    _opts = {
                        contentWidth: 1000,
                        direction: false,
                        hide: false,
                        keyControl: false,
                        easing: 'linear',
                        resizeable: false,
                        edge: 5,
                        barTempH: '<div class="ys-scroll-bar ys-direction-h">'
                        + '<div class="ys-btn-left"></div>'
                        + '<div class="ys-btn-right"></div>'
                        + '<div class="ys-range-box"><div class="ys-range-btn"></div></div>'
                        + '</div>',
                        barTempV: '<div class="ys-scroll-bar ys-direction-v">'
                        + '<div class="ys-btn-top"></div>'
                        + '<div class="ys-range-box"><div class="ys-range-btn"></div></div>'
                        + '<div class="ys-btn-btm"></div>'
                        + '</div>'
                    },
                    _list = {};
                _opts = $.extend(_opts, option);

                var init = function(elem){
                    var box, keyFn,
                        _bar = _default.bar,
                        scrollFn = {},
                        dragPos = {},
                        doc = document;
                    if(elem.children('.' + _default.contBox).length === 0){
                        box = doc.createElement('div');
                        _list.box = $(box);
                        box.innerHTML = elem.html();
                        temp = _opts.direction ? _opts.barTempH : _opts.barTempV;
                        elem.html(box).append(temp);
                        _list.box.addClass(_default.contBox);
                    }else{
                        _list.box = elem.children('.' + _default.contBox);
                    }
                    _list.elem = elem;
                    //滚动条元素
                    _list.barBox   = $('.' + _default.barBox, elem);
                    //滚动范围元素
                    _list.rangeBox = $('.' + _default.barRange, elem);
                    //上滚按钮元素
                    _list.btnTop   = $('.' + _default.barBtnTop, elem);
                    //下滚按钮元素
                    _list.btnBtm   = $('.' + _default.barBtnBtm, elem);
                    //左滚按钮元素
                    _list.btnLeft  = $('.' + _default.barBtnLeft, elem);
                    //右滚按钮元素
                    _list.btnRight = $('.' + _default.barBtnRight, elem);
                    //拖拽条元素
                    _list.rangeBtn = $('.' + _default.barRangeBtn, elem);

                    update();

                    pages();

                    elem.mouseWheel(actScroll);

                    scrollFn.left = function() {
                        _bar.left.status = true;
                        (function act () {
                            setTimeout(function () {
                                return upScroll(null, 'linear') && _bar.left.status ? act() : false;
                            }, 100);
                        })();
                    };
                    scrollFn.right = function() {
                        _bar.right.status = true;
                        (function act () {
                            setTimeout(function () {
                                return downScroll(null, 'linear') && _bar.right.status ? act() : false;
                            }, 100);
                        })();
                    };
                    scrollFn.top = function() {
                        _bar.top.status = true;
                        (function act () {
                            setTimeout(function () {
                                return upScroll(null, 'linear') && _bar.top.status ? act() : false;
                            }, 100);
                        })();
                    };
                    scrollFn.btm = function() {
                        _bar.btm.status = true;
                        (function act () {
                            setTimeout(function () {
                                return downScroll(null, 'linear') && _bar.btm.status ? act() : false;
                            }, 100);
                        })();
                    };

                    keyFn = {
                        home: function(){
                            goToPage(1);
                        },
                        end: function(){
                            goToPage(_default.content.length);
                        },
                        pageUp: function(){
                            var position = _default.content.page === _default.content.length && !_default.content.remainder ?
                            _default.content.length - _default.content.remainder :
                                _default.content.page - 1 > 0 ? _default.content.page - 1 : 1;
                            goToPage(position);
                        },
                        pageDown: function(){
                            goToPage(_default.content.page + 1 < _default.content.length ? _default.content.page + 1 : _default.content.length);
                        },
                        scrollLeft: function(){
                            !!_opts.direction ? scrollFn.left() : '';
                        },
                        scrollRight: function(){
                            !!_opts.direction ? scrollFn.right() : '';
                        },
                        scrollTop: function(){
                            !_opts.direction ? scrollFn.top() : '';
                        },
                        scrollBtm: function(){
                            !_opts.direction ? scrollFn.btm() : '';
                        }
                    };

                    if(!!_opts.hide){
                        _list.elem.on({
                            'mouseover': function(){
                                _list.barBox.show().css({opacity:0}).stop().animate({opacity: 1}, 600, 'linear');
                            },
                            'mouseleave': function(){
                                _list.barBox.stop().animate({opacity: 0}, 600, 'linear', function(){
                                    $(this).hide();
                                });
                            }
                        });
                    }

                    _list.rangeBox.mousedown(function(e){
                        dragPos.rangeTop  = _list.rangeBox.offset().top;
                        dragPos.rangeLeft = _list.rangeBox.offset().left;
                        dragPos.contentPos = -_default.content.position;
                        dragPos.moveX = e.pageX - dragPos.x;
                        dragPos.moveY = e.pageY - dragPos.y;

                        dragPos.rangeX = e.pageX - dragPos.rangeLeft;
                        dragPos.rangeY = e.pageY - dragPos.rangeTop;

                        if(_opts.direction){
                            contentMove = dragPos.rangeX / _default.bar.range * _default.content.width;
                            dragPos.rangeX > _bar.ctrl.position ? downScroll(contentMove) : upScroll(contentMove);
                        }else{
                            contentMove = dragPos.rangeY / _default.bar.range * _default.content.height;
                            dragPos.rangeY > _bar.ctrl.position ? downScroll(contentMove) : upScroll(contentMove);
                        }
                    });

                    _list.btnLeft.mousedown(scrollFn.left);
                    _list.btnLeft.on('mouseup mouseleave', function(){
                        _bar.left.status = false;
                    });

                    _list.btnRight.mousedown(scrollFn.right);
                    _list.btnRight.on('mouseup mouseleave', function(){
                        _bar.right.status = false;
                    });

                    _list.btnTop.mousedown(scrollFn.top);
                    _list.btnTop.on('mouseup mouseleave', function(){
                        _bar.top.status = false;
                    });

                    _list.btnBtm.mousedown(scrollFn.btm);
                    _list.btnBtm.on('mouseup mouseleave', function(){
                        _bar.btm.status = false;
                    });

                    _list.rangeBtn.mousedown(function(e){
                        e.stopPropagation();
                        _bar.ctrl.dragStart = true;
                        dragPos.rangeTop  = _list.rangeBox.offset().top;
                        dragPos.rangeLeft = _list.rangeBox.offset().left;
                        dragPos.x = e.pageX;
                        dragPos.y = e.pageY;
                        dragPos.contentPos = -_default.content.position;
                    });

                    $(doc).mousemove(function(e){
                        if(_bar.ctrl.dragStart){
                            var contentMove;
                            $.prevent(e);
                            window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();

                            dragPos.btnTop = _list.rangeBtn.offset().top;
                            dragPos.btnLeft = _list.rangeBtn.offset().left;

                            dragPos.moveX = e.pageX - dragPos.x;
                            dragPos.moveY = e.pageY - dragPos.y;

                            dragPos.rangeX = e.pageX - dragPos.rangeLeft;
                            dragPos.rangeY = e.pageY - dragPos.rangeTop;

                            dragPos.btnX = e.pageX - dragPos.btnLeft;
                            dragPos.btnY = e.pageY - dragPos.btnTop;

                            if(_opts.direction){
                                contentMove = dragPos.contentPos + dragPos.moveX / _default.bar.range * _default.content.width;
                                dragPos.moveX > 0 ? downScroll(contentMove) : upScroll(contentMove);
                            }else{
                                contentMove = dragPos.contentPos + dragPos.moveY / _default.bar.range * _default.content.height;
                                dragPos.moveY > 0 ? downScroll(contentMove) : upScroll(contentMove);
                            }

                        }
                    });
                    $(doc).on('mouseup', function(){
                        _bar.ctrl.dragStart = false;
                    });

                    if(!!_opts.resizeable){
                        _list.elem.elemResize(update);
                        _list.box.elemResize(update);
                    }

                    if(!!_opts.keyControl){
                        $(window).keydown(function(e){
                            var code = e.keyCode;
                            switch(code){
                                // home
                                case 36 :
                                    $.prevent(e);
                                    keyFn.home();
                                    break;
                                //end
                                case 35 :
                                    $.prevent(e);
                                    keyFn.end();
                                    break;
                                //pageup
                                case 33 :
                                    $.prevent(e);
                                    keyFn.pageUp();
                                    break;
                                //pagedown
                                case 34 :
                                    $.prevent(e);
                                    keyFn.pageDown();
                                    break;
                                //上箭头
                                case 38 :
                                    $.prevent(e);
                                    keyFn.scrollTop();
                                    break;
                                //下箭头
                                case 40 :
                                    $.prevent(e);
                                    keyFn.scrollBtm();
                                    break;
                                //左箭头
                                case 37 :
                                    $.prevent(e);
                                    keyFn.scrollLeft();
                                    break;
                                //右箭头
                                case 39 :
                                    $.prevent(e);
                                    keyFn.scrollRight();
                                    break;
                            }
                        }).keyup(function(e){
                            var code = e.keyCode;
                            switch(code){
                                //上箭头
                                case 38 :
                                    _bar.top.status = false;
                                    break;
                                //下箭头
                                case 40 :
                                    _bar.btm.status = false;
                                    break;
                                //左箭头
                                case 37 :
                                    _bar.left.status = false;
                                    break;
                                //右箭头
                                case 39 :
                                    _bar.right.status = false;
                                    break;
                            }
                        });
                    }
                    },
                    update = function(contentWidth){
                        var _margin, _border, _bar = _default.bar;
                        _default.content.width    = _list.box.width();
                        _default.content.height   = _list.box.height();

                        _default.box.width  = _list.elem.width();
                        _default.box.height = _list.elem.height();

                        _bar.height = !_opts.direction ? _default.box.height : _list.barBox.height();
                        _bar.width  = _list.barBox.width();
                        //IE中默认边框宽度
                        _border = {
                            top: {
                                btm: isNaN(parseFloat(_list.btnTop.css('border-top-width'))) ? 0 : parseFloat(_list.btnTop.css('border-top-width')),
                                top: isNaN(parseFloat(_list.btnTop.css('border-bottom-width'))) ? 0 : parseFloat(_list.btnTop.css('border-bottom-width'))
                            },
                            btm: {
                                btm: isNaN(parseFloat(_list.btnBtm.css('border-top-width'))) ? 0 : parseFloat(_list.btnBtm.css('border-top-width')),
                                top: isNaN(parseFloat(_list.btnBtm.css('border-bottom-width'))) ? 0 : parseFloat(_list.btnBtm.css('border-bottom-width'))
                            },
                            left: {
                                left: isNaN(parseFloat(_list.btnLeft.css('border-left-width'))) ? 0 : parseFloat(_list.btnLeft.css('border-left-width')),
                                right: isNaN(parseFloat(_list.btnLeft.css('border-right-width'))) ? 0 : parseFloat(_list.btnLeft.css('border-right-width'))
                            },
                            right: {
                                left: isNaN(parseFloat(_list.btnRight.css('border-left-width'))) ? 0 : parseFloat(_list.btnRight.css('border-left-width')),
                                right: isNaN(parseFloat(_list.btnRight.css('border-right-width'))) ? 0 : parseFloat(_list.btnRight.css('border-right-width'))
                            }
                        };
                        _margin = {
                            top: {
                                btm: isNaN(parseFloat(_list.btnTop.css('margin-top'))) ? 0 : parseFloat(_list.btnTop.css('margin-top')),
                                top: isNaN(parseFloat(_list.btnTop.css('margin-bottom'))) ? 0 : parseFloat(_list.btnTop.css('margin-bottom'))
                            },
                            btm: {
                                btm: isNaN(parseFloat(_list.btnBtm.css('margin-top'))) ? 0 : parseFloat(_list.btnBtm.css('margin-top')),
                                top: isNaN(parseFloat(_list.btnBtm.css('margin-bottom'))) ? 0 : parseFloat(_list.btnBtm.css('margin-bottom'))
                            },
                            left: {
                                left: isNaN(parseFloat(_list.btnLeft.css('margin-right'))) ? 0 : parseFloat(_list.btnLeft.css('margin-right')),
                                right: isNaN(parseFloat(_list.btnLeft.css('margin-left'))) ? 0 : parseFloat(_list.btnLeft.css('margin-left'))
                            },
                            right: {
                                left: isNaN(parseFloat(_list.btnRight.css('margin-right'))) ? 0 : parseFloat(_list.btnRight.css('margin-right')),
                                right: isNaN(parseFloat(_list.btnRight.css('margin-left'))) ? 0 : parseFloat(_list.btnRight.css('margin-left'))
                            }
                        };
                        //FF必须完整写出属性名称
                        _bar.top.height = _list.btnTop.height()
                                        + _border.top.top
                                        + _border.top.btm
                                        + _margin.top.top
                                        + _margin.top.btm;
                        _bar.btm.height = _list.btnBtm.height()
                                        + _border.btm.top
                                        + _border.btm.btm
                                        + _margin.btm.top
                                        + _margin.btm.btm;

                        _bar.left.width = _list.btnLeft.width()
                                        + _border.left.left
                                        + _border.left.right
                                        + _margin.left.left
                                        + _margin.left.right;
                        _bar.right.width = _list.btnRight.width()
                                         + _border.right.left
                                         + _border.right.right
                                         + _margin.right.left
                                         + _margin.right.right;
                        _list.box.css({'position': 'relative'});

                        if(!!_opts.hide){
                            _list.elem.css({'position': 'relative'});
                            _list.barBox.css({'position': 'absolute'}).hide();
                            !!_opts.direction ? _list.barBox.css({'top': _default.box.height - _opts.edge - _bar.height, 'width': _default.box.width}) : _list.barBox.css({'right': _opts.edge});
                        }

                        if(!!_opts.direction){

                            if(!_opts.hide) {
                                _default.box.height -= _opts.edge * 2;
                                _list.box.css({'margin-bottom': _opts.edge});
                            }
                            _bar.width = _default.box.width;
                            if(contentWidth && typeof contentWidth === 'number'){
                                _opts.contentWidth = contentWidth;
                            }
                            _list.box.css({'height': !_opts.hide ? _default.box.height - _bar.height : _default.box.height, 'width': _opts.contentWidth});
                            _bar.range = _default.box.width - _bar.left.width - _bar.right.width;
                            _list.barBox.css({'width': _bar.width});
                            _list.rangeBox.css({'width': _bar.range});
                            _default.content.height = _list.box.height();
                            _default.content.width  = _opts.contentWidth;
                            _default.content.min    = 0;
                            _default.content.max    = _default.content.width - _default.box.width;

                            _default.content.rate   = _default.box.width / _default.content.width;
                            _bar.rate       = _default.step / _default.content.width;
                            _bar.ctrl.width =  _default.content.rate * _bar.range;
                            _bar.ctrl.width = _bar.ctrl.width > _bar.range ? _bar.range : _bar.ctrl.width;
                            _list.rangeBtn.width(_bar.ctrl.width);
                            _default.content.position  = _default.content.position != null ?
                                    -_default.content.position > _default.content.max ?
                                    -_default.content.max : _default.content.position :
                                    _list.box.css('left') === 'auto' ? 0 : parseInt(_list.box.css('left'));
                            _bar.ctrl.position = _bar.ctrl.position != null ?
                                        -_default.content.position > _default.content.max ?
                                        _default.content.max / _default.content.width * _bar.range : -_default.content.position / _default.content.width * _bar.range :
                                        _list.rangeBtn.css('left') === 'auto' ? 0 : parseFloat(_list.rangeBtn.css('left'));
                            _list.box.animate({left: _default.content.position}, 50, 'linear');
                            _list.rangeBtn.animate({left: _bar.ctrl.position}, 50, 'linear');
                        }else{

                            if(!_opts.hide){
                                _default.box.width -= _opts.edge * 2;
                                _list.box.css({'margin-right': _opts.edge});
                            }
                            _list.box.css({'width': !_opts.hide ? _default.box.width - _bar.width :  _default.box.width, 'float': 'left'});
                            _bar.range  = _default.box.height - _bar.top.height - _bar.btm.height;
                            _list.barBox.css({'height': _bar.height});
                            _list.rangeBox.css({'height': _bar.range});
                            _default.content.min    = 0;
                            _default.content.max    = _default.content.height - _default.box.height;

                            _default.content.rate    = _default.box.height / _default.content.height;
                            _bar.rate        = _default.step / _default.content.height;
                            _bar.ctrl.height =  _default.content.rate * _bar.range;
                            _bar.ctrl.height = _bar.ctrl.height > _bar.range ? _bar.range : _bar.ctrl.height;
                            _list.rangeBtn.height(_bar.ctrl.height);

                            _default.content.position  = _default.content.position != null ?
                                    -_default.content.position > _default.content.max ?
                                    -_default.content.max : _default.content.position :
                                    _list.box.css('top') === 'auto' ? 0 : parseInt(_list.box.css('top'));
                            _bar.ctrl.position = _bar.ctrl.position != null ?
                                        -_default.content.position > _default.content.max ?
                                        _default.content.max / _default.content.height * _bar.range : -_default.content.position / _default.content.height * _bar.range :
                                        _list.rangeBtn.css('top') === 'auto' ? 0 : parseFloat(_list.rangeBtn.css('top'));
                            _list.box.animate({top: _default.content.position}, 50, 'linear');
                            _list.rangeBtn.animate({top: _bar.ctrl.position}, 50, 'linear');
                        }

                        pages();
                    },
                    pages = function(){
                        var position  = Math.abs(_default.content.position),
                            content   = !_opts.direction ? _default.content.height : _default.content.width,
                            box       = !_opts.direction ? _default.box.height : _default.box.width,
                            length    = Math.ceil(content / box),
                            remainder = content % box,
                            index     = Math.floor(position / box) + 1;
                        if(!!remainder && ((position >= content - remainder) || position == _default.content.max)){
                            ++index;
                        }

                        _default.content.page = index;
                        _default.content.remainder = remainder;
                        _default.content.length = length;
                    },
                    goToPage = function(index,easing, duaring){
                        var box = !_opts.direction ? _default.box.height : _default.box.width;
                        index = index <= 0 ? 1 : index;
                        downScroll((index - 1) * box, easing, duaring);
                    },
                    actScroll = function(e){
                        $.prevent(e);
                        //FF用detail表示滚动方向，3为向下滚动，-3为向上滚动，与其他浏览器相反
                        var delta = e.wheelDelta || -e.detail;

                        delta > 0 ? upScroll() : downScroll();
                    },
                    upScroll = function(i, easing, duaring){
                        var _bar = _default.bar,
                            _content = _default.content,
                            position = _content.position;
                        duaring = duaring != null ? duaring : 100;
                        easing  = easing  || _opts.easing;
                        if(i != null){
                            i = -parseFloat(i);
                        }else{
                            i = position + _default.step;
                        }

                        if(_opts.direction){
                            _content.position  = i > 0 ? 0 : i;
                            _bar.ctrl.position = i > 0 ? 0 :  -i / _content.width * _bar.range;
                            _list.box.stop(false, true).animate({left: _content.position}, duaring, easing);
                            _list.rangeBtn.stop(false, true).animate({left: _bar.ctrl.position}, duaring, easing);

                            if(_content.position === 0){
                                if(_opts.startCallback && !_default.callbackStatus.start) {
                                    _opts.startCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.start = true;
                                }
                            }else{
                                if(_opts.moveCallback) {
                                    _opts.moveCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.start = _default.callbackStatus.end = false;
                                }
                            }
                        }else{
                            _content.position  = i > 0 ? 0 : i;
                            _bar.ctrl.position = i > 0 ? 0 : -i / _content.height * _bar.range;
                            _list.box.stop(false, true).animate({top: _content.position}, duaring, easing);
                            _list.rangeBtn.stop(false, true).animate({top: _bar.ctrl.position}, duaring, easing);

                            if(_content.position === 0){
                                if(_opts.startCallback && !_default.callbackStatus.start) {
                                    _opts.startCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.start = true;
                                }
                            }else{
                                if(_opts.moveCallback) {
                                    _opts.moveCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.start = _default.callbackStatus.end = false;
                                }
                            }
                        }
                        pages();
                        return _content.position !== 0;
                    },
                    downScroll = function(i,easing, duaring){
                        var _bar = _default.bar,
                            _content = _default.content,
                            position = _content.position;

                        duaring = duaring != null ? duaring : 100;
                        easing  = easing  || _opts.easing;

                        if(i != null){
                            i = -parseFloat(i);
                        }else{
                            i = position - _default.step;
                        }

                        if(_opts.direction){
                            _content.position  = i < -_content.max ? -_content.max : i;
                            _bar.ctrl.position = i < -_content.max ?
                                        _bar.range - _bar.ctrl.width : -i / _content.width * _bar.range;
                            _list.box.stop(false, true).animate({left: _content.position}, duaring, easing);
                            _list.rangeBtn.stop(false, true).animate({left: _bar.ctrl.position}, duaring, easing);

                            if(_content.position === -_content.max){
                                if(_opts.endCallback && !_default.callbackStatus.end) {
                                    _opts.endCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.end = true;
                                }
                            }else{
                                if(_opts.moveCallback) {
                                    _opts.moveCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.start = _default.callbackStatus.end = false;
                                }
                            }
                        }else{
                            _content.position  = i < -_content.max ? -_content.max : i;
                            _bar.ctrl.position = i < -_content.max ?
                                _bar.range - _bar.ctrl.height :  -i / _content.height * _bar.range;
                            _list.box.stop(false, true).animate({top: _content.position}, 100, easing || _opts.easing);
                            _list.rangeBtn.stop(false, true).animate({top: _bar.ctrl.position}, 100, easing || _opts.easing);

                            if(_content.position === -_content.max){
                                if(_opts.endCallback && !_default.callbackStatus.end) {
                                    _opts.endCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.end = true;
                                }
                            }else{
                                if(_opts.moveCallback) {
                                    _opts.moveCallback.call(_list.elem, {position: _content.position, index: _content.page, page: _content.length});
                                    _default.callbackStatus.start = _default.callbackStatus.end = false;
                                }
                            }
                        }
                        pages();
                        return _content.position !== -_content.max;
                    };
                init(elem);
                $.fn.extend({
                    mUpdate: update,
                    mGo: goToPage,
                    mDate: function(){
                        var _content = _default.content;
                        return {
                            length   : _content.length,
                            index    : _content.page,
                            position : _content.position,
                            max      : _content.max
                        }
                    },
                    mPrevPage: function(){
                        var position = _default.content.page === _default.content.length && !_default.content.remainder ?
                            _default.content.length - _default.content.remainder :
                            _default.content.page - 1 > 0 ? _default.content.page - 1 : 1;
                        goToPage(position);
                    },
                    mNextPage: function(){
                        goToPage(_default.content.page + 1 > _default.content.length ? _default.content.length : _default.content.page + 1);
                    }
                });
            });
        }
    });
})(jQuery,window);

jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) { return jQuery.easing[jQuery.easing.def](x, t, b, c, d); },
        easeInQuad: function (x, t, b, c, d) {return c*(t/=d)*t + b;},
        easeOutQuad: function (x, t, b, c, d) {return -c *(t/=d)*(t-2) + b},
        easeInOutQuad: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t + b;return -c/2 * ((--t)*(t-2) - 1) + b},
        easeInCubic: function (x, t, b, c, d) {return c*(t/=d)*t*t + b},
        easeOutCubic: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t + 1) + b},
        easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b},
        easeInQuart: function (x, t, b, c, d) {return c*(t/=d)*t*t*t + b},
        easeOutQuart: function (x, t, b, c, d) {return -c * ((t=t/d-1)*t*t*t - 1) + b},
        easeInOutQuart: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t + b;return -c/2 * ((t-=2)*t*t*t - 2) + b},
        easeInQuint: function (x, t, b, c, d) {return c*(t/=d)*t*t*t*t + b},
        easeOutQuint: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b},
        easeInOutQuint: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;return c/2*((t-=2)*t*t*t*t + 2) + b},
        easeInSine: function (x, t, b, c, d) {return -c * Math.cos(t/d * (Math.PI/2)) + c + b},
        easeOutSine: function (x, t, b, c, d) {return c * Math.sin(t/d * (Math.PI/2)) + b},
        easeInOutSine: function (x, t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b},
        easeInExpo: function (x, t, b, c, d) {return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b},
        easeOutExpo: function (x, t, b, c, d) {return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b},
        easeInOutExpo: function (x, t, b, c, d) {if (t==0) return b;if (t==d) return b+c;if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;return c/2 * (-Math.pow(2, -10 * --t) + 2) + b},
        easeInCirc: function (x, t, b, c, d) {return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b},
        easeOutCirc: function (x, t, b, c, d) {return c * Math.sqrt(1 - (t=t/d-1)*t) + b},
        easeInOutCirc: function (x, t, b, c, d) {if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b},
        easeInElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c;if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b},
        easeOutElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c;if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b},
        easeInOutElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c;if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b},
        easeInBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158;return c*(t/=d)*t*((s+1)*t - s) + b},
        easeOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158;return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b},
        easeInOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b},
        easeInBounce: function (x, t, b, c, d) {return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b},
        easeOutBounce: function (x, t, b, c, d) {if ((t/=d) < (1/2.75)) {	return c*(7.5625*t*t) + b;} else if (t < (2/2.75)) {	return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;} else if (t < (2.5/2.75)) {	return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;} else {	return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;}},
        easeInOutBounce: function (x, t, b, c, d) {if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;}
    });
