let lotto = [];
let amount;
let num;
let event;

function generate() {
    let amount = +document.getElementById('amount').value;
    switch (true) {
        case amount < 1:
        case amount > 10:
            document.getElementsByClassName("wrapper-error").innerHTML = "Please choose a number between 1 and 10.";
            document.getElementsByClassName("output").innerHTML = "";
            break;
        default:
            document.getElementById("error").innerHTML = ""
            lotto.length = 0;
            for (num = 0; num < amount; num++) {
                lotto.push(Math.floor(Math.random() * 60) + 1);
            }
            lotto.sort(function(a,b){return a-b});
            document.getElementsByClassName("output").innerHTML = "Your Lotto Numbers are: ";
            document.getElementById("output").innerHTML = lotto;
            document.getElementById("button").innerHTML = "Regenerate";
            console.log(lotto);
            break;
        }
    }