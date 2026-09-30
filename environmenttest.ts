enum Environment {
    LOCAL,
    DEVELOPMENT,
    STAGING,
    PRODUCTION
}

function runTests(environment: Environment): void {
    console.log(`Running tests in ${Environment[environment]}`);
}

runTests(Environment.LOCAL);
runTests(Environment.DEVELOPMENT);
runTests(Environment.STAGING);
runTests(Environment.PRODUCTION);