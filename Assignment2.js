// global variable
const browserVersion = "Chrome";

// function block
function getBrowserVersion() 
{
    if(browserVersion === "Chrome")
    {
        // local variable
        var browserVersion;
        browserVersion = "Chrome Browser";
        console.log("local variable:", browserVersion);
    }
    console.log("global variable:", browserVersion);
}
// call the function
getBrowserVersion();