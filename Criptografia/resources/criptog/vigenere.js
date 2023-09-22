// vigenere.js

function encryptVigenere(plainText, key) {

    if (typeof plainText !== 'string' || typeof key !== 'string') {
        throw new Error("O texto e a chave devem ser strings.");
    }
    
    const keyLength = key.length;
    let encryptedText = '';
    
    for (let i = 0; i < plainText.length; i++) {
        const plainChar = plainText[i];
        const keyChar = key[i % keyLength]; // Usa uma chave circular para corresponder ao texto
    
        if (plainChar.match(/[a-zA-Z]/)) {
          const isUpperCase = plainChar === plainChar.toUpperCase();
          const plainCharCode = plainChar.charCodeAt(0);
          const offset = isUpperCase ? 65 : 97;
    
          const keyShift = keyChar.charCodeAt(0) - offset;
          const encryptedCharCode = ((plainCharCode - offset + keyShift) % 26) + offset;
    
          encryptedText += String.fromCharCode(encryptedCharCode);
        } else {
          encryptedText += plainChar;
        }
    }
    
    return encryptedText;
}
  
function decryptVigenere(encryptedText, key) {

    if (typeof encryptedText !== 'string' || typeof key !== 'string') {
      throw new Error("O texto criptografado e a chave devem ser strings.");
    }
  
    const keyLength = key.length;
    let decryptedText = '';
  
    for (let i = 0; i < encryptedText.length; i++) {

      const encryptedChar = encryptedText[i];
      const keyChar = key[i % keyLength]; // Usa uma chave circular para corresponder ao texto
  
      if (encryptedChar.match(/[a-zA-Z]/)) {

        const isUpperCase = encryptedChar === encryptedChar.toUpperCase();
        const encryptedCharCode = encryptedChar.charCodeAt(0);
        const offset = isUpperCase ? 65 : 97;
  
        const keyShift = keyChar.charCodeAt(0) - offset;
        const decryptedCharCode = ((encryptedCharCode - offset - keyShift + 26) % 26) + offset;
  
        decryptedText += String.fromCharCode(decryptedCharCode);

      } else {

        decryptedText += encryptedChar;

      }

    }
  
    return decryptedText;
}
  
module.exports = {
    encryptVigenere,
    decryptVigenere
};
  