//Button Counter Program

var button = document.getElementById("counterbutton");

var counter = 0;

button.onclick = function(){
    //Render counter in span
    counter = counter + 1;
    var span = document.getElementById("count");
    span.innerHTML = counter.toString();
};