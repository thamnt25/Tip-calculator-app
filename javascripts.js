const tipAmountDiv = document.getElementById("tip-amount");
const totalBillDiv = document.getElementById("total");
const inputBill = document.querySelector("#input-bill");
const inputPeople = document.querySelector("#input-person");
const btns = document.querySelectorAll(".tip-button");
const btnCustom = document.querySelector("#custom-discount");
const inputElement = document.querySelectorAll(".input-content input");


let discount = 0;
let people = 0;
let bill = 0;

inputBill.addEventListener('input', function() {

        limitInputLength(this, 5);
        bill = this.value;
        updateValues();
});

inputPeople.addEventListener('input', function() {
        limitInputLength(this, 5);
        people = this.value;
        updateValues();
});

btns.forEach(function(btn) {
        btn.addEventListener('click', function() {
        setActiveButton(this);
        btnCustom.placeholder = 'Custom'; 
        discount = btn.value;
        updateValues();
    })
});

btnCustom.addEventListener('click', function() {
    setActiveButton(this);
    this.placeholder="";
});

btnCustom.addEventListener('input', function() {
    limitInputLength(this, 3);
    discount = this.value;
    updateValues();
});

function setActiveButton(btn) {
    const activeBtn = document.querySelector(".active-input");
    if (activeBtn != null && activeBtn != undefined) {
        activeBtn.classList.remove("active-input");
    }
    btn.classList.add("active-input");
}


function operation(bill, discount, people) {
    let billDiscount = bill * discount * 0.01;
    let tipAmount = (billDiscount / people);
    tipAmount = Math.round((tipAmount + Number.EPSILON) * 100) / 100;
    let totalBillDiscount = (bill - billDiscount)/people;
    totalBillDiscount =  Math.round((totalBillDiscount + Number.EPSILON) * 100) / 100;
    updateTipTotalAmount(tipAmount, totalBillDiscount);
}

function updateTipTotalAmount(tipAmount, totalBill) {
    tipAmountDiv.innerHTML = "$" + tipAmount.toFixed(2);
    totalBillDiv.innerHTML = "$" + totalBill.toFixed(2);
}

function resetData() {
    updateTipTotalAmount(0.00, 0.00);
    inputElement.forEach(function(btn) {
        btn.value = "";
    });
    const activeBtn = document.querySelector(".active-input");
    activeBtn.classList.remove("active-input");
    btnCustom.value = "";
    btnCustom.placeholder = 'Custom'; 
}

function isValidInput(bill, peopleCount) {
    if (bill < 0 || peopleCount < 0 || bill == '' || peopleCount == '') {
        updateTipTotalAmount(0.00, 0.00);
        return false;
    }
    return true;
}

function limitInputLength(tag, maxLength) {
    if(tag.value.length > maxLength) {
        tag.value = tag.value.slice(0, maxLength);
    }
}

function updateValues() {
    if (isValidInput(bill, people)) {
         operation(bill, discount, people);
    }
}