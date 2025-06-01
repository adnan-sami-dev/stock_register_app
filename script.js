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
        const headers = ['Product Name', 'Quantity'];

        // Loop through headers and create <th> cells for each
        headers.forEach(headerText => {
            const th = document.createElement('th'); // Create header cell
            th.textContent = headerText;             // Set its text
            headerRow.appendChild(th);               // Add to header row
        });

        // Loop through each item in stockData to create table rows
        stockData.forEach(({ name, quantity }) => {
            const row = table.insertRow();               // Create new row
            row.insertCell().textContent = name;         // First cell: product name
            row.insertCell().textContent = quantity;     // Second cell: quantity
        });

        // Clear the previous table content before appending new
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table); // Add the newly created table to the DOM
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
