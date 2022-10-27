const buildElement = function(){
    /**
     * build a new li element and stylings  
     */
    const liTemplate = document.getElementById("todoTemplate");
    const liClone  = liTemplate.content.firstElementChild.cloneNode(true); // cloning all inside template
    eventClose(liClone);
    eventEdit(liClone);
    return liClone;


}

const main = function(){
    console.log("main initiated...")
    const addTaskElemet = document.getElementById("addTask");
    const todoContainer = document.getElementById("todos");
    addTaskElemet.addEventListener("click",(event)=>{
        const newTodo = buildElement();
        console.log("new todo got", newTodo);
        todoContainer.append(newTodo);
        updateCount();
    });
    const clearAllElement = document.getElementById("clear");
    clearAllElement.addEventListener("click", ()=>{
        todoContainer.innerHTML = "";
        updateCount();
    });


}

function eventClose(element){
    /**
     * create an event close handle associated with the given  
     */
    const todoCloseBtn = element.querySelector('[name="close-btn"]');
    todoCloseBtn.addEventListener('click', (event)=>{
        element.remove();
        updateCount()
    })

};

function eventEdit(element){
    /**
     * edit the current todo  
     */
    // const todoCloseEdit = element.querySelector('[name="edit-btn"]');
    const todoContent = element.querySelector(".todo-content");
    todoContent.addEventListener('dblclick', (event)=>{
        todoContent.removeAttribute('readonly');
        todoContent.classList.add("border-fuchsia-700", "border-b-4");
    });
    todoContent.addEventListener("blur", (event)=>{
        todoContent.setAttribute('readonly', true);
        todoContent.classList.remove("border-fuchsia-700", "border-b-4");
    })
};

function updateCount(){
    const todoContainer = document.getElementById("todos");
    const length_ = todoContainer.children.length;
    const countElement = document.getElementById("count_T");
    countElement.textContent = length_;
}

window.onload = main;
