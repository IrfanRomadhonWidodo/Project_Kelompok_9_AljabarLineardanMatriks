// Helper function to create input matrix
function createMatrix(size) {
    const matrix = document.getElementById('inputMatrix');
    matrix.innerHTML = '';
    matrix.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for(let i = 0; i < size * size; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = '0';
        input.className = 'matrix-cell';
        input.step = "1"; // Force integer input
        input.addEventListener('input', (e) => {
            if(e.target.value) {
                e.target.value = Math.round(parseFloat(e.target.value));
            }
        });
        matrix.appendChild(input);
    }
}

// Get matrix values from input
function getMatrixValues() {
    const size = parseInt(document.getElementById('matrixSize').value);
    const inputs = document.querySelectorAll('#inputMatrix input');
    const matrix = [];
    
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(Math.round(Number(inputs[i * size + j].value)) || 0);
        }
        matrix.push(row);
    }
    
    return matrix;
}

// Calculate determinant for 2x2 matrix
function determinant2x2(matrix) {
    return Math.round(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
}

// Calculate determinant for 3x3 matrix
function determinant3x3(matrix) {
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    
    const det = Math.round(
        a * (e * i - f * h) -
        b * (d * i - f * g) +
        c * (d * h - e * g)
    );
    
    return det;
}

// Get minor of matrix for 4x4 calculation
function getMinor(matrix, row, col) {
    return matrix
        .filter((_, index) => index !== row)
        .map(row => row.filter((_, index) => index !== col));
}

// Calculate determinant for 4x4 matrix
function determinant4x4(matrix) {
    let det = 0;
    
    // Expand along first row
    for (let j = 0; j < 4; j++) {
        const minor = getMinor(matrix, 0, j);
        const minorDet = determinant3x3(minor);
        const cofactor = Math.pow(-1, j) * matrix[0][j] * minorDet;
        det += cofactor;
    }
    
    return Math.round(det);
}

// Display determinant result
function displayResult(value) {
    const resultDiv = document.getElementById('determinantResult');
    resultDiv.textContent = value.toString();
}

// Main function to calculate determinant
function calculateDeterminant() {
    const matrix = getMatrixValues();
    const size = matrix.length;
    let result;

    switch(size) {
        case 2:
            result = determinant2x2(matrix);
            break;
        case 3:
            result = determinant3x3(matrix);
            break;
        case 4:
            result = determinant4x4(matrix);
            break;
        default:
            alert('Ukuran matriks tidak didukung');
            return;
    }

    displayResult(result);
}

// Update matrix when size changes
function updateMatrixSize() {
    const size = parseInt(document.getElementById('matrixSize').value);
    createMatrix(size);
    document.getElementById('determinantResult').textContent = '';
}

// Reset matrix values
function resetMatrix() {
    const size = parseInt(document.getElementById('matrixSize').value);
    createMatrix(size);
    document.getElementById('determinantResult').textContent = '';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateMatrixSize();
});