function getRandomCode() {
    var randString = "abcdefghijklmnopqrstuvwxyz1234567890"
    var rand ="";
    for (let i = 0; i < 10; i++) {
        rand+=randString.charAt(Math.floor(Math.random() * randString.length))
        
    }
    return rand
}

console.log(getRandomCode());
export{getRandomCode}