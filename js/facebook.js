window.fbAsyncInit = function() {
    
        FB.init({
            appId      : '151364752123710',
            xfbml      : true,
            version    : 'v2.10'
        });

        function onLogin(response) {
            if (response.status == 'connected') {
                FB.api('/me?fields=first_name', function(data) {
                    localStorage.setItem('Name',data.first_name );
                    });
            }
        }

        FB.getLoginStatus(function(response) {
        
            if (response.status == 'connected') {
                onLogin(response);
            } 
            else {
                FB.login(function(response){onLogin(response);} , {scope: 'user_friends, email'}    );
            }
        });
};

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     
     if (d.getElementById(id)) {return;}
     
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }
    (document, 'script', 'facebook-jssdk')
);

