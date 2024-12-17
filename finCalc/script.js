let balance = 0;
let loanBalance = 0;
const transactionHistory = [];

document.getElementById("deposit-btn").addEventListener("click", function() {
  const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
  if (!isNaN(depositAmount) && depositAmount > 0) {
    balance += depositAmount;
    document.getElementById("balance").innerText = "$" + balance.toFixed(2);
    transactionHistory.push(`Deposited $${depositAmount.toFixed(2)}`);
    updateTransactionHistory();
    document.getElementById("deposit-amount").value = '';
  } else {
    alert("Please enter a valid deposit amount.");
  }
});

document.getElementById("withdraw-btn").addEventListener("click", function() {
  const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);
  if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= balance) {
    balance -= withdrawAmount;
    document.getElementById("balance").innerText = "$" + balance.toFixed(2);
    transactionHistory.push(`Withdrew $${withdrawAmount.toFixed(2)}`);
    updateTransactionHistory();
    document.getElementById("withdraw-amount").value = '';
  } else {
    alert("Invalid withdraw amount.");
  }
});

document.getElementById("cd-btn").addEventListener("click", function() {
  const cdAmount = parseFloat(document.getElementById("cd-amount").value);
  const cdRate = parseFloat(document.getElementById("cd-rate").value) / 100;
  const cdYears = parseFloat(document.getElementById("cd-years").value);

  if (!isNaN(cdAmount) && !isNaN(cdRate) && !isNaN(cdYears) && cdAmount > 0 && cdRate > 0 && cdYears > 0) {
    if (cdAmount > balance) {
      alert("Insufficient balance to invest in CD.");
      return;
    }

    const finalValue = cdAmount * Math.pow(1 + cdRate, cdYears);
    document.getElementById("cd-value").innerText = finalValue.toFixed(2);
    transactionHistory.push(`Invested $${cdAmount.toFixed(2)} in CD`);

    const ctx = document.getElementById("cd-growth-chart").getContext("2d");
    const data = {
      labels: Array.from({ length: cdYears }, (_, i) => `Year ${i + 1}`),
      datasets: [{
        label: 'Investment Growth',
        data: Array.from({ length: cdYears }, (_, i) => cdAmount * Math.pow(1 + cdRate, i + 1)),
        borderColor: '#00c4cc',
        fill: false
      }]
    };

    new Chart(ctx, {
      type: 'line',
      data: data
    });

    document.getElementById("cd-amount").value = '';
    document.getElementById("cd-rate").value = '';
    document.getElementById("cd-years").value = '';
  } else {
    alert("Please enter valid values for CD.");
  }
});

document.getElementById("loan-btn").addEventListener("click", function() {
  const loanAmount = parseFloat(document.getElementById("loan-amount").value);
  const loanRate = parseFloat(document.getElementById("loan-rate").value) / 100;
  const loanTerm = parseFloat(document.getElementById("loan-term").value);

  if (!isNaN(loanAmount) && !isNaN(loanRate) && !isNaN(loanTerm) && loanAmount > 0 && loanRate > 0 && loanTerm > 0) {
    if (loanAmount > balance) {
      alert("Loan amount cannot exceed your balance.");
      return;
    }

    const interest = loanAmount * loanRate * loanTerm;
    const totalRepayment = loanAmount + interest;
    loanBalance += totalRepayment;

    document.getElementById("loan-balance").innerText = "$" + loanBalance.toFixed(2);
    transactionHistory.push(`Took a loan of $${loanAmount.toFixed(2)} with total repayment of $${totalRepayment.toFixed(2)}`);
    updateTransactionHistory();

    document.getElementById("loan-amount").value = '';
    document.getElementById("loan-rate").value = '';
    document.getElementById("loan-term").value = '';
  } else {
    alert("Please enter valid values for loan.");
  }
});

function updateTransactionHistory() {
  const historyElement = document.getElementById("transaction-history");
  historyElement.innerHTML = '';
  transactionHistory.forEach(transaction => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = transaction;
    historyElement.appendChild(li);
  });
}

document.getElementById("dark-mode-toggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});
