class VigenereCipheringMachine {
    constructor(isDirect = true) {
        this.isDirect = isDirect;
        this.baseCharCode = 'a'.charCodeAt(0)
    }
    validate(...args) {
        if (args.some(arg => arg === undefined || arg === null)) {
            throw new Error('Incorrect arguments!')
        }
    }
    common(string, key, operation){
        let ans = ''
        let baseCharCode = 'a'.charCodeAt(0)
        let keyIndex = 0
        for (let i = 0; i < string.length; i++) {
            if(!string[i].match(/[a-z]/i)) {
                ans += string[i]
                continue
            }
            let keyIndexValue = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - baseCharCode
            let textIndex = string[i].toLowerCase().charCodeAt(0) - baseCharCode
            let newIndex = operation === 'encrypt'
                ? ((textIndex + keyIndexValue) % 26)
                : (textIndex - keyIndexValue + 26) % 26
            ans += String.fromCharCode(newIndex + baseCharCode).toUpperCase()
            keyIndex++
        }
        return this.isDirect ? ans : ans.split('').reverse().join('')
    }
    encrypt(string, key) {
        this.validate(string, key)
        return this.common(string, key, 'encrypt')
    }
    decrypt(string, key) {
        this.validate(string, key)
        return this.common(string, key, 'decrypt')
    }
}