// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Total Bookings", "Cancelled Bookings", "Upcoming Bookings", "Succesful Bookings"],
    datasets: [{
      data: [parseInt(document.getElementById("total_bookings").innerHTML), parseInt(document.getElementById("cancelled_bookings").innerHTML), parseInt(document.getElementById("upcoming_bookings").innerHTML), parseInt(document.getElementById("successful_bookings").innerHTML)],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});
