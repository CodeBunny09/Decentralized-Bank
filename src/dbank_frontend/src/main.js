// import App from './App';
// import './index.scss';

// const app = new App();


import {dbank_backend} from '../../declarations/dbank_backend';

window.addEventListener("load", async function () {
    // console.log("Page loaded successfully!!");
    update();

});

document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const button = e.target.querySelector("#submit-btn");

    const topUpAmt = document.getElementById("input-amount").value;
    const withdrawalAmt = document.getElementById("withdrawal-amount").value;
    
    button.setAttribute("disabled", true);
    
    if (topUpAmt.length != 0) {
        await dbank_backend.topUp(parseFloat(topUpAmt));
    }
    if (withdrawalAmt.length != 0) {
        await dbank_backend.withdraw(parseFloat(withdrawalAmt));
    }
    
    dbank_backend.compound();

    update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    
    button.removeAttribute("disabled");
});

async function update () {
    const currentAmt = await dbank_backend.checkBal();
    document.getElementById("value").innerText = currentAmt.toFixed(2);
}