//Button Counter Program

var button = document.getElementById("counterbutton");

button.onclick = function(){
    
    //Create Request
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
    
    //Make Request
    request.open("GET","http://jigu1997.imad.hasura-app.io/counter",true);
    request.send(null);
};