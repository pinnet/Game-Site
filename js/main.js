   $( function() {
    $( "#resizable" ).resizable({alsoResize: ".content-span"});
    $( "#resizable" ).draggable();
    $( ".content-span" ).mouseenter(function(){
    $( "#resizable" ).draggable('disable');
});
    $( ".content-span" ).mouseleave(function(){
    $( "#resizable" ).draggable('enable');
});
   
  
  
 } );
  
  
  
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
    var maxRndTime = 120000;
    var minRndTime = 1000;
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
        
       window.addEventListener('PlayerAdded', PlayerAdded);
    };
    
    function PlayerAdded(){
        
       gameInstance.SendMessage('Connection', 'onAdded'); 
        
    }
    
    
    function onConnectionLost(){
        
          console.log("conneting from fail");
          //setTimeout(ConnectMQTT,Math.floor(Math.random() * 10000)+ 1000);
        
    };
    
    function onConnect() {
        
        var playerId = localStorage.getItem("ID");
        var playerName = localStorage.getItem("Name");

        client.subscribe(regDest);
  
        client.subscribe(playerDest + playerId);
         
        SendReg(client,playerId,playerName,"INIT",0,regDest);
         
    };
    
    function SendReg(client,PlayerID,Name,status,rank,destination){
        
        message = new Paho.MQTT.Message( "REG:" + PlayerID + ":" + Name + ":" + status + ":" + rank);
        message.destinationName = destination;
        
        console.log(PlayerID);
        console.log(Name);
        console.log(status);
        console.log(rank);
        console.log(destination);
        
        client.send(message);
    
    };
    
     function onMessageArrived(message) {
            
            var msg = message.payloadString;
            var event = new CustomEvent('PlayerAdded');
            console.log(msg);
            
            if (msg.includes("REG:") != -1)
            {               
                var reg = msg.split(":");
                if(reg[2]== "null") reg[2] = "Guest";
                if (reg[1] == localStorage.getItem("ID"))  return;               // reject own message
                
                var dbcon = new JsStore.Instance("ChestnutDB");
                    dbcon.select({
                            From: "Player",
                            Where:{
                            PlayerID: reg[1] 
                                            },
                                
                            OnSuccess:function (results){
                                
                            dbcon.update({
                            In: "Player",
                            Set: { LastSeen: new Date().getTime() },
                            Where:{ PlayerID: reg[1] },              
                                OnSuccess:function (rowsAffected)
                                            { if (rowsAffected > 0) { 
                                                console.log('Successfully Updated');
                                                window.dispatchEvent(event);
                                              }
                                            },
                                            OnError:function (error) 
                                            { //alert(error.value);}
                                                                    }
                                            });                             
                            var Value={
                                        PlayerID: reg[1],
                                        LastSeen: new Date().getTime(),
                                        Status: "Invite",
                                        Name:  reg[2],
                                        Rank: parseInt(reg[4])};
            
            
                            if(results.length == 0){            
                                dbcon.insert ({
                                            Into: "Player",
                                            Values:[Value],
                                            OnSuccess:function (rowsAffected)
                                            { if (rowsAffected > 0) { 
                                                console.log('Successfully Added');
                                                window.dispatchEvent(event);
                                              }
                                            },
                                            OnError:function (error) 
                                            { //alert(error.value);}
                                                                    }
                                            });
                                        }
                                            
                                if(reg[3] == "INIT"){
                                        setTimeout(SendReg(   client,localStorage.getItem("ID"),localStorage.getItem("Name"),"ACK",0,
                                                                playerDest + reg[1]),Math.floor(Math.random() * maxRndTime)+ minRndTime);
                                }
                           }
    });
    }
 }
    
    
     