const buildElement = function(){
    /**
     * build a new li element and stylings  
     */
    const liTemplate = document.getElementById("todoTemplate");
    const liClone  = liTemplate.content.firstElementChild.cloneNode(true); // cloning all inside template
    const todoContent = liClone.querySelector(".todo-content");
    todoContent.textContent = "Sample....";
    // todoCloseBtn.addEventListener('click',eventClose);
    eventClose(liClone);
    return liClone;


}

const main = function(){
    console.log("main initiated...")
    const addTaskElemet = document.getElementById("addTask");
    addTaskElemet.addEventListener("click",(event)=>{
        const todoContainer = document.getElementById("todos");
        const newTodo = buildElement();
        console.log("new todo got", newTodo);
        todoContainer.append(newTodo);
    });

}

function eventClose(element){
    /**
     * create an event close handle associated with the given  
     */
    const todoCloseBtn = element.querySelector('[name="close-btn"]');
    todoCloseBtn.addEventListener('click', (event)=>{
        element.remove();
    })

}

window.onload = main;
