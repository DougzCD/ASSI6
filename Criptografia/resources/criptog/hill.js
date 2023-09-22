// Função para criptografar usando a Cifra de Hill
function encryptHill(text, ekey) {
    if (typeof text !== 'string' || !Array.isArray(ekey)) {
      throw new Error("O texto deve ser uma string e a chave deve ser uma matriz.");
    }
  
    const textLength = text.length;
    const blockSize = ekey.length;
  
    // Verifica se a matriz chave é quadrada e tem o tamanho certo
    if (ekey.some(row => row.length !== blockSize) || ekey.length !== blockSize) {
      throw new Error("A matriz chave deve ser quadrada e ter o mesmo tamanho que o bloco de texto.");
    }
  
    const encryptedBlocks = [];
  
    for (let i = 0; i < textLength; i += blockSize) {
      const block = text.slice(i, i + blockSize);
      const blockVector = [];
  
      for (let j = 0; j < blockSize; j++) {
        blockVector.push(block.charCodeAt(j) - 97); // Assume que as letras são minúsculas e a = 0, b = 1, ...
      }
  
      const encryptedBlockVector = multiplyMatrixVector(ekey, blockVector);
      const encryptedBlock = encryptedBlockVector.map(num => String.fromCharCode((num % 26) + 97)).join('');
      encryptedBlocks.push(encryptedBlock);
    }
  
    return encryptedBlocks.join('');
}
  
  // Função para descriptografar usando a Cifra de Hill
function decryptHill(etext, dkey) {
    if (typeof etext !== 'string' || !Array.isArray(dkey)) {
      throw new Error("O texto criptografado deve ser uma string e a chave deve ser uma matriz.");
    }
  
    const textLength = etext.length;
    const blockSize = dkey.length;
  
    // Verifica se a matriz chave é quadrada e tem o tamanho certo
    if (dkey.some(row => row.length !== blockSize) || dkey.length !== blockSize) {
      throw new Error("A matriz chave deve ser quadrada e ter o mesmo tamanho que o bloco de texto.");
    }
  
    const decryptedBlocks = [];
  
    for (let i = 0; i < textLength; i += blockSize) {
      const block = etext.slice(i, i + blockSize);
      const blockVector = [];
  
      for (let j = 0; j < blockSize; j++) {
        blockVector.push(block.charCodeAt(j) - 97); // Assume que as letras são minúsculas e a = 0, b = 1, ...
      }
  
      const inversedkey = inverseMatrix(dkey);
      const decryptedBlockVector = multiplyMatrixVector(inversedkey, blockVector);
      const decryptedBlock = decryptedBlockVector.map(num => String.fromCharCode((num % 26) + 97)).join('');
      decryptedBlocks.push(decryptedBlock);
    }
  
    return decryptedBlocks.join('');
}
  
  // Função auxiliar para multiplicar uma matriz por um vetor
function multiplyMatrixVector(matrix, vector) {
    return matrix.map(row => row.reduce((sum, value, index) => sum + value * vector[index], 0));
}
  
  // Função auxiliar para calcular a matriz inversa (apenas para matrizes 2x2)
function inverseMatrix(matrix) {
    const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    const inverseDeterminant = multiplicativeInverse(determinant, 26);
  
    return [
      [
        ((matrix[1][1] * inverseDeterminant) % 26 + 26) % 26,
        ((-matrix[0][1] * inverseDeterminant) % 26 + 26) % 26
      ],
      [
        ((-matrix[1][0] * inverseDeterminant) % 26 + 26) % 26,
        ((matrix[0][0] * inverseDeterminant) % 26 + 26) % 26
      ]
    ];
}
  
  // Função auxiliar para encontrar o inverso multiplicativo (módulo 26)
function multiplicativeInverse(number, modulo) {
    for (let i = 1; i < modulo; i++) {
      if ((number * i) % modulo === 1) {
        return i;
      }
    }
    throw new Error(`O inverso multiplicativo não existe para ${number} (módulo ${modulo}).`);
}

module.exports = {
    encryptHill,
    decryptHill
};