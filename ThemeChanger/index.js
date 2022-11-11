window.onload = main
const themes= ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]
const nav = document.getElementById('nav');
const toggelerElement = document.getElementById("toggler");
const dropDownTemplate = document.getElementById("themes_list");
const themeContainer = document.getElementById("container");
const container = document.getElementById("text-body");

function main(){
    toggelerElement.addEventListener("change", changeNavTheme);
    themes.forEach((item)=>{
        const element = dropDownTemplate.content.firstElementChild.cloneNode(true);
        const linkElement = element.querySelector("a");
        linkElement.setAttribute("id", item);
        linkElement.textContent = item
        themeContainer.append(element);
    });
    themeContainer.addEventListener('click', themeChange);
}


function changeNavTheme(event){
    const target = event.target;
    if(target.checked){
        nav.classList.remove("dark-theme");
        nav.classList.add("light-theme");
        themeContainer.classList.remove("dark-theme");
        themeContainer.classList.add("light-theme");
    }
    else{
        nav.classList.remove("light-theme");
        nav.classList.add("dark-theme");
        themeContainer.classList.remove("light-theme");
        themeContainer.classList.add("dark-theme");
    }
}

function themeChange(event){
    // console.log(event.target)
    const target = event.target;
    const theme = target.getAttribute("id");
    container.setAttribute('data-theme', theme);
}