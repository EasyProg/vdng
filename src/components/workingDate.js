export default function getCurrentProgram (arr)
{
    var delta = Date.now()/1000;
    console.log(delta);
    var currentObj = {};
    if (arr)                                    {
        currentObj = arr.filter((item, i) =>    {
                //Определяем дельту
        return item['start_at'] < delta&&item['stop_at'] > delta;

                                                }
        );
                                                }
    return currentObj[0].title;
}