    
    $(function(){
        var ticks = 0;
        $('#cover').show();
        clock = setInterval(function(){
          if (ticks < 60){
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
    
    
    function UnityReady(){
        
       clearInterval(clock);
        
       $('#cover').hide();
        
       console.log(localStorage.getItem("ID"));
        
    }  
