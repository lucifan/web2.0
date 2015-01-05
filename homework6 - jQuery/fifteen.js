$(document).ready(function() {
    var area = $("#puzzlearea");
    var shuffleBt = $("#shufflebutton");
    var blank = $("<div></div>");
    var congratulations = $("<div></div>");
    var changeImage = $("<button></button>");
    var imgSlt = $('<select name="image" id="imagechange"><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>');
    $('#controls').append(imgSlt);
    var set = function(event) {
        area.append(blank).children().addClass("puzzlepiece");
        img = 'url(' + imgSlt.val() + '.jpg)'
        area.children().each(function(index, el) {
            $(el).css({
                'top': Math.floor(index / 4) * 100 + 'px',
                'left': index % 4 * 100 + 'px',
                'background-image': img,
                'background-size': '400px 400px',
                'background-position': -index % 4 * 100 + 'px ' + -Math.floor(index / 4) * 100 + 'px',
                'user-select': 'none'
            });
        });
        blank.css({
            'visibility': 'hidden'
        });
        markMoveable();
    }
    var isMovable = function(piece) {
        return (blank.css('top') == piece.css('top') && Math.abs(parseInt(blank.css('left')) - parseInt(piece.css('left'))) == 100) || (blank.css('left') == piece.css('left') && Math.abs(parseInt(blank.css('top')) - parseInt(piece.css('top'))) == 100);
    }
    var markMoveable = function() {
        area.children().each(function(index, el) {
            $(el).off('click', move).removeClass('movablepiece');
            if (isMovable($(el))) {
                $(el).on('click', move).addClass('movablepiece');
            }
        });
    }
    var isFinish = function() {
        var result = true;
        area.children().each(function(index, el) {
            if ($(el).css('top') !== Math.floor(index / 4) * 100 + 'px' || $(el).css('left') !== index % 4 * 100 + 'px') {
                result = false;
            }
        })
        return result;
    }
    var congratulation = function() {
        congratulations.addClass("puzzlepiece");
        congratulations.css({
            'zIndex': '999',
            'width': '400px',
            'height': '400px',
            'top': '0px',
            'left': '0px',
            'backgroundSize': '400px, 400px',
            'backgroundPosition': '0px, 0px',
            'backgroundImage': 'url(congratulations.jpg)'
        });
        area.append(congratulations);
        setTimeout(function() {
            congratulations.remove();
        }, 2000);
    }
    var shuffle = function(event) {
        markMoveable();
        var count = 257;
        while (count--) {
            $('.movablepiece').get(Math.round(Math.random() * ($('.movablepiece').length - 1))).click();
        }
    }
    var move = function(event) {
        var piece = $(event.target);
        var tmpcss = {
            'top': blank.css('top'),
            'left': blank.css('left')
        };
        blank.css({
            'top': piece.css('top'),
            'left': piece.css('left')
        });
        if (event.clientX) {
            piece.animate(tmpcss, 100, function() {
                markMoveable();
                if (isFinish()) {
                    congratulation();
                }
            });
        } else {
            piece.css(tmpcss);
            markMoveable();
        }
    }
    set();
    markMoveable();
    shuffleBt.on('click', shuffle);
    imgSlt.on('change', set);
});