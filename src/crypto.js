const  CryptoJS = require("crypto-js");
const randomstring = require("randomstring");
const sha256 = require('crypto-js/sha256');
const hmacSHA512 = require('crypto-js/hmac-sha512');
const Base64 = require('crypto-js/enc-base64');


class HMACGenerator{
    
    pKey = '';
    generateComputerHMAC(computerMove){  
        
        
        let privateKey = randomstring.generate({
            length: 64,
            charset: 'alphanumeric'
         });        
         this.showKey(privateKey);
         this.getHMAC(privateKey, computerMove)
    }

    getHMAC (privateKey, computerMove) {    
        const key = CryptoJS.enc.Utf8.parse(privateKey)
        const msg = CryptoJS.enc.Utf8.parse(computerMove)
        const hmac = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(msg, key))
        return hmac;
    }

    showKey(privateKey) {
     this.pKey = `HMAC key: ${privateKey}`;
     
    }

}

module.exports = new HMACGenerator();
