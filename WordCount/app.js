
const countElement = document.getElementById("count_");
const textElement = document.getElementById("text-content");
textElement.textContent = "";
textElement.addEventListener("keyup", (e)=>{
    let content = textElement.textContent;
    content = content.split(" ");
    const content_length = content.length;
    countElement.textContent = content_length;
});