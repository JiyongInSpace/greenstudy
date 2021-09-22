const todoForms = document.querySelectorAll(".todo-form");
const todoLi = document.querySelectorAll(".todo-ul li");
const todoAll = document.querySelector(".todo-list");
const addGoal = document.querySelector(".list-hd span");
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

//burger-menu
// nav menu - burger menu
(function() {
    var burgerMenu = document.getElementsByClassName('b-menu')[0];
    var burgerNav = document.getElementsByClassName('b-nav')[0];

    burgerMenu.addEventListener('click', function toggleClasses() {
            this.classList.toggle('open');
            burgerNav.classList.toggle('open');
    }, false);
})();

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
    li.className = "todo-li";
    if(todo.checked) li.classList.add("checked");
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
function deleteList(id){
    const lists = document.querySelectorAll(".todo-li");
    lists.forEach(list => list.id === id ? list.remove() : list);
    todoArr = todoArr.filter(todo => todo.id*1 !== id*1);
    localStorage.setItem("todos", JSON.stringify(todoArr));
    todoModal.classList.remove("show");
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
//////////////// 목표저장
function saveGoal(){
    const goalObj = {
        text: goalInput.value,
        id: Date.now()
    }
    createGoal(goalObj);
    goalArr.push(goalObj);
    localStorage.setItem("goals", JSON.stringify(goalArr));
}
//////////////// 목표생성
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
    const btn = document.createElement('div');
    btn.className="more-btn2";
    btn.innerHTML="<span></span><span></span><span></span>";
    div.appendChild(btn);
    todoAll.appendChild(div);
    goalForm.classList.remove('show');
    goalInput.value="";
}
//////////////// 목표모달창
const goalModify = document.querySelectorAll('.more-btn2');
const hasClass = todoModal.classList.contains('show')
const goalDelete = document.querySelector('.modal-bg.goalmodal .todo-modal-icon.delete');
const todoGoal = document.querySelectorAll('.todo-goal');
const todoModal2 = document.querySelector(".modal-bg.goalmodal");

todoGoal.forEach(function(v,k){
    goalModify[k].addEventListener("click",function(){
        if(!hasClass){
            todoModal2.classList.add('show')
        }
        goalDelete.addEventListener("click",function(){
            todoGoal[k].remove();
            todoModal2.classList.remove('show');
            goalArr = goalArr.filter( (todo)=>todo.id !== parseInt(todoGoal[k].id) )
            localStorage.setItem("goals", JSON.stringify(goalArr));
        })
    })
})


function showModal(e){
    if(e.target.tagName === "IMG") return;
    todoModal.classList.add("show");
    todoModal.dataset.id = e.currentTarget.id;
}
function modalClicks(e){
    if(e.target === e.currentTarget){
        todoModal.classList.remove("show");
    } else if(e.target.classList.contains("delete")){
        deleteList(this.dataset.id);
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




//-----------------------달력--------------------------------//
const calendarBox = document.querySelector(".calendar-box");
const calenderHd = document.querySelector(".cal-hd");
const calTable  = document.querySelector(".cal-table")

let today = new Date();
let date = new Date();

function prevCalendar(){
     today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
     buildCalendar();
}

function nextCalendar(){
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar();
}

function buildCalendar(){
    let doMonth = new Date(today.getFullYear(),today.getMonth(),0);
    let lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
    calenderHd.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; 
    while (calTable.rows.length > 1) {
        calTable.deleteRow(calTable.rows.length-1);
    }
    let row = null;
    let cnt = 0;
    row = calTable.insertRow();
    for(i=0; i<doMonth.getDay(); i++) {
        cell = row.insertCell();
        cnt = cnt + 1;
     }
    for(i=1; i<=lastDate.getDate(); i++) { 
        cell = row.insertCell();
        cell.innerHTML = `<img src ="img/check-ok.png"><br/> ${i}`;
        cnt = cnt + 1;

        if(cnt%7 == 6){
        cell.innerHTML = `<img src ="img/check-ok.png"><font color=#8abfe8><br/> ${i}`;
        }
        if(cnt%7 == 0) {
        cell.innerHTML = `<img src ="img/check-ok.png"><font color=#e06547><br/> ${i}`;
        row = calTable.insertRow();
        }    
        

        
        if(today.getFullYear() == date.getFullYear()
            && today.getMonth() == date.getMonth()
            && i == date.getDate()) {
            cell.bgColor = "yellow";   
        }
    }
}
buildCalendar()