// vigenere.js

function encryptVigenere(text, key) {

    if (typeof text !== 'string' || typeof key !== 'string') {
        throw new Error("O texto e a chave devem ser strings.");
    }
    
    const keyLength = key.length;
    let etext = '';
    
    for (let i = 0; i < text.length; i++) {
        const plainChar = text[i];
        const keyChar = key[i % keyLength]; // Usa uma chave circular para corresponder ao texto
    
        if (plainChar.match(/[a-zA-Z]/)) {
          const isUpperCase = plainChar === plainChar.toUpperCase();
          const plainCharCode = plainChar.charCodeAt(0);
          const offset = isUpperCase ? 65 : 97;
    
          const keyShift = keyChar.charCodeAt(0) - offset;
          const encryptedCharCode = ((plainCharCode - offset + keyShift) % 26) + offset;
    
          etext += String.fromCharCode(encryptedCharCode);
        } else {
          etext += plainChar;
        }
    }
    
    return etext;
}
  
function decryptVigenere(etext, key) {

    if (typeof etext !== 'string' || typeof key !== 'string') {
      throw new Error("O texto criptografado e a chave devem ser strings.");
    }
  
    const keyLength = key.length;
    let decryptedText = '';
  
    for (let i = 0; i < etext.length; i++) {

      const encryptedChar = etext[i];
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
  