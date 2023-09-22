
function encryptCaesar(plainText, shift) {
    if (typeof plainText !== 'string' || typeof shift !== 'number') {
      throw new Error("O texto deve ser uma string e o deslocamento deve ser um número.");
    }
  
    const encryptedText = plainText
      .split('')
      .map(char => {
        if (char.match(/[a-zA-Z]/)) {
          const isUpperCase = char === char.toUpperCase();
          const charCode = char.charCodeAt(0);
          const offset = isUpperCase ? 65 : 97;
          const encryptedCharCode = ((charCode - offset + shift) % 26) + offset;
          return String.fromCharCode(encryptedCharCode);
        }
        return char;
      })
      .join('');
  
    return encryptedText;
}
  
function decryptCaesar(encryptedText, shift) {
    if (typeof encryptedText !== 'string' || typeof shift !== 'number') {
      throw new Error("O texto criptografado deve ser uma string e o deslocamento deve ser um número.");
    }
  
    const decryptedText = encryptedText
      .split('')
      .map(char => {
        if (char.match(/[a-zA-Z]/)) {
          const isUpperCase = char === char.toUpperCase();
          const charCode = char.charCodeAt(0);
          const offset = isUpperCase ? 65 : 97;
          const decryptedCharCode = ((charCode - offset - shift + 26) % 26) + offset;
          return String.fromCharCode(decryptedCharCode);
        }
        return char;
      })
      .join('');
  
    return decryptedText;
}
module.exports = {
    encryptCaesar,
    decryptCaesar
};