// Wait for the entire DOM to load before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // Get references to important DOM elements
    const form = document.getElementById('stock-form');                // The form element for input
    const nameInput = document.getElementById('product_name');         // Input field for product name
    const quantityInput = document.getElementById('product_quantity'); // Input field for product quantity
    const tableContainer = document.getElementById('table_container'); // Container where the table will be shown

    // Array to hold stock entries in memory
    let stockData = [];

    // Function to render the table based on the current stockData
    function renderTable() {
        // If there's no data, clear the container and return
        if (stockData.length === 0) {
            tableContainer.innerHTML = '';
            return;
        }

        // Create a new <table> element
        const table = document.createElement('table');

        // Create the header row
        const headerRow = table.insertRow();

        // Define the headers
        const headers = ['Product Name', 'Quantity', 'Actions'];

        // Loop through headers and create <th> cells for each
        headers.forEach(headerText => {
            const th = document.createElement('th'); // Create header cell
            th.textContent = headerText;             // Set its text
            headerRow.appendChild(th);               // Add to header row
        });

        // Loop through each item in stockData to create table rows
        stockData.forEach((item, index) => {
            const row = table.insertRow();               // Create new row
            row.insertCell().textContent = item.name;         // First cell: product name
            row.insertCell().textContent = item.quantity;     // Second cell: quantity
        });

        const actionsCell = row.insertCell();

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => handleEdit(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            stockData.splice(index, 1);
            renderTable();
        };

        const addBtn = document.createElement('button');
        addBtn.textContent = '+';
        addBtn.onclick = () => {
            const amount = prompt("Add how many?");
            const num = parseInt(amount, 10);
            if (!isNaN(num) && num > 0) {
                stockData[index].quantity += num;
                renderTable();
            }
        };

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '−';
        removeBtn.onclick = () => {
            const amount = prompt("Remove how many?");
            const num = parseInt(amount, 10);
            if (!isNaN(num) && num > 0 && num <= stockData[index].quantity) {
                stockData[index].quantity -= num;
                renderTable();
            } else {
                alert("Invalid amount.");
            }
        };

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(addBtn);
        actionsCell.appendChild(removeBtn);
        actionsCell.appendChild(deleteBtn);
    });
    
        // Clear the previous table content before appending new
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table); // Add the newly created table to the DOM
    }

    function handleEdit(index) {
        const item = stockData[index];
        const newName = prompt("Edit product name:", item.name);
        const newQuantity = prompt("Edit quantity:", item.quantity);

        if (newName && newQuantity) {
            const parsedQuantity = parseInt(newQuantity, 10);

            if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
                item.name = newName.trim();
                item.quantity = parsedQuantity;
                renderTable();
            } else {
                alert("Invalid quantity.");
            }
        }
    }


    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission (which reloads the page)

        // Get and sanitize the values from input fields
        const name = nameInput.value.trim();                    // Remove extra spaces from name
        const quantity = parseInt(quantityInput.value, 10);     // Convert quantity to a number (base 10)

        // Validate inputs: name must not be empty, and quantity must be a positive number
        if (name && quantity > 0) {
            // Check if product already exists (case-insensitive match)
            const existingProduct = stockData.find(item => item.name.toLowerCase() === name.toLowerCase());

            if (existingProduct) {
                // Update quantity if product exists
                existingProduct.quantity += quantity;
            } else {
                // Add as new product if it doesn't exist
                stockData.push({ name, quantity });
            }

            // Re-render the table with the new data
            renderTable();

            // Clear the input fields
            form.reset();
        }
    });
});
