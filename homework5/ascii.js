window.onload = function () {
	document.getElementById("start").onclick = startBt;
	document.getElementById("stop").onclick = stopBt;
    var timer = null;
    var speed = 200;
    var counter = 0;

	document.getElementById("stop").disabled = true;

	function startBt() {
		document.getElementById("start").disabled = true;
		document.getElementById("stop").disabled = false;
		var ani = ANIMATIONS[document.getElementsByName('animation')[0].value].split('=====\n');
		function playani() {
			document.getElementById("displayarea").value = ani[counter];
			counter = (counter+1)%ani.length;
			timer = setTimeout(playani, speed);
		};
		playani();
	};


	function stopBt() {
		document.getElementById("start").disabled = false;
		clearTimeout(timer);
		timer = null;
		counter = 0;
	};

    var changeSize = function(){
        for(var i=0; i < document.getElementsByName('size').length; i++){
            if(document.getElementsByName('size')[i].checked){
                document.getElementById("displayarea").classList.remove('samll', 'medium', 'large');
                document.getElementById("displayarea").classList.add(document.getElementsByName('size')[i].value);
                break;
            }
        }
    };

    var changeSpeed = function(){
   // 	return document.getElementsByName('speed')[0].checked?50:200;
        if (document.getElementsByName('speed')[0].checked) {
            speed = 50;
        } else {
            speed = 200;
        }
    };

    document.getElementById('size').addEventListener('change', changeSize);
	document.getElementsByName('speed')[0].addEventListener('change', changeSpeed);

	ANIMATIONS["Custom"] = "     *\n" + 
	"    / \\\n" + 
	"   |   |\n" + 
	"   |___| \n" + 
	"=====\n" + 
	"     *\n" + 
	"    / \\\n" + 
	"   |   |\n" + 
	"   |___| \n" + 
	"    |||\n" + 
	"=====\n" + 
	"     *       oh my god!\n" + 
	"    / \\\n" + 
	"  /|   |\\\n" + 
	"   |___| \n" + 
	"    | |\n" + 
	"=====\n" + 
	"     *       what happen?\n" + 
	"    / \\\n" + 
	"  /|   |\\\n" + 
	"   |___| \n" + 
	"    | |\n" + 
	"=====\n" + 
	"     *       what happen?\n" + 
	"    / \\\n" + 
	"  /|   |\\\n" + 
	"   |___| \n" + 
	"    | |\n" + 
	"   ~~ ~~\n" + 
	"=====\n" + 
	"     *       what the huck?\n" + 
	"    / \\\n" + 
	"  /|   |\\\n" + 
	"   |___| \n" + 
	"    | |\n" + 
	"   ~~ ~~\n" + 
	"=====\n" + 
	"    ***      ...\n" + 
	"   **0**\n" + 
	"    / \\\n" + 
	"  /|   |\\\n" + 
	"   |___| \n" + 
	"    | |\n" + 
	"   ~~ ~~\n" + 
	"=====\n" + 
	"    ***      cool,man\n" + 
	"   **0**\n" + 
	"    / \\\n" + 
	"  /|   |\\\n" + 
	"   |___| \n" + 
	"    | |\n" + 
	"   ~~ ~~\n";

};


/*
1、用$符号   2、尽量使用闭包   3、用this
 $$ = function(selector) {
	return document.querySelectorAll(selector);
}
$ = function(id) {
	return document.getElementById(id);
}
*/
