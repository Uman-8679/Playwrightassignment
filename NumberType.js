// Number Type

function checkNumber(number)
{
    if(number>0)
    {
        return"Positive";
    }
    else if(number <0)
    {
        return "Negative";
    }
    else{
        return "zero";
    }
}
var number = 10;
var result = checkNumber(number);
console.log(result);