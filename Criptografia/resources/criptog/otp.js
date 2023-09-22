function encryptOTP(plainText, key) {
    if (plainText.length !== key.length) {
        throw new Error("O comprimento da chave deve ser igual ao comprimento do texto original.");
    }
    
    let encryptedText = "";
    
    for (let i = 0; i < plainText.length; i++) {
        const plainChar = plainText.charCodeAt(i);
        const keyChar = key.charCodeAt(i);
    
        // Aplica a operação XOR entre o caractere do texto original e o caractere da chave
        const encryptedChar = plainChar ^ keyChar;
    
        // Converte o resultado de volta para caractere
        encryptedText += String.fromCharCode(encryptedChar);
    }
    
    return encryptedText;
}
  
function decryptOTP(encryptedText, key) {
    if (encryptedText.length !== key.length) {
        throw new Error("O comprimento da chave deve ser igual ao comprimento do texto criptografado.");
    }
    
    let decryptedText = "";
    
    for (let i = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText.charCodeAt(i);
        const keyChar = key.charCodeAt(i);
    
        // Aplica a operação XOR entre o caractere criptografado e o caractere da chave
        const decryptedChar = encryptedChar ^ keyChar;
    
        // Converte o resultado de volta para caractere
        decryptedText += String.fromCharCode(decryptedChar);
    }
    
    return decryptedText;
}

module.exports = {
    encryptOTP,
    decryptOTP
};
