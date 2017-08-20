console.log('Loaded!');

//change the text
var element = document.getElementById("main");
element.innerHTML = 'new value';

//move the image
var image = document.getElementById("image");
image.onClick = function(){
    image.style.marginLeft = "100px";
}