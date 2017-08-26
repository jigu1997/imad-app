console.log('Loaded!');

//change the text

var element = document.getElementById("maincontent");
element.innerHTML = 'new value';

//move the image

var margin = 0;

var img = document.getElementById("madiimg");
function moveright(){
  margin = margin + 5;
  img.style.marginLeft = margin + "px";
}

img.onclick = function(){
    var interval = setInterval(moveright,50);
};