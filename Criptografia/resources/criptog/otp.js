function encryptOTP(text, key) {
    if (text.length !== key.length) {
        throw new Error("O comprimento da chave deve ser igual ao comprimento do texto original.");
    }
    
    let etext = "";
    
    for (let i = 0; i < text.length; i++) {
        const plainChar = text.charCodeAt(i);
        const keyChar = key.charCodeAt(i);
    
        // Aplica a operação XOR entre o caractere do texto original e o caractere da chave
        const encryptedChar = plainChar ^ keyChar;
    
        // Converte o resultado de volta para caractere
        etext += String.fromCharCode(encryptedChar);
    }
    
    return etext;
}
  
function decryptOTP(etext, key) {
    if (etext.length !== key.length) {
        throw new Error("O comprimento da chave deve ser igual ao comprimento do texto criptografado.");
    }
    
    let decryptedText = "";
    
    for (let i = 0; i < etext.length; i++) {
        const encryptedChar = etext.charCodeAt(i);
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
