    
   $(function(){
        var ticks = 0;
        $('#cover').show();
        clock = setInterval(function(){
          if (ticks < 120){
              $("#notice").append(".");
              ticks++;
          }
          else {                   
              clearInterval(clock);
              $("#notice").text("ERROR:01: Please contact support");  
          }
        }, 500);
        window.addEventListener('UNITYReady', UnityReady);
    }
    );
    
    
    var gameInstance = UnityLoader.instantiate("gameContainer", "Build/unityout.json");
    var client;
    var port=443;
    var host="iot.eclipse.org";
    var options = {
        useSSL: true,
        onSuccess: onConnect,
        onFailure: onConnectionLost
    };
    var regDest = "/Chestnut/Registration/";
    var playerDest = "/Chestnut/Players/";   
    
    function UnityReady(){
        
       clearInterval(clock);
        
       $('#cover').hide();
          
       client = new Paho.MQTT.Client(host,port, localStorage.getItem("ID"));
       client.onConnectionLost = onConnectionLost;
       client.onMessageArrived = onMessageArrived;
       client.connect(options);  
        
        
    };
    
    function onConnectionLost(){
        
          console.log("conneting from fail");
          //setTimeout(ConnectMQTT,Math.floor(Math.random() * 10000)+ 1000);
        
    };
    
    function onConnect() {
        
        var playerId = localStorage.getItem("ID");
        var playerName = localStorage.getItem("Name");

        client.subscribe(regDest);
  
        client.subscribe(playerDest + playerId);
         
        SendReg(client,playerId,playerName,"INIT",regDest);
         
    };
    
    function SendReg(client,PlayerID,Name,status,destination){
        
        message = new Paho.MQTT.Message( "REG:" + PlayerID + ":" + Name + ":" + status);
        message.destinationName = destination;
        
        console.log(PlayerID);
        console.log(Name);
        console.log(status);
        console.log(destination);
        
        client.send(message);
    
    };
    
     function onMessageArrived(message) {
            
            var msg = message.payloadString;
            
            console.log(msg);
            
            if (msg.includes("REG:") != -1)
            {               
                var reg = msg.split(":");
                if (reg[1] == localStorage.getItem("ID"))  return;               // reject own message
                if(reg[3] == "INIT"){
           
                   setTimeout(SendReg(client,localStorage.getItem("ID"),localStorage.getItem("Name"),"ACK",playerDest + reg[1]),Math.floor(Math.random() * 45000)+ 1000);
                }
            }
    };
    
    
     