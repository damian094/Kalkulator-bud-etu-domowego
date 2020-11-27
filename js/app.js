class Wallet {
    constructor() {
        this.incomes = [];
        this.expenses = [];
    }
}

class AddDataToWallet {
    constructor() {
        this.updateWallet = function (idOfSection) {
            const inputs = document.querySelectorAll(`${idOfSection} form input`);
            const labels = document.querySelectorAll(`${idOfSection} form label`);
            const option = document.querySelectorAll(`${idOfSection} form select`);
            let activeWallet;
            idOfSection === '#incomes' ? activeWallet = this.wallet.incomes : activeWallet = this.wallet.expenses;
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value) {
                    const newObject = {
                        description: labels[i].textContent,
                        value: inputs[i].value * 1,
                    }
                    //Get group property to expenses array
                    labels[i].parentNode.name ? newObject.group = labels[i].parentNode.name : undefined;
                    //Monthly or annualy?
                    option[i].selectedIndex ? newObject.value = newObject.value / 12 : newObject.value;
                    activeWallet.push(newObject);
                }
            }
            console.log(activeWallet);
        }
    }
}

class CalcSummary {
    constructor() {
        const returnNumberWithSpace = (number) => {
            let num = number.toFixed(2).toString();
            if (num.length > 6) {
                num = num.split('').reverse();
                num.splice(6, 0, ' ');
                if (num.length > 9) {
                    num.splice(10, 0, ' ');
                }
                num = num.reverse().join('');
            }
            return num;
        }

        this.getAllIncomes = function () {
            let sum = 0;
            for (let i = 0; i < this.wallet.incomes.length; i++) {
                sum += this.wallet.incomes[i].value;
            }
            return returnNumberWithSpace(sum);
        }
        this.getAllExpenses = function () {
            let sum = 0;
            for (let i = 0; i < this.wallet.expenses.length; i++) {
                sum += this.wallet.expenses[i].value;
            };
            return returnNumberWithSpace(sum);
        }
        this.getSummary = function () {
            const incomeSpan = document.querySelector('#incomeSummary span');
            const expenseSpan = document.querySelector('#expensesSummary span');
            const balanceSpan = document.querySelector('#balanceSummary span');

            const income = this.summary.getAllIncomes.bind(this)();
            incomeSpan.textContent = ` ${income.replace('.', ',')} PLN`;

            const expenses = this.summary.getAllExpenses.bind(this)();
            expenseSpan.textContent = ` ${expenses.replace('.', ',')} PLN`;

            const balance = income.replaceAll(' ', '') - expenses.replaceAll(' ', '');
            console.log(balance, income, expenses)
            balanceSpan.textContent = ` ${returnNumberWithSpace(balance).replace('.', ',')} PLN`;
            balance >= 0 ? balanceSpan.style.color = 'green' : balanceSpan.style.color = 'red';
        }
    }
}

class NewChart {
    constructor() {
        this.getDataToChart = function () {
            const expenses = this.wallet.expenses;
            const summaryArray = [{
                groupName: 'bills',
                totalValue: 0
            }, {
                groupName: 'financial-products',
                totalValue: 0
            }, {
                groupName: 'household-expenses',
                totalValue: 0
            }, {
                groupName: 'education',
                totalValue: 0
            }, {
                groupName: 'occasional-expenses',
                totalValue: 0
            }]
            for (let i = 0; i < expenses.length; i++) {
                for (let j = 0; j < summaryArray.length; j++) {
                    expenses[i].group === summaryArray[j].groupName ? summaryArray[j].totalValue += expenses[i].value : undefined;
                }
            }
            console.log(summaryArray)
            return summaryArray;
        }
    }

    createChart() {
        //Global options 
        Chart.defaults.doughnut.animation.animateScale = true;
        window.matchMedia('(max-width: 1025px)').matches ? Chart.defaults.global.defaultFontSize = 7 : Chart.defaults.global.defaultFontSize = 13;
        Chart.defaults.global.legend.labels.usePointStyle = true;

        const ctx = document.getElementById('myChart').getContext('2d');
        const dataToChart = this.newChart.getDataToChart.bind(this)();
        const myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [dataToChart[0].totalValue.toFixed(2), dataToChart[1].totalValue.toFixed(2), dataToChart[2].totalValue.toFixed(2), dataToChart[3].totalValue.toFixed(2), dataToChart[4].totalValue.toFixed(2)],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ]
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Rachunki',
                    'Produkty finansowe',
                    'Wydatki domowe',
                    'Edukacja',
                    'Wydatki okazjonalne'
                ]
            },
            options: {
                responsive: false,
                cutoutPercentage: 20
            }
        })
    }
}


class App {
    constructor() {
        this.wallet = new Wallet;
        this.addDataFunctions = new AddDataToWallet;
        this.summary = new CalcSummary;
        this.newChart = new NewChart;
        const incomesBtn = document.querySelector('#incomes button');
        const expensesBtn = document.querySelector('#expenses button');
        incomesBtn.addEventListener('click', this.addDataFunctions.updateWallet.bind(this, '#incomes'));
        expensesBtn.addEventListener('click', () => {
            this.addDataFunctions.updateWallet.bind(this, '#expenses')();
            this.summary.getSummary.bind(this)();
            this.newChart.createChart.bind(this)();
        })
    }
}


const app = new App();