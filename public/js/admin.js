// Sample data
let totalSales = 5000000; // UGX
let totalReceipts = 120;
let totalStock = 15000;
 let totalCredits = 200000;

// Update the cards with data
document.getElementById("total-sales").textContent = `UGX ${totalSales.toLocaleString()}`;
document.getElementById("total-receipts").textContent = totalReceipts;
document.getElementById("total-stock").textContent = `${totalStock.toLocaleString()} kg`;
document.getElementById("total-Credits").textContent = `UGX ${totalCredits.toLocaleString()} `; 
// Bar chart for Sales
let ctxBar = document.getElementById('salesBarChart').getContext('2d');
new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Sales (UGX)',
            data: [1200000, 1500000, 1000000, 2000000, 2500000, 3000000],
            backgroundColor: '#007bff',
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Line chart for Stock
let ctxLine = document.getElementById('stockLineChart').getContext('2d');
new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Stock (kg)',
            data: [10000, 8000, 12000, 14000, 10000, 15000],
            borderColor: '#28a745',
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Logout function
function logout() {
    alert("You have been logged out.");
    window.location.href = "login.html"; // Redirect to login page (ensure login.html exists)
}

// Search functionality
document.getElementById('search').addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
});
