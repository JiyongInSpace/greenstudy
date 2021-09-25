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
    
    // date select
    const dateArr = document.querySelectorAll('.cal-table tbody tr td');

    // date select - click event
    dateArr.forEach(function(v,k){
        dateArr[k].addEventListener("click",function(){
            console.log(
                today.getFullYear(),
                today.getMonth(),
                Number(this.textContent.trim())
            )
            //console.log(v)
            //console.log(k)
            //console.log(dateArr)
            dateArr[k].style.borderBottom = "1px solid #000";
        })
    })
}
buildCalendar()


//-----------------------투두리스트--------------------------------//

const todoForms = document.querySelectorAll(".todo-form");
const todoLi = document.querySelectorAll(".todo-ul li");
const todoAll = document.querySelector(".todo-list");
const addGoal = document.querySelector(".list-hd span");
const goalForm = document.querySelector(".goal-input");
const goalInput = document.querySelector(".goal-input input");
const todoModal = document.querySelector(".modal-bg");

let goalArr = [];
let todoArr = [];
let whatDay = `${today.getFullYear()}${today.getMonth()+1 < 10 ? "0"+(today.getMonth()+1) : today.getMonth()+1}${today.getDate()}`

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
            burgerNav.style.zIndex='20';
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
        day: whatDay,
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
    span.id = todo.id;
    span.innerText = todo.text;
    span.className = "todo-span";
    const div = document.createElement('div');
    div.className = "more-btn";
    div.innerHTML = `<span></span><span></span><span></span>`
    const form = document.createElement('form');
    form.className = "edit-form";
    form.id = todo.id;
    form.addEventListener("submit", editList);
    const input = document.createElement('input');
    input.value = todo.text;
    input.type="text";
    li.appendChild(form);
    form.appendChild(input);
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
function showEditForm(id){
    const forms = document.querySelectorAll(".edit-form");
    todoModal.classList.remove("show");
    forms.forEach(form => form.id === id ? form.classList.add("show-form") : form);
    
}
function hideEditForm(e){
    if(e.target.nodeName === "INPUT" || e.target.classList.contains("edit")) {return;};
    const editform = document.querySelector(".show-form");
    editform && editform.classList.remove("show-form");
}
function editList(e){
    e.preventDefault();
    const lists = document.querySelectorAll(".todo-span");
    lists.forEach(span => span.id === this.id ? span.textContent = this.children[0].value : span);
    todoArr.forEach(todo => todo.id*1 === this.id*1 ? todo.text = this.children[0].value : todo);
    localStorage.setItem("todos", JSON.stringify(todoArr));
    this.classList.remove("show-form");
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
        id: Date.now(),
        edit:"0"
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
const goalEdit = document.querySelector('.modal-bg.goalmodal .todo-modal-icon.edit');
const todoGoal = document.querySelectorAll('.todo-goal');
const editGoal = document.querySelector('.todo-goal.modify');
const todoModal2 = document.querySelector(".modal-bg.goalmodal");
////// 목표 수정 삭제 
goalModify.forEach(function(v,k){
    v.addEventListener("click",function(){
        showGoalModal(); // 모달창 생성
        deleteGoal(); // 목표삭제
        editGoal(); // 목표수정
    })
    function showGoalModal(){
        if(!hasClass){
            todoModal2.classList.add('show');
            todoGoal[k].classList.add('edit');
        }
        todoModal2.addEventListener("click",function(){
            todoModal2.classList.remove('show');
            todoGoal[k].classList.remove('edit');
        })
    }
    function deleteGoal(){
        goalDelete.addEventListener("click",function(){
            if( todoGoal[k].classList.contains('edit') ){
                todoGoal[k].remove();
                todoModal2.classList.remove('show');
                goalArr = goalArr.filter( (todo)=>todo.id !== parseInt(todoGoal[k].id) )
                localStorage.setItem("goals", JSON.stringify(goalArr));
            }
        })
    }
    function editGoal(){
        goalEdit.addEventListener("click",function(){
            if( todoGoal[k].classList.contains('edit') ){
            todoGoal[k].classList.add('modify');
            }
            goalForm.classList.add('show');
            goalForm.classList.add('edit');
            goalForm.addEventListener("submit",function(){
                for(let idx=0; idx<todoGoal.length; idx++){
                    if( todoGoal[idx].classList.contains('modify') ){
                        goalArr[idx].text = goalInput.value;
                        localStorage.setItem("goals", JSON.stringify(goalArr));
                    }
                    goalForm.classList.remove('edit');
                    goalForm.classList.remove('show');
                }
                todoGoal[k].classList.remove('modify');
            })
        })
    }
})



function showModal(e){
    if(e.target.tagName === "IMG" || e.target.tagName === "INPUT") return;
    todoModal.classList.add("show");
    todoModal.dataset.id = e.currentTarget.id;
}
function modalClicks(e){
    if(e.target === e.currentTarget){
        todoModal.classList.remove("show");
    } else if(e.target.classList.contains("delete")){
        deleteList(this.dataset.id);
    } else if(e.target.classList.contains("edit")){
        showEditForm(this.dataset.id)
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
window.addEventListener("click", hideEditForm);
todoModal.addEventListener("click", modalClicks);
addGoal.addEventListener("click", showGoalForm);
goalForm.addEventListener("submit",function(){
    if( !(goalForm.classList.contains('edit')) ){
        saveGoal();
        goalForm.classList.remove('show');
        addGoal.classList.remove('active');
    }
});



