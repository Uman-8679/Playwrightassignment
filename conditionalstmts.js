function launchBrowser(browserName) {
    if (browserName === "chrome") {
        console.log("Chrome browser is launched");
    } else {
        console.log(browserName + " browser is launched");
    }
}

function runTests(testType) {
    switch (testType) {
        case "smoke":
            console.log("Running Smoke Testing");
            break;

        case "sanity":
            console.log("Running Sanity Testing");
            break;

        case "regression":
            console.log("Running Regression Testing");
            break;

        default:
            console.log("Running Smoke Testing");
            break;
    }
}

// Calling the functions
launchBrowser("chrome");
runTests("smoke");