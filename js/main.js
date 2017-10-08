    
    $(function(){
        var ticks = 0;
        $('#cover').show();
            clock = setInterval(function(){
                
                if (ticks < 5){
                    $("#notice").append(".");
                    ticks++;
                }
                else {
                    
                 clearInterval(clock);
                 $("#notice").text("ERROR Please contact support");  
                }
                
                
                
                }, 500);
            window.addEventListener('Ready', function (e) { clearInterval(clock); $('#cover').hide();});
        }
    );
    var gameInstance = UnityLoader.instantiate("gameContainer", "Build/unityout.json");
      
