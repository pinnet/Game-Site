
var DbName="ChestnutDB";
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
                    DataType: 'string'
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
JsStore.isDbExist(DbName,function(isExist){
    if(!isExist)
    {
            var DataBase = {
            Name: DbName,
            Tables: [Players]
        };
        var Connection = new JsStore.Instance().createDb(DataBase,function(){
            
        });
    }
    else {
          //resetDB();        
      }
    
},
function(err){
    alert(err.Message);
});



function resetDB(){
    
   var dbcon = new JsStore.Instance("ChestnutDB");
   
    
}
