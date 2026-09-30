// Task 1: Function Declaration
function userProfile(name) 
{
    console.log("Hello, " + name + "!");
}
userProfile("Uma");

// Task 2: Arrow Function
const double = (number) => 
{
    return number * 2;
};

console.log(double(5));

// Task 3: Anonymous Function
setTimeout(function () 
{
    console.log("This message is delayed by 2 seconds");
}, 2000);


// Task 4: Callback Function
function getUserData(callback)
{
    setTimeout(function () 
    {
        callback();
    }, 3000);
}

// Calling getUserData with a callback function
getUserData(function () 
{
    console.log("Call Back Function");
});