$$ = function(selector) {
    return document.querySelectorAll(selector);
}
$ = function(id) {
    return document.getElementById(id);
}

window.onload = function() {
	var area = document.getElementById('puzzlearea');
	var blank = document.createElement('div');
	var congratulations = document.createElement('div')
	var changeImageBt = document.createElement('button');
	var backGround = ['url(1.jpg)', 'url(2.jpg)', 'url(3.jpg)', 'url(4.jpg)'];
	var BGcount = 0;
	puzzlepieces = puzzlearea.children;

	var setBlank = function() {
		blank.classList.add('puzzlepiece');
		blank.style.backgroundImage = 'url()';
		blank.style.visibility = 'hidden';
		area.appendChild(blank);
	}
	
	var setCIButton = function() {
		changeImageBt.classList.add('changeImageBt');
		$("controls").appendChild(changeImageBt);
		$$('.changeImageBt')[0].innerHTML = 'change image';
	}

	var changeImage = function() {
		BGcount = (BGcount == 3)?0:(BGcount+1);
		setPuzzlepieces();
		markMoveable();
	}

	var setPuzzlepieces = function() {
		for (var i = 0; i < puzzlepieces.length; i++) {
			puzzlepieces[i].classList.add('puzzlepiece');
			puzzlepieces[i].style.top = Math.floor(i/4)*100+'px';
			puzzlepieces[i].style.left = i%4*100+'px';
		}
		for (var i = 0; i < puzzlepieces.length; i++) {
			puzzlepieces[i].style.backgroundImage = backGround[BGcount];
			puzzlepieces[i].style.backgroundSize = '400px, 400px';
			puzzlepieces[i].style.backgroundPositionX = -(i%4)*100+'px';
			puzzlepieces[i].style.backgroundPositionY = -Math.floor(i/4)*100+'px';
		}
	}

	var isMoveable = function(piece) {
		return (piece.style.top == blank.style.top
			&& Math.abs(parseInt(piece.style.left)-parseInt(blank.style.left)) == 100) ||
			(piece.style.left == blank.style.left
			&& Math.abs(parseInt(piece.style.top)-parseInt(blank.style.top)) == 100)
	}

	var markMoveable = function() {
		for (var i = 0; i < puzzlepieces.length; i++) {
			if (isMoveable(puzzlepieces[i])) {
				puzzlepieces[i].addEventListener('click', move);
			} else {
				puzzlepieces[i].removeEventListener('click', move);
			}
		}
	}

	var isFinish = function(){
		var result = true;
		for (var i = 0; i < puzzlepieces.length; i++) {
        	if (puzzlepieces[i].style.top !== Math.floor(i/4)*100+'px' ||
            	puzzlepieces[i].style.left !== i%4*100+'px') {
				result = false;
            	break;
			}
		}
		return result;
	}


    var shuffle = function(event){
        var random;
        var count = 500;
        var movableIndxs = [];
        while (count) {
            for (var i = 0; i < puzzlepieces.length; i++) {
                if (isMoveable(puzzlepieces[i])) {
                    movableIndxs.push(i);
                }  
            }
            random = movableIndxs[Math.round(Math.random(new Date()))*(movableIndxs.length-1)];
            puzzlepieces[random].click();
            movableIndxs = []
            count--;
        }
    }

    var congratulate = function() {
    	congratulations.classList.add('puzzlepiece');
    	congratulations.style.zIndex = '999';
    	congratulations.style.width = '400px';
    	congratulations.style.height = '400px';
    	congratulations.style.top = '0px';
    	congratulations.style.left = '0px';
    	congratulations.style.backgroundSize = '400px, 400px';
    	congratulations.style.backgroundPosition = '0px, 0px';
    	congratulations.style.backgroundImage = 'url(congratulations.jpg)';
    	area.appendChild(congratulations);
    	setTimeout(function() {
    		area.removeChild(congratulations);
    	}, 2000);
    }


	var move = function(event) {
		var piece = event.target;
		var tmptop = blank.style.top;
		blank.style.top = piece.style.top;
		piece.style.top= tmptop;        
		var tmpleft = blank.style.left;
		blank.style.left = piece.style.left;
		piece.style.left= tmpleft;
		markMoveable();
		if (event.x && isFinish()) {
			congratulate();
		}
	}

	setBlank();
	setPuzzlepieces();
	setCIButton();
	markMoveable();
	$('shufflebutton').addEventListener('click', shuffle);
	$$('.changeImageBt')[0].addEventListener('click', changeImage);

}