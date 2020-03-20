import Vue from 'vue'
import CryptoJs from 'crypto-js'

class Encryption {
    constructor (keyStr) {
        this.keyStr = keyStr || 'abcdefgabc123456'
    }
    // AES加密
    encrypt (word) {
        let key = CryptoJs.enc.Utf8.parse(this.keyStr)
        let text = CryptoJs.enc.Utf8.parse(word)
        let encrypted = CryptoJs.AES.encrypt(text,key,{mode:CryptoJs.mode.ECB,padding:CryptoJs.pad.Pkcs7})
        return encrypted.toString()
    }
    // AES解密
    decrypt (word) {
        let key = CryptoJs.enc.Utf8.parse(this.keyStr)
        let decrypt = CryptoJs.AES.decrypt(word,key,{mode:CryptoJs.mode.ECB,padding:CryptoJs.pad.Pkcs7})
        return CryptoJs.enc.Utf8.stringify(decrypt).toString()
    }
}

export default new Encryption()
