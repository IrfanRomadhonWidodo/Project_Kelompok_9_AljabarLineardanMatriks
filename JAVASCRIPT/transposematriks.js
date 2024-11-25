// Helper function to create input matrix
function createMatrix(rows, cols) {
    const matrix = document.getElementById('inputMatrix');
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
function getMatrixValues() {
    const rows = parseInt(document.getElementById('rowsInput').value);
    const cols = parseInt(document.getElementById('colsInput').value);
    const inputs = document.querySelectorAll('#inputMatrix input');
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

// Calculate transpose of the matrix
function calculateTranspose() {
    const matrix = getMatrixValues();
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Create transpose matrix
    const transpose = Array.from({ length: cols }, () => Array(rows).fill(0));
    
    // Fill transpose matrix
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            transpose[j][i] = matrix[i][j];
        }
    }
    
    displayResult(transpose);
}

// Update matrix size
function updateMatrixSize() {
    const rows = parseInt(document.getElementById('rowsInput').value);
    const cols = parseInt(document.getElementById('colsInput').value);
    
    // Validate input
    if (rows < 1 || cols < 1 || rows > 5 || cols > 5) {
        alert('Please enter valid dimensions (1-5)');
        return;
    }
    
    createMatrix(rows, cols);
    document.getElementById('resultMatrix').innerHTML = '';
}

// Reset all inputs
function resetMatrix() {
    const rows = parseInt(document.getElementById('rowsInput').value);
    const cols = parseInt(document.getElementById('colsInput').value);
    createMatrix(rows, cols);
    document.getElementById('resultMatrix').innerHTML = '';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Set initial matrix size
    createMatrix(3, 3);
});