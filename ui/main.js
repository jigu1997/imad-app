console.log('Loaded!');

//change the text

var element = document.getElementById("maincontent");
element.innerHTML = 'new value';

//move the image

var img1 = document.getElementById("img");
var marginLeft = 0;
function moveright(){
    marginLeft = marginLeft+10;
    img1.style.marginLeft = marginLeft + "px";
}

madiimg.onclick = function () {
    var interval = setInterval(moveright,100);
};