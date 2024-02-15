function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');
    dataArray.forEach(row => 
        {
        let tr = document.createElement('tr');

        row.forEach(val => 
            
            {
            let td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};


function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result = [1, 2, 3, 4, 5, 6, 7, 8];
    // Call your matrix calculation functions here
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation

    // Call the showResult function to display the result

    switch (operation) {
        case 'add': // Add the two matrices
            result = addMatrices(matrix1, matrix2);
            break;
        case 'subtract': // Subtract the two matrices
            result = subtractMatrices(matrix1, matrix2);
            break;
        case 'multiply':// Multiply the two matrices
            result = multiplyMatrices(matrix1, matrix2);
            break;
        default:
            console.log("Invalid operation"); // Print an error message

            return; // Exit the function if the operation is not recognized
    }

    // Check if the operation was successful (i.e., the result is not undefined)
    if (result) {
        // Use the showResult2D function to display the result
        showResult2D('The Result', 'matrix3', result);
    } else {
        // If the operation was not possible (e.g., due to incompatible matrix sizes), the result will be undefined
        console.log("Operation was not possible.");
    } // use suitable function for printing results
}

// Get the data from the matrix inputs and return a 1D array

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

// Get the data from the matrix inputs and return a 2D array

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.

// Add two matrices

function addMatrices(matrix1, matrix2) 
{
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) 

    { // Check if the matrices are of the same size
        console.log("Matrices are not of the same size. Cannot perform addition.");
        return;
    }

    let result = matrix1.map((row, i) => 
        row.map((val, j) => val + matrix2[i][j])
    );
    return result;
}
// Subtract two matrices 

const subtractMatrices = function (matrix1, matrix2) 
{
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.log("Matrices are not of the same size. Cannot perform subtraction.");
        return;
    }
    let result = matrix1.map((row, i) => 
        row.map((val, j) => val - matrix2[i][j])
    );

    return result;
};

// Multiply two matrices

const multiplyMatrices = (matrix1, matrix2) => 
{
    if (matrix1[0].length !== matrix2.length) {
        console.log("The number of columns in the first matrix must equal the number of rows in the second matrix M x N. Cannot perform multiplication.");
        return;
    }
    let result = new Array(matrix1.length).fill(0).map(() => new Array(matrix2[0].length).fill(0)); // Initialize the result matrix with zeros
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix2[0].length; j++) { // Iterate over the rows of the first matrix and the columns of the second matrix
            for (let k = 0; k < matrix1[0].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j]; 
            }
        }
    }
    return result;
};
