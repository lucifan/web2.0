$$ = function(selector) {
	return document.querySelectorAll(selector);
}
$ = function(id) {
	return document.getElementById(id);
}

var gamestart = false;

window.onload = function() {
	boundary = $$("#maze .boundary");
	$("start").onclick = function() {
		if (!gamestart) {
			gamestart = true;
			for (var i = 0; i < boundary.length; i++) {
				boundary[i].style.backgroundColor = "gray";
			}
			$("status").innerHTML = "Game Start!"
		}
	}


	for (var i = 0; i < boundary.length; i++) {
		boundary[i].onmouseover = function() {
			if (gamestart) {
				gamestart = false;
				for (var i = 0; i < boundary.length; i++) {
					boundary[i].style.backgroundColor = "red";
				}
				$("status").innerHTML = "You Lose!";
			}
		}
	}

	$("end").onmouseover = function() {
		if (gamestart) {
			gamestart = false;
			for (var i = 0; i < boundary.length; i++) {
				boundary[i].style.backgroundColor = "gray";
			}
			$("status").innerHTML = "You Win!"
		}
	}

	$$("body")[0].onmouseover = function() {
		if (gamestart) {
			gamestart = false;
			for (var i = 0; i < boundary.length; i++) {
				boundary[i].style.backgroundColor = "red";
			}
			$("status").innerHTML = "You Lose!";
		}
	}


	$("maze").onmouseover = function(e) {
		e.stopPropagation();
	}

	function lose() {
		return function() {

		}
	}
}


/*
	if (gamestart) {
		for (var i = 0; i < boundary.length; i++) {
			boundary[i].onmouseover = lose();
		}
		$$("body")[0].onmouseover = lose();
	}

	function lose() {
		return function() {
			gamestart = false;
			for (var i = 0; i < boundary.length; i++) {
				boundary[i].style.backgroundColor = "red";
			}
			$("status").innerHTML = "You Lose!";
*/
