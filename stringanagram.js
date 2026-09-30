//Example 1 & 2
function lengthOfLastWord(s) {
    let trimmedString = s.trim();
    let words = trimmedString.split(" ");
    let lastWord = words[words.length - 1];

    return lastWord.length;
}

console.log(lengthOfLastWord("Hello World")); 
console.log(lengthOfLastWord(" fly me to the moon ")); 


// Example 3
function isAnagram(str1, str2) {
    let string1 = str1.replace(/\s/g, "").toLowerCase();
    let string2 = str2.replace(/\s/g, "").toLowerCase();

    let sortedString1 = string1.split("").sort().join("");
    let sortedString2 = string2.split("").sort().join("");

    return sortedString1 === sortedString2;
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));