// Fungsi utama untuk menyelesaikan sistem dengan metode Cramer
function solveCramers() {
    try {
        const equations = document.querySelectorAll('.equation');
        const matrix = [];
        const constants = [];

        equations.forEach(eq => {
            const coefs = Array.from(eq.querySelectorAll('.coef')).map(input => {
                return input.value.trim() === '' ? 0 : parseFloat(input.value);
            });
            const result = coefs.pop();
            matrix.push(coefs);
            constants.push(result);
        });

        const D = calculateDeterminant(matrix);

        if (Math.abs(D) < 1e-10) {
            alert('Sistem tidak memiliki solusi unik (determinan = 0)');
            return;
        }

        const Dx = calculateVariableDeterminant(matrix, constants, 0);
        const Dy = calculateVariableDeterminant(matrix, constants, 1);
        const Dz = calculateVariableDeterminant(matrix, constants, 2);

        const x = Dx / D;
        const y = Dy / D;
        const z = Dz / D;

        displayResults(x, y, z);
    } catch (error) {
        alert('Terjadi kesalahan dalam perhitungan: ' + error.message);
    }
}


// Fungsi untuk menghitung determinan matriks 3x3
function calculateDeterminant(matrix) {
    return (
        matrix[0][0] * matrix[1][1] * matrix[2][2] +
        matrix[0][1] * matrix[1][2] * matrix[2][0] +
        matrix[0][2] * matrix[1][0] * matrix[2][1] -
        matrix[0][2] * matrix[1][1] * matrix[2][0] -
        matrix[0][0] * matrix[1][2] * matrix[2][1] -
        matrix[0][1] * matrix[1][0] * matrix[2][2]
    );
}

// Fungsi untuk menghitung determinan variabel (Dx, Dy, atau Dz)
function calculateVariableDeterminant(matrix, constants, colIndex) {
    const modifiedMatrix = matrix.map(row => [...row]);

    for (let i = 0; i < 3; i++) {
        modifiedMatrix[i][colIndex] = constants[i];
    }

    return calculateDeterminant(modifiedMatrix);
}

// Fungsi untuk menampilkan hasil
function displayResults(x, y, z) {
    document.getElementById('x-value').textContent = formatNumber(x);
    document.getElementById('y-value').textContent = formatNumber(y);
    document.getElementById('z-value').textContent = formatNumber(z);
}

// Fungsi untuk memformat angka
function formatNumber(num) {
    if (Math.abs(num) < 1e-10) return '0';
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(2);
}

// Fungsi untuk mereset semua input dan hasil
function resetEquations() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '0');
    document.getElementById('x-value').textContent = '0';
    document.getElementById('y-value').textContent = '0';
    document.getElementById('z-value').textContent = '0';
}

// Initialize ketika halaman dimuat
document.addEventListener('DOMContentLoaded', resetEquations);

// Fungsi untuk validasi input
function validateInput(event) {
    const input = event.target;
    if (input.value === '' || isNaN(input.value)) {
        input.value = '0';
    }
}

// Menambahkan event listener untuk validasi input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', validateInput);
});
