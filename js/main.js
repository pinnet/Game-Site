    
    $(function(){
        $('#cover').show();
            clock = setInterval(function(){$("#notice").append(".");}, 500);
            window.addEventListener('Ready', function (e) { clearInterval(clock); $('#cover').hide();});
        }
    );
    var gameInstance = UnityLoader.instantiate("gameContainer", "Build/unityout.json");
      
