import Utils from "../../js/admin/Utils.js";

const chartByYear = document.getElementById('chart__by__year');
const chartByMonth = document.getElementById('chart__by__month')
const doughnutChart = document.getElementById('doughnut__chart__by__month')

const elementId = document.querySelector('.navigation')
Utils.includeNavigation(elementId)


new Chart(chartByYear, {
    type: 'line',
    data: {
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      datasets: [{
        label: 'Số doanh thu',
        data: [12, 19, 100, 200, 500, 800, 3, 4, 900, 1000, 11, 55],
        borderWidth: 1,
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        tension: 0.2 
      }]
    },
    options: {
        responsive: true,
        // maintainAspectRatio: false, 
        // height: 200,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tháng', // Tên trục x
                    color: '#393939',
                    font: {
                        size: 12
                    }
                },
                grid: {
                display: false // Ẩn grid lines trục x
                },
                ticks: {
                    autoSkip: false, // Không tự động bỏ qua labels
                    maxRotation: 0, // Xoay label 45 độ
                    minRotation: 0
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh thu (triệu đồng)', // Tên trục x
                    color: '#393939',
                    font: {
                        size: 12
                    }
                },
                grid: {
                display: false // Ẩn grid lines trục y
                }
            }
        }
    }
});

new Chart(chartByMonth, {
type: 'line',
    data: {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        datasets: [{
        label: 'Số doanh thu',
        data: [12, 19, 3, 5, 2, 3, 3, 4, 5, 6, 11, 150, 90, 12, 89, 34,87,56,56,56,56,66,33,67,88,77,66,88,33,47,90],
        borderWidth: 1,
        borderColor: '#FFA62F',
        backgroundColor: 'rgba(255, 211, 153, 0.3)',
        tension: 0.2 
        }]
    },
    options: {
        responsive: true,
        // maintainAspectRatio: false,  
        // height: 400,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ngày', // Tên trục x
                    color: '#393939',
                    font: {
                        size: 12
                    }
                },
                grid: {
                display: false // Ẩn grid lines trục x
                },
                ticks: {
                    autoSkip: false, // Không tự động bỏ qua labels
                    maxRotation: 0, // Xoay label 45 độ
                    minRotation: 0
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh thu (triệu đồng)', // Tên trục x
                    color: '#393939',
                    font: {
                        size: 12
                    }
                },
                grid: {
                display: false // Ẩn grid lines trục y
                }
            }
        }
    }
});


var listCategory = [1,2,3,4,5]

function createDoughoutChart(canvasId, data) {
    // Khi có data từ db thì sẽ cop đoạn code tạo doughout vào đấy
}

new Chart(doughnutChart, {
    type: 'doughnut',
    data: {
        labels: ["Áo thun", "Áo sơ mi", "Áo hoodie", "Quần jean", "Quần tây"],
        datasets: [{
            label: "Phần trăm thị phần",
            data: [25, 25, 15, 5, 30],
            backgroundColor: applyColorToCategory(listCategory.length),
            tension: 0.0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, 
    }
});

function getRandomColor() {
    const r = Math.floor((Math.random() * 128) + 127); 
    const g = Math.floor((Math.random() * 128) + 127); 
    const b = Math.floor((Math.random() * 128) + 127); 

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function applyColorToCategory(length) {
    let colors = []
    for (let i = 0; i < length; i++) {
        colors.push(getRandomColor())
    }
    return colors
}

const inputStatisticByDate = document.getElementById('input__statistic__by__date')
const viewStatisticByDate = document.getElementById('view__statistic__by__date')
viewStatisticByDate.addEventListener('click', () => {
    const inputDate = new Date(inputStatisticByDate.value)
    if (inputStatisticByDate.value.trim() === '') {
        Utils.showToast("Vui lòng nhập ngày để xem thống kê", 'error')
    } else if (inputDate > new Date().setHours(0,0,0,0)) {
        Utils.showToast("Ngày không hợp lệ!", 'error')
    } else {

    }
})

const viewStatisticByYear = document.getElementById('statistic__year')
const inputYear = document.getElementById('input__year')
viewStatisticByYear.addEventListener('click', () => {
    if (inputYear.value.trim() === '') {
        Utils.showToast("Vui lòng nhập năm để xem thống kê", 'error')
    } else if (inputYear.value.trim() > new Date().getFullYear().toString()) {
        Utils.showToast("Năm không hợp lệ!", 'error')
    } else {

    }
})

const inputMonth = document.getElementById('input__month')
const viewStatisticByMonth = document.getElementById('statistic__month')

viewStatisticByMonth.addEventListener('click', () => {
    const [year, month] = inputMonth.value.split('-');
    if (inputMonth.value.trim() === '') {
        Utils.showToast("Vui lòng nhập tháng để xem thống kê", 'error')
    } else if (month > (new Date().getMonth()+1).toString()) {
        Utils.showToast("Tháng không hợp lệ!", 'error')
        console.log(month, (new Date().getMonth()+1))
    } else {

    }
})

const inputMonthMarketShare = document.getElementById('input__month__market__share')
const viewPercentCategoryMonth = document.getElementById('percent__category__month')

viewPercentCategoryMonth.addEventListener('click', () => {
    const [year, month] = inputMonthMarketShare.value.split('-');
    if (inputMonthMarketShare.value.trim() === '') {
        Utils.showToast("Vui lòng nhập   tháng để xem thống kê", 'error')
    } else if (month > (new Date().getMonth()+1).toString()) {
        Utils.showToast("Tháng không hợp lệ!", 'error')
        console.log(month, (new Date().getMonth()+1))
    } else {

    }
})
