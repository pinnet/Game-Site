var Connection,
DbName="ChestnutDB";
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
        Connection = new JsStore.Instance().createDb(DataBase,function(){
            
        });
    }
},
function(err){
    alert(err.Message);
});
