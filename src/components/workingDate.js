export default function wDate (arr)         {
    var delta = Date.now();
    var currentObj = {};

    currentObj = arr.filter((item,i)=>
                                            {
    var start_date = item['start_date'];
    var stop_date =  item['stop_date'];
    //Определяем дельту
    return item['start_date']<delta<item['stop_date']

                                            }
                           );

    return currentObj.title;


                                            }




//console.log(wDate());

