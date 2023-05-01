const rowsPerPage = 6; // Number of rows to show per page
let currentPage = 1; // Current page number

const $tableRows = $('.table-group-divider tr');
const $prevBtn = $('.prev-btn');
const $nextBtn = $('.next-btn');

// Hide all rows except the first n rows
$tableRows.slice(rowsPerPage).hide();

// Enable/disable "Previous" and "Next" buttons based on the current page number
function updateButtons() {
    const numRows = $tableRows.length;
    if (numRows <= rowsPerPage) {
        $prevBtn.hide();
        $nextBtn.hide();
    } else {
        $prevBtn.show().prop('disabled', currentPage === 1);
        $nextBtn.show().prop('disabled', currentPage === Math.ceil(numRows / rowsPerPage));
    }
}


// Go to the previous page
function prevPage() {
    currentPage--;
    const firstRowIndex = (currentPage - 1) * rowsPerPage;
    const lastRowIndex = firstRowIndex + rowsPerPage - 1;
    $tableRows.hide().slice(firstRowIndex, lastRowIndex + 1).show();
    updateButtons();
}

// Go to the next page
function nextPage() {
    currentPage++;
    const firstRowIndex = (currentPage - 1) * rowsPerPage;
    const lastRowIndex = firstRowIndex + rowsPerPage - 1;
    $tableRows.hide().slice(firstRowIndex, lastRowIndex + 1).show();
    updateButtons();
}

// Bind click event handlers to "Previous" and "Next" buttons
$prevBtn.on('click', prevPage);
$nextBtn.on('click', nextPage);

// Initialize the buttons
updateButtons();
