// Helper function to create matrix
function createMatrix(id, rows, cols) {
    const matrix = document.getElementById(id);
    matrix.innerHTML = '';
    matrix.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
    for(let i = 0; i < rows * cols; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = '0';
        input.className = 'matrix-cell';
        matrix.appendChild(input);
    }
}

// Get matrix values from input
function getMatrixValues(id) {
    const rows = parseInt(document.getElementById('rowsInput').value);
    const cols = parseInt(document.getElementById('colsInput').value);
    const inputs = document.querySelectorAll(`#${id} input`);
    const matrix = [];
    
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Number(inputs[i * cols + j].value) || 0);
        }
        matrix.push(row);
    }
    
    return matrix;
}

// Display result matrix
function displayResult(matrix) {
    const resultDiv = document.getElementById('resultMatrix');
    resultDiv.innerHTML = '';
    resultDiv.style.gridTemplateColumns = `repeat(${matrix[0].length}, 1fr)`;
    
    matrix.forEach(row => {
        row.forEach(value => {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = value;
            input.readOnly = true;
            input.className = 'matrix-cell';
            resultDiv.appendChild(input);
        });
    });
}

// Matrix multiplication
function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    
    if (colsA !== matrixB.length) {
        alert('Untuk perkalian matriks, jumlah kolom matriks A harus sama dengan jumlah baris matriks B');
        return null;
    }
    
    const result = Array(rowsA).fill().map(() => Array(colsB).fill(0));
    
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    
    return result;
}

// Calculate matrix operations
function calculateMatrixOperation(operation) {
    const matrixA = getMatrixValues('matrixA');
    const matrixB = getMatrixValues('matrixB');
    let resultMatrix;

    const rows = matrixA.length;
    const cols = matrixA[0].length;

    // Check if matrices have same dimensions for addition and subtraction
    if ((operation === 'tambah' || operation === 'kurang') && 
        (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length)) {
        alert('Untuk operasi penjumlahan dan pengurangan, kedua matriks harus memiliki ukuran yang sama');
        return;
    }

    switch(operation) {
        case 'tambah':
            resultMatrix = matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
            break;
        case 'kurang':
            resultMatrix = matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
            break;
        case 'kali':
            resultMatrix = multiplyMatrices(matrixA, matrixB);
            break;
    }

    if (resultMatrix) {
        displayResult(resultMatrix);
    }
}

// Update matrix size
function updateMatrixSize() {
    const rows = parseInt(document.getElementById('rowsInput').value);
    const cols = parseInt(document.getElementById('colsInput').value);
    
    // Validate input
    if (rows < 1 || cols < 1 || rows > 5 || cols > 5) {
        alert('Masukkan dimensi yang valid (1-5)');
        return;
    }
    
    createMatrix('matrixA', rows, cols);
    createMatrix('matrixB', rows, cols);
    document.getElementById('resultMatrix').innerHTML = '';
}

// Reset all inputs
function resetMatriks() {
    const rows = parseInt(document.getElementById('rowsInput').value);
    const cols = parseInt(document.getElementById('colsInput').value);
    createMatrix('matrixA', rows, cols);
    createMatrix('matrixB', rows, cols);
    document.getElementById('resultMatrix').innerHTML = '';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Set initial matrix size
    updateMatrixSize();
});