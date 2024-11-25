// Helper function to create input matrix
function createMatrix(rows, cols) {
    const matrix = document.getElementById('inputMatrix');
    matrix.innerHTML = '';
    
    for(let i = 0; i < rows * cols; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = '0';
        input.className = 'matrix-cell'; // Added class for styling
        matrix.appendChild(input);
    }
}

// Get matrix values from input
function getMatrixValues(matrixId) {
    const inputs = document.querySelectorAll(`#${matrixId} input`);
    const matrix = [];
    
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(Number(inputs[i * 3 + j].value) || 0);
        }
        matrix.push(row);
    }
    
    return matrix;
}

// Calculate determinant of 3x3 matrix
function calculateDeterminant(matrix) {
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    
    return (
        a * (e * i - f * h) -
        b * (d * i - f * g) +
        c * (d * h - e * g)
    );
}

// Calculate cofactor matrix
function calculateCofactor(matrix) {
    const cofactor = Array.from({ length: 3 }, () => Array(3).fill(0));
    
    cofactor[0][0] = matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1];
    cofactor[0][1] = -(matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]);
    cofactor[0][2] = matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0];
    
    cofactor[1][0] = -(matrix[0][1] * matrix[2][2] - matrix[0][2] * matrix[2][1]);
    cofactor[1][1] = matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0];
    cofactor[1][2] = -(matrix[0][0] * matrix[2][1] - matrix[0][1] * matrix[2][0]);
    
    cofactor[2][0] = matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1];
    cofactor[2][1] = -(matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0]);
    cofactor[2][2] = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    
    return cofactor;
}

// Calculate adjoint (transpose of cofactor)
function calculateAdjoint(cofactor) {
    return cofactor[0].map((_, colIndex) => cofactor.map(row => row[colIndex]));
}

// Function to convert a number to a fraction string
function toFraction(value) {
    if (value === 0) return '0';
    
    let numerator = value;
    let denominator = 1;

    // Handle negative values
    if (numerator < 0) {
        numerator *= -1;
        denominator *= -1;
    }

    // Find the greatest common divisor (GCD)
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    
    // Convert to fraction
    while (numerator % 1 !== 0) {
        numerator *= 10;
        denominator *= 10;
    }

    // Reduce fraction
    const divisor = gcd(numerator, denominator);
    
    numerator /= divisor;
    denominator /= divisor;

    return `${denominator < 0 ? -numerator : numerator}/${Math.abs(denominator)}`;
}

// Display result as fractions
function displayResult(matrix) {
    const resultDiv = document.getElementById('resultMatrix');
    resultDiv.innerHTML = '';
    
    matrix.forEach(row => {
        row.forEach(value => {
            const fractionString = toFraction(value);
            const input = document.createElement('input');
            input.type = 'text'; // Change type to text for fraction display
            input.value = fractionString;
            input.readOnly = true;
            resultDiv.appendChild(input);
        });
    });
}

// Calculate inverse of the given 3x3 matrix
function calculateInverse() {
    const matrix = getMatrixValues('inputMatrix');
    const det = calculateDeterminant(matrix);
    
    if(Math.abs(det) < 1e-10) {
        alert('Matrix is not invertible (determinant ≈ 0)');
        return;
    }
    
    const cofactor = calculateCofactor(matrix);
    const adjoint = calculateAdjoint(cofactor);
    
    // Calculate inverse elements
    const inverse = adjoint.map(row =>
        row.map(element => element / det)
    );
    
    displayResult(inverse);
}

// Reset all inputs
function resetMatrix() {
    createMatrix(3, 3);
    document.getElementById('resultMatrix').innerHTML = '';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    createMatrix(3, 3);
    
    // Add event listeners to buttons
    document.getElementById('calculateBtn').addEventListener('click', calculateInverse);
    document.getElementById('resetBtn').addEventListener('click', resetMatrix);
});

