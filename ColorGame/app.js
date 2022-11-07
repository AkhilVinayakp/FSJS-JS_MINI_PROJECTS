//elements
const totalGamesEle = document.getElementById('count_g');
const totalWinsEle = document.getElementById('count_w');
const totalLossEle = document.getElementById('count_l');
const selectionCanvasEle = document.getElementById("current_selections");
const colorSchemas = document.getElementById("color-schema");
const palletContainer = document.getElementById("pContainer");
const userChoiceElement = document.getElementById("user-choice");
const systemChoiceElement = document.getElementById("system-choice");
let prev_systemChoice = "";
let prev_userChoice = ""
let cOrders = [];
let currentGames = 0;
let currentLoss = 0;
let currentWins = 0;
const colorsDaisy = ['btn-secondary', 'btn-info', 'btn-success', 'btn-warning', 'btn-error'];
window.onload = main

function main(){
    //
    generateColorPalletView();
}

function generateColorPalletView(){
    let order = 0;
    colorsDaisy.forEach((color)=>{
        const colorElement = colorSchemas.content.firstElementChild.cloneNode(true);
        colorElement.addEventListener("click", userSelection);
        colorElement.classList.add(color)
        colorElement.classList.add(`order-${order}`);
        cOrders.push(`order-${order}`);
        order +=1;
        console.log(colorElement)
        palletContainer.append(colorElement);
    })
}

function userSelection(event){
    console.log(event)
    let userChoice = null
    event.target.classList.forEach((item)=>{
        let eleIndex = colorsDaisy.indexOf(item)
        eleIndex = eleIndex<0 ? false : eleIndex;
        if(eleIndex){
            userChoice = colorsDaisy[eleIndex];
        }
    });
    console.log('Users Choice', userChoice);
    // gerate the computer choice
    let compChoice = randomPick(colorsDaisy.filter((item)=>{
        return item != userChoice;
    }));
    setResults(userChoice, compChoice)
}

function randomPick(selectioArray){
    const randIndex = Math.floor(Math.random() * selectioArray.length);
    return selectioArray[randIndex]
}

function setResults(userChoice, compChoice){
    if(userChoice == compChoice){
        currentWins ++;
    }
    else currentLoss ++;
    currentGames ++;
    totalGamesEle.textContent = currentGames;
    totalWinsEle.textContent = currentWins;
    totalLossEle.textContent = currentLoss;
    // remove hidden from 
    selectionCanvasEle.classList.remove("hidden");
    // set the collections
    if(prev_systemChoice){
        systemChoiceElement.classList.remove(prev_systemChoice);
    }
    systemChoiceElement.classList.add(compChoice);
    if(prev_userChoice){
        userChoiceElement.classList.remove(prev_userChoice);
    }
    userChoiceElement.classList.add(userChoice);
    // update the choices
    prev_userChoice = userChoice;
    prev_systemChoice = compChoice;

    
}
