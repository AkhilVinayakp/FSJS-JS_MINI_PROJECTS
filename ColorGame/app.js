//elements
const totalGamesEle = document.getElementById('count_g');
const totalWinsEle = document.getElementById('count_w');
const totalLossEle = document.getElementById('count_l');
const selectionCanvasEle = document.getElementById("current_selections");
const colorSchemas = document.getElementById("color-schema");
const palletContainer = document.getElementById("pContainer");
const colorsDaisy = ['btn-primary', 'btn-secondary', 'btn-accent', 'btn-neutral', 'btn-info', 'btn-success', 'btn-warning', 'btn-error'];
window.onload = main

function main(){
    //
    generateColorPalletView();
}

function generateColorPalletView(){
    colorsDaisy.forEach((color)=>{
        const colorElement = colorSchemas.content.firstElementChild.cloneNode(true);
        colorElement.addEventListener("click", userSelection);
        colorElement.classList.add(color)
        console.log(colorElement)
        palletContainer.append(colorElement);
    })
}

function userSelection(){

}