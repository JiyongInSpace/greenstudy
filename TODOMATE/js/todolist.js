const todoList = document.querySelector(".goal");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-form input");
const todoUl = document.querySelector(".todo-ul");

let todoArr = [];

function showForm(){ //form 보여주기(show 클래스 추가했습니다.)
    todoForm.classList.add("show");
}
function hideForm(e){ // 다른곳 클릭시 form 숨기기(keepshow 클래스 추가했습니다.)
    if(e.target.classList.contains("keep-show")){
        return;
    };
    todoForm.classList.remove("show");
}
function addList(e){ //추가할때마다 todoArr 배열에 추가하고 li 생성
    e.preventDefault();
    if(todoInput.value === ""){
        return;
    }
    const todoObj = {
        text: todoInput.value,
        id: Date.now()
    }
    writeList(todoObj);
    todoArr.push(todoObj);
    todoInput.value = "";
    localStorage.setItem("todos", JSON.stringify(todoArr));
}

function writeList(todo){ // li 생성 함수
    todoUl.innerHTML += `
        <li id=${todo.id}>
            <img src="img/check-ok.png" class="unchecked">
            <span class="checked">${todo.text}</span>
            <div class="more-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </li>
    `
}

const savedTodos = localStorage.getItem("todos"); 
if(savedTodos !== null){ // 로컬스토리지에 저장되어있으면 불러옴
    todoArr = JSON.parse(savedTodos);
    todoArr.forEach(writeList);
}
window.addEventListener("click", hideForm);
todoList.addEventListener("click", showForm);
todoForm.addEventListener("submit", addList);