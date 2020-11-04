$(function(){
    $('.head>ul>li').mouseenter(function(){
        $(this).children('.msg').css('display','block')
        .end().siblings().children('.msg').css('display','none')
    }).eq(2).mouseenter(function(){
        $(this).children('.msg2').css('display','flex')
        .end().siblings().children('.msg').css('display','none')
    })
    $('.scroll').find('li').css({
        backgroundImage:function(i,v){
            return `url(img/${i + 3}.png)`
        }
    })
    $('.inner_foot').css({
        backgroundImage:function(i,v){
            return `url(img/1${i + 1}.png)`
        }
    })
    $('.inner_s ul li').css({
        backgroundImage: function (i) {
            return `url(img/${i + 3}.png)`
        },
    }).last().css({
        'backgroundImage': `url(img/3.png)`
    })
    var $list = $('.inner_s ul li'), id
    var ul = $('.inner_s ul')[0], len = $list.length
    var widthLi = $list.eq(1).outerWidth(true)
    var dex = 0
    function scroll() {
        id = setInterval(function () {
            dex++
            var left = Math.abs(style(ul, 'marginLeft'))
            if (left >= (len - 1) * widthLi) {
                left = 0
            }
            innerscroll(ul, left, 1)
        }, 2000)

    }

    function innerscroll(ele, ulOffsetLeft, flag) {
        var nu = 0,step = widthLi / 10
        var idd = setInterval(function () {
            flag ? nu += step : nu -= step
            if (flag ? nu >= widthLi : nu <= -widthLi) {
                flag ? nu = widthLi : nu = -widthLi
                clearInterval(idd)
            }
            var tag = ulOffsetLeft / widthLi
            if (flag) {
                tag++
                if (tag >= len - 1) {
                    tag = 0
                }
            } else {
                tag--
                if (tag < 0) {
                    tag = len - 2
                }
            }
            $(`.nav>span:eq(${tag})`).addClass('navspan')
                .siblings().removeClass('navspan')
            ele.style.marginLeft = `-${nu + ulOffsetLeft}px`
        }, 100)

    }
    scroll()
    function style(ele, attr) {
        if (ele.currentStyle) {
            return parseFloat(ele.currentStyle(attr))
        } else {
            return parseFloat(window.getComputedStyle(ele, null)[attr])
        }
    }
    $('#right').mouseover(function () {
        clearInterval(id)
    }).mouseleave(function () {
        scroll()
    }).click(function () {
        // var left = Math.abs(style(ul, 'marginLeft'))
        var left = dex * widthLi
        if (left >= (len - 1) * widthLi) {
            left = 0
            dex = 0
        }
        innerscroll(ul, left, 1)
        dex++
        console.log(dex)
    })
    $('#left').mouseover(function () {
        clearInterval(id)
    }).mouseleave(function () {
        scroll()
    }).click(function () {
        // var left = Math.abs(style(ul, 'marginLeft'))
        var left = dex * widthLi
        dex--
        if (left <= 0) {
            left = (len - 1) * widthLi
            dex = len - 2
        }
        innerscroll(ul, left)
    })
    $('.nav>span').mouseover(function () {
        clearInterval(id)
    }).mouseleave(function () {
        scroll()
    }).click(function () {
        var $inex_nowspan = $(this).index(),ulLeft = style(ul,'marginLeft')
            var $index_navspan = $('.navspan').index()
            var move_ulLeft = -$inex_nowspan*widthLi
            var step = widthLi / 10
            var timeId = setInterval(function(){
                $index_navspan < $inex_nowspan ? ulLeft -=step : ulLeft+=step
                // console.log(ulLeft)
                if($index_navspan < $inex_nowspan ? ulLeft <= move_ulLeft : ulLeft >= move_ulLeft){
                    ulLeft = -$inex_nowspan*widthLi
                    clearInterval(timeId)
                }
                ul.style.marginLeft = `${ulLeft}px`
            },25)
        $(this).addClass('navspan').siblings().removeClass('navspan');
    })
    $('i').click(function(){
        if(!this.s){
            $('.menu').css('display','block')
            this.s = !this.s
        }else{
            $('.menu').css('display','none')
            this.s = !this.s
        }
    })
})