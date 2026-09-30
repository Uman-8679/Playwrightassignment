function reverseString(str) {
    let characters = str.split("");
    let reversedString = "";

    for (let i = characters.length - 1; i >= 0; i--) {
        reversedString = reversedString + characters[i];
    }

    return reversedString;
}

function isPalindrome(str) {
    let reversedString = reverseString(str);

    if (str === reversedString) {
        return true;
    } else {
        return false;
    }
}
console.log("Original: Hello");
console.log("Reversed:", reverseString("Hello"));
console.log("Palindrome:", isPalindrome("Hello"));

console.log("--------------------");

console.log("Original: madam");
console.log("Reversed:", reverseString("madam"));
console.log("Palindrome:", isPalindrome("madam"));

console.log("--------------------");

console.log("Original: level");
console.log("Reversed:", reverseString("level"));
console.log("Palindrome:", isPalindrome("level"));

console.log("--------------------");

console.log("Original: JavaScript");
console.log("Reversed:", reverseString("JavaScript"));
console.log("Palindrome:", isPalindrome("JavaScript"));