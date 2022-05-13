
const incomeInput = document.querySelector(".net-income");
const loanAmountInput = document.querySelector(".price");
const interestRateInput = document.querySelector(".interest");
const downpaymentInput = document.querySelector(".downpayment");

const monthlyVal = document.querySelector(".monthly .value");
const goalIncomeVal = document.querySelector(".goal-income .value");
const calculate = document.querySelector(".btn");
const todays_interest = document.querySelector(".todays_interest");

let incomeAmmount = parseFloat(incomeInput.value);
let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let downpayment =  parseFloat(downpaymentInput.value);

let interest = interestRate / 12 / 100;


async function getInterest () { 
    const response = await fetch('/api');
    const aInterest =await response.json();
    const {interest}=aInterest;
    console.log(interest);
    return interest;
     };

getInterest()
.then(tInterest =>{
    document.getElementById('todays_interest').innerHTML = tInterest;
})
.catch(error =>{
    console.log(error);
});







const calculatePayment = () =>{
    let monthly = (loanAmount - downpayment) * interest * (Math.pow( 1 + interest,360)/(Math.pow (1 + interest,360) - 1));
    return monthly;
};

const updateData = (monthly) =>{
    monthlyVal.innerHTML = Math.round(monthly);
    
    let goalIncome= Math.round(monthly/.28);

    goalIncomeVal.innerHTML = goalIncome;

}

const init = () =>{
    refreshVal();
    let monthly= calculatePayment();
    updateData(monthly);

};

const refreshVal = (monthly) =>{
    incomeAmmount = parseFloat(incomeInput.value);
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    downpayment =  parseFloat(downpaymentInput.value);
    interest = interestRate / 12 / 100;
};

init();

calculate.addEventListener("click",init);