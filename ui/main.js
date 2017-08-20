console.log('Loaded!');

//change the text
var element = document.getElementById("main");
element.innerHTML = 'new value';

//move the image
var img1 = document.getElementById("img");
img1.onclick = function () {
    img1.style.marginLeft = "100px";
};