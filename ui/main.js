//Button Counter Program

var button = document.getElementById("counterbutton");

button.onclick = function(){
    
    //Make Request
    var request = new XMLHttpRequest();
    
    //Capture Response and Render
    request.onreadystatechange = function(){
        
        if(request.readyState == XMLHttpRequest.DONE){
            
            if(request.status == 200){
                var counter = request.responseText;
                counter = counter + 1;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
                
            }
            
        }
        
    };
    
};