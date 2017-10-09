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
    var port=443;
    var host="iot.eclipse.org";
   
   var options = {
        
       
        useSSL: true,
        onSuccess: onConnect,
        onFailure: onConnectionLost
    };
   
    var gameInstance = UnityLoader.instantiate("gameContainer", "Build/unityout.json");
        
    function UnityReady(){
        
       clearInterval(clock);
        
       $('#cover').hide();
        
       client = new Paho.MQTT.Client(host,port, localStorage.getItem("ID"));
       client.onConnectionLost = onConnectionLost;
       client.onMessageArrived = onMessageArrived;
       client.connect(options);        
    };     
 function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  
  var playerId = localStorage.getItem("ID");
  var playerName = localStorage.getItem("Name");
  console.log("onConnect");
  client.subscribe("/CHNT:REG:");
  client.subscribe(playerId);
  message = new Paho.MQTT.Message("REG:" + playerId + ":Name:" + playerName );
  message.destinationName = "/CHNT:REG:";
  client.send(message);
};
    function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
    console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  
};
