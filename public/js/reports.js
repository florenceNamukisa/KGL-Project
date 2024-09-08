document.addEventListener('DOMContentLoaded', () => {
    const totalProduceElem = document.getElementById('totalProduce');
    const totalSalesElem = document.getElementById('totalSales');
    const availableStockElem = document.getElementById('availableStock');
    const totalRevenueElem = document.getElementById('totalRevenue');
    const salesStockChartElem = document.getElementById('salesStockChart').getContext('2d');
  
    // Fetch report data from the server
    const fetchReportData = async () => {
      try {
        const response = await fetch('/report-data');
        const data = await response.json();
  
        // Update the card values
        totalProduceElem.textContent = `${data.totalProduce} kg`;
        totalSalesElem.textContent = `${data.totalSales} kg`;
        availableStockElem.textContent = `${data.availableStock} kg`;
        totalRevenueElem.textContent = `${data.totalRevenue} UGX`;
  
        // Update the chart
        updateChart(salesStockChart, data.salesData, data.stockData);
      } catch (err) {
        console.error('Error fetching report data:', err);
      }
    };
  
    // Initialize the sales vs stock chart
    const salesStockChart = new Chart(salesStockChartElem, {
      type: 'bar',
      data: {
        labels: [], // Updated dynamically
        datasets: [
          {
            label: 'Stock Levels (kg)',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Sales (kg)',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    // Function to update the chart with new data
    const updateChart = (chart, salesData, stockData) => {
      const labels = stockData.map(item => item.name);
      const stockValues = stockData.map(item => item.stock);
      const salesValues = salesData.map(item => item.tonnage);
  
      chart.data.labels = labels;
      chart.data.datasets[0].data = stockValues;
      chart.data.datasets[1].data = salesValues;
      chart.update();
    };
  
    // Fetch and update the report data every 5 seconds
    fetchReportData();
    setInterval(fetchReportData, 5000);
  });
  