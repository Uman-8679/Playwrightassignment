function fibonacci(n: number): number {
    // Check that n is a non-negative integer
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("n must be a non-negative integer.");
    }

    // Base cases
    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    // Initialize the first two Fibonacci numbers
    let a: number = 0;
    let b: number = 1;

    // Calculate Fibonacci number iteratively
    for (let i = 2; i <= n; i++) {
        const next: number = a + b;
        a = b;
        b = next;
    }

    return b;
}

// Example calls
console.log("Fibonacci of 0:", fibonacci(0));
console.log("Fibonacci of 1:", fibonacci(1));
console.log("Fibonacci of 5:", fibonacci(5));
console.log("Fibonacci of 10:", fibonacci(10));
console.log("Fibonacci of 15:", fibonacci(15));
