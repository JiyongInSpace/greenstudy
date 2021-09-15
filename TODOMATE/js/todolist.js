const todoForms = document.querySelectorAll(".todo-form");
const todoLi = document.querySelectorAll(".todo-ul li");
// const todoImg = document.querySelector(".todo-ul li img");
// const todoText = document.querySelector(".todo-ul li span");
const todoAll = document.querySelector(".todo-list");
const addGoal = document.querySelector(".list-hd span");
// const goalList = document.querySelectorAll(".todo-goal");
const goalForm = document.querySelector(".goal-input");
const goalInput = document.querySelector(".goal-input input");

const todoModal = document.querySelector(".modal-bg");

let goalArr = [];
let todoArr = [];

const savedGoals = localStorage.getItem("goals");
if(savedGoals != null){
    goalArr = JSON.parse(savedGoals);
    goalArr.forEach(createGoal);
} else {
    goalArr = [
        {text: "목표1", id: 1}
    ]
    localStorage.setItem("goals", JSON.stringify(goalArr));
    goalArr.forEach(createGoal);
}
const goals = document.querySelectorAll(".goal");
const savedTodos = localStorage.getItem("todos"); 
if(savedTodos !== null){
    todoArr = JSON.parse(savedTodos);
    todoArr.forEach(todo => {
        goals.forEach(goal => {
            if(goal.id*1 === todo.goal*1){
                goal.parentNode.children[2].appendChild(writeList(todo))
            }})
        })
}


//MEMO add list 
function showForm(){ //form 보여주기
    this.parentNode.children[1].classList.toggle("show");
}

function addList(e){ //추가할때마다 todoArr 배열에 추가하고 li 생성
    e.preventDefault();
    if(this.children[1].value === ""){
        return;
    }
    const todoObj = {
        goal: this.parentNode.children[0].id,
        text: this.children[1].value,
        id: Date.now(),
        checked: false
    };
    this.parentNode.children[2].appendChild(writeList(todoObj));
    todoArr.push(todoObj);
    this.children[1].value = "";
    localStorage.setItem("todos", JSON.stringify(todoArr));
}

function writeList(todo){ // li 생성 함수
    const li = document.createElement('li');
    li.id = todo.id;
    if(todo.checked) li.className = "checked";
    li.addEventListener("click", showModal);
    const img = document.createElement('img');
    img.src = "img/check-ok.png";
    img.addEventListener("click", checkList);
    const span = document.createElement('span');
    span.innerText = todo.text;
    const div = document.createElement('div');
    div.className = "more-btn";
    div.innerHTML = `<span></span><span></span><span></span>`
    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(div);
    return li;
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
    const div = document.createElement('div');
    div.className = "todo-goal";
    div.id = goal.id;
    const div2 = document.createElement('div');
    div2.className = "goal";
    div2.innerHTML = `${goal.text}<span class="list-add">+</span>`;
    div2.id = goal.id;
    div2.addEventListener("click", showForm);
    div.appendChild(div2);
    const form = document.createElement('form');
    form.className = "todo-form";
    form.addEventListener("submit", addList)
    div.appendChild(form);
    const img = document.createElement('img');
    img.src = "img/check-ok.png";
    form.appendChild(img);
    const input = document.createElement('input');
    input.className = "todo-input";
    input.type = "text";
    input.placeholder = "입력";
    form.appendChild(input);
    const ul = document.createElement('ul');
    ul.className = "todo-ul";
    div.appendChild(ul);
    
    todoAll.appendChild(div);

    // todoAll.innerHTML += `
    //     <div class="todo-goal" id="${goal.id}">
    //         <div class="goal">${goal.text}<span class="list-add">+</span></div>
    //         <form class="todo-form">
    //             <img src="img/check-ok.png" class="unchecked">
    //             <input class="todo-input" type="text" placeholder="입력">
    //         </form>
    //         <ul class="todo-ul"></ul>
    //     </div>
    // `;
    goalForm.classList.remove('show');
    goalInput.value="";
}
function showModal(e){
    if(e.target.tagName === "IMG") return;
    todoModal.classList.add("show");
    todoModal.dataset.id = e.currentTarget.id;
}
function modalClicks(e){
    if(e.target === e.currentTarget){
        todoModal.classList.remove("show");
    } else if(e.target.classList.contains("delete")){
        console.log("delete");
        console.log(this.dataset.id);
    } else if(e.target.classList.contains("edit")){
        console.log("edit");
        console.log(this.dataset.id);
    }
}
function checkList(){
    if(this.parentNode.classList.contains("checked")){
        this.parentNode.classList.remove("checked");
        todoArr.forEach(todo => {
            if(todo.id*1 === this.parentNode.id*1) todo.checked = false; 
        });
    } else {
        this.parentNode.classList.add("checked");
        todoArr.forEach(todo => {
            if(todo.id*1 === this.parentNode.id*1) todo.checked = true; 
        });
    }
    localStorage.setItem("todos", JSON.stringify(todoArr));
}

//MEMO 이벤트 실행 
todoModal.addEventListener("click", modalClicks);
addGoal.addEventListener("click", showGoalForm);
goalForm.addEventListener("submit",function(e){
    e.preventDefault();
    saveGoal();
    goalForm.classList.remove('show');
    addGoal.classList.remove('active');
});