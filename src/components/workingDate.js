export default
function getCurrentProgram (arr)
{
    var delta = Date.now();
    //var c = new Date();
    var currentObj = {};
    currentObj = arr.filter                 ((item,i)=>
        {
            var start_date = item['start_date'];
            var stop_date =  item['stop_date'];
            //Определяем дельту
            return item['start_at']<delta<item['stop_at'];

        }
    );

    return currentObj.title;


}
//getCurrentProgram