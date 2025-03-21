
let balanceEl = document.querySelector(".balance-number");
let incomeEl = document.querySelector(".number--income");
let expensesEL = document.querySelector(".number--expenses");
let form = document.querySelector(".form");
let transactionsEl = document.querySelector(".transactions");

function setupDeleteButtons(){
    let transactionBtns = document.querySelectorAll(".transaction__btn");
    transactionBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {

            const newBtn = btn.cloneNode(true);

            if (btn.parentNode) {
                btn.parentNode.replaceChild(newBtn, btn);
            }
            newBtn.addEventListener('click',function(event){
                const clickedEl = event.target.parentNode;
            let amountEl = event.target.previousElementSibling;
            let amount = Number(amountEl.textContent);
            let income = Number(incomeEl.textContent);
            let expense = Number(expensesEL.textContent);
            
            if (clickedEl.classList.contains("transaction--income")) {
                // First update income
                let newIncome = income - amount;
                incomeEl.textContent = newIncome;
                
                // Then recalculate and update balance
                balanceEl.textContent = newIncome - expense;
            }
            
            if (clickedEl.classList.contains("transaction--expense")) {
                // First update expense (subtracting the amount since we're removing the expense)
                let newExpense = expense + amount;
                expensesEL.textContent = newExpense;
                
                // Then recalculate and update balance
                balanceEl.textContent = income - newExpense;
            }
            
            // Remove the transaction element
            clickedEl.remove();
            })
            
        });
    });
}


form.addEventListener('submit', (event) => {
    // This is crucial - must call preventDefault() with parentheses
    event.preventDefault();
    
    const description = document.querySelector('.input--description').value;
    const amount = Number(document.querySelector('.input--amount').value);
    
    // Validation
    if (!description || !amount) {
        alert("Please enter both description and amount");
        return;
    }
    
    // Create new transaction element
    const newItem = document.createElement('li');
    
    if (amount > 0) {
        newItem.classList.add('transaction', 'transaction--income');
        // Update income total
        const currentIncome = Number(incomeEl.textContent);
        incomeEl.textContent = currentIncome + amount;
    } else {
        newItem.classList.add('transaction', 'transaction--expense');
        // Update expense total
        const currentExpense = Number(expensesEL.textContent);
        expensesEL.textContent = currentExpense + Math.abs(amount);
    }
    
    // Update balance
    const currentBalance = Number(balanceEl.textContent);
    balanceEl.textContent = currentBalance + amount;
    
    // Format the amount to display
    const displayAmount = amount > 0 ? `+${amount}` : amount;
    
    newItem.innerHTML = `
        <span class="transaction__text">${description}</span>
        <span class="transaction__amount">${displayAmount}</span>
        <button class="transaction__btn">X</button>
    `;
    
    // Add the new transaction to the list
    transactionsEl.appendChild(newItem);
    
    // Set up event handlers for all delete buttons including the new one
    setupDeleteButtons();
    
    // Clear the form inputs
    document.querySelector('.input--description').value = '';
    document.querySelector('.input--amount').value = '';
    document.querySelector('.input--description').focus();
    
    console.log("Transaction added:", description, amount);
});