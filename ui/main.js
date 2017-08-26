console.log('Loaded!');

//change the text

var element = document.getElementById("maincontent");
element.innerHTML = 'new value';

//move the image

var img = document.getElementById("madiimg");
img.onclick = function(){
    img.style.marginLeft = '300px';
};