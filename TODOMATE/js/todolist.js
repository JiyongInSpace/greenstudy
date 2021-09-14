const todoList = document.querySelector(".goal");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-form input");
const todoUl = document.querySelector(".todo-ul");
const todoLi = document.querySelectorAll(".todo-ul li");
const todoImg = document.querySelector(".todo-ul li img");
const todoText = document.querySelector(".todo-ul li span");
const todoAll = document.querySelector(".todo-list");
const addGoal = document.querySelector(".list-hd span");
const goalList = document.querySelectorAll(".todo-goal");
const goalForm = document.querySelector(".goal-input");
const goalInput = document.querySelector(".goal-input input");

let todoArr = [];
let goalArr = [];

//MEMO add list 
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

//MEMO add goal 
function showGoalForm(){
    
    if(goalForm.classList.contains('show')) {
        goalForm.classList.remove('show');
        addGoal.classList.remove('active');
    } else {
        goalForm.classList.add('show');
        addGoal.classList.add('active');
    }
}
function saveGoal(){
    const goalObj = {
        text: goalInput.value,
        id: Date.now()
    }
    createGoal(goalObj);
    goalArr.push(goalObj);
    localStorage.setItem("goals", JSON.stringify(goalArr));
}
function createGoal(goal){
    todoAll.innerHTML += `
        <div class="todo-goal" id="${goal.id}">
            <div class="goal keep-show">${goal.text}<span class="list-add">+</span></div>
            <form class="todo-form">
                <img src="img/check-ok.png" class="unchecked keep-show">
                <input class="todo-input keep-show" type="text" placeholder="입력">
            </form>
            <ul class="todo-ul"></ul>
        </div>
    `;
    goalForm.classList.remove('show');
    goalInput.value="";
}
const savedGoals = localStorage.getItem("goals");
if(savedGoals !== null){
    goalArr = JSON.parse(savedGoals);
    goalArr.forEach(createGoal);
}



//MEMO 이벤트 실행 
window.addEventListener("click", hideForm);
todoList.addEventListener("click", showForm);
todoForm.addEventListener("submit", addList);
addGoal.addEventListener("click", showGoalForm);
goalForm.addEventListener("submit",function(e){
    e.preventDefault();
    saveGoal();
    goalForm.classList.remove('show');
});