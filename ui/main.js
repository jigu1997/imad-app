console.log('Loaded!');

//change the text

var element = document.getElementById("maincontent");
element.innerHTML = 'new value';

//move the image
var margin = 0;
var img = document.getElementById("madiimg");
function moveright(){
  margin = margin + 10;
  img.style.marginLeft = margin + "px";
}

var margin1 = 0;
function moveleft(){
  margin1 = margin1 + 10;
  img.style.marginRight = margin1 + "px";
}
img.onclick = function(){
    var interval = setInterval(moveright,100);
    sleep(100);
    var inte = setInterval(moveleft,100);
};