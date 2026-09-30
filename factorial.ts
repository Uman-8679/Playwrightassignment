// Function to calculate factorial using an iterative approach
function factorial(n: number): number {

    // Check for negative numbers
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }

    // Initialize result
    let result: number = 1;

    // Calculate factorial using a loop
    for (let i = 2; i <= n; i++) {
        result = result * i;
    }

    return result;
}


// Example calls

console.log("Factorial of 0:", factorial(0));
console.log("Factorial of 1:", factorial(1));
console.log("Factorial of 5:", factorial(5));
console.log("Factorial of 7:", factorial(7));


// Example of error handling for negative input
try {
    console.log("Factorial of -3:", factorial(-3));
} catch (error) {
    console.log("Error:", (error as Error).message);
}