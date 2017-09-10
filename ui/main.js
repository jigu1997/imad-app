//Submit Username,Password

var submit = document.getElementById("submitbtn");

submit.onclick = function(){
    
    //make request to the server and send names
    var request = new XMLHttpRequest();
    
    //capture the list of names 
    request.onreadystatechange = function(){
      
     if(request.readyState == XMLHttpRequest.DONE){
         
         if(request.status == 200){
             alert("Welcome User");       
         }
         else if(request.status==403){
             alert("incorrect Credentials");
         }
         else if(request.status==500){
             alert("Internal Server Error");
         }
         
         
     } 
        
    };
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    request.open("POST","http://jigu1997.imad.hasura-app.io/login",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username,password: password}));
    
};


