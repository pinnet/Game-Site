var Connection;
var DbName="ChestnutDB";
var dayOlder = 24*60*60*1000;
var Players = {
            Name: 'Player',
            Columns: [{
                    Name: "PlayerID",
                    PrimaryKey: true,
                },
                {
                    Name: "Name",
                    NotNull: true,
                    DataType: 'string'
                },
                {
                    Name: "LastSeen",
                    NotNull: true,
                    DataType: 'number'
                },
                {
                    Name: "Status",
                    NotNull: true,
                    DataType: 'string'
                },
                {
                    Name: "Rank",
                    DataType: 'number'
                }
            ]
        };
        
 
 var now = new Date().getTime();       
 var Value={
            PlayerID: localStorage.getItem("ID"),
            LastSeen: now,
            Status: "-",
            Name: localStorage.getItem("Name"),
            Rank: 0
            };      
 if (sessionStorage.getItem('uid') === null){
     sessionStorage.setItem('uid',guid());
 }
        
JsStore.isDbExist(DbName,function(isExist){
    
    if(!isExist)
    {
            
            var DataBase = {
            Name: DbName,
            Tables: [Players]
        };
        Connection = new JsStore.Instance().createDb(DataBase,function(){
            
        });
        
         Connection.insert ({
                Into: "Player",
                Values:[Value],
            
            OnSuccess:function (rowsAffected){
                if (rowsAffected > 0) {
                    console.log("Constructed DB");
                }
            },
            OnError:function (error) {
                alert(error.value);}       
            });   
        
        
    }
    else {
         Connection = new JsStore.Instance(DbName);  
        Connection.delete({
                            From: "Player",
                            Where: {
                            LastSeen: { '-':
                            
                                        { Low : 0 ,
                                          High : now - dayOlder }
                                     },
                            },
                            OnSuccess:function (results){

                                                console.log(results);
                            },
                            OnError:function (error) {
                                alert(error.value);
                            }});
    }
    
},
function(err){
    alert(err.Message);
});
function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
            }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}   
