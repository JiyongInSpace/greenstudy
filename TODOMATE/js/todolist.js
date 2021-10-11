//-----------------------달력--------------------------------//
const calendarBox = document.querySelector(".calendar-box");
const calenderHd = document.querySelector(".cal-hd");
const calTable  = document.querySelector(".cal-table")
let dateArr = document.querySelectorAll('.cal-table tbody tr td img');

let today = new Date();
let date = new Date();
let selectedDate;
let whatDay;
let prev=new Date().getDate()-1;
console.log(`오늘: ${new Date().getDate()}일`)

function prevCalendar(){
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    buildCalendar();
    dateArr.forEach(function(v,k){
        dateArr[k].classList.remove('selected');
    })
    howManyleft()
}

function nextCalendar(){
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar();
    dateArr.forEach(function(v,k){
        dateArr[k].classList.remove('selected');
    })
    howManyleft()
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
        cell.innerHTML = `<img src ="img/check-ok.png">${i}`;
        cnt = cnt + 1;

        if(cnt%7 == 6){
        cell.innerHTML = `<img src ="img/check-ok.png">${i}`;
        }
        if(cnt%7 == 0) {
        cell.innerHTML = `<img src ="img/check-ok.png">${i}`;
        row = calTable.insertRow();
        }
        if(today.getFullYear() == date.getFullYear()
            && today.getMonth() == date.getMonth()
            && i == date.getDate()) {
            cell.bgColor = "yellow";
        }
    }

    dateArr = document.querySelectorAll('.cal-table tbody tr td img');

    for(let i=0; i<dateArr.length; i++){
        let someday = `${today.getFullYear()}${today.getMonth()+1 < 10 ? "0"+(today.getMonth()+1) : today.getMonth()+1}${ i+1 < 10? "0"+ (i+1) : i+1 }`;
        dateArr[i].parentElement.classList.add(`${someday}`)
    }
    
    // date select
    dateArr = Array.prototype.slice.call(dateArr); // converts NodeList to Array

    // date select - click event
    dateArr.forEach(function(v,k){
        dateArr[k].parentElement.addEventListener("click",function(){
            dateArr.forEach(function(val,key){ dateArr[key].className=""; })
            selectedDate = new Date(today.getFullYear(),today.getMonth(),(k+1))
            dateArr[prev].classList.remove('selected');
            dateArr[k].classList.add('selected');
            prev = k;
            whatDay = `${today.getFullYear()}${today.getMonth()+1 < 10 ? "0"+(today.getMonth()+1) : today.getMonth()+1}${ k+1 < 10? "0"+ (k+1) : k+1 }`;
            const lists = document.querySelectorAll(".todo-li.TODOLIST");
            removeAllItems(lists);
            makeTodolist();
        })
    })
}
buildCalendar();

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

whatDay = `${today.getFullYear()}${today.getMonth()+1 < 10 ? "0"+(today.getMonth()+1) : today.getMonth()+1}${today.getDate() < 10 ? "0"+today.getDate() : today.getDate()}`;

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
    makeTodolist();    
}

function removeAllItems(arr){
    arr.forEach(item => item.remove());
}

function makeTodolist(){
    todoArr.forEach(todo => {
        if(todo.day*1 !== whatDay*1) return;
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
    howManyleft()

}

function writeList(todo){ // li 생성 함수
    const li = document.createElement('li');
    li.id = todo.id;
    li.className = "todo-li TODOLIST";
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
    howManyleft()
}
function showEditForm(id){
    const forms = document.querySelectorAll(".edit-form");
    todoModal.classList.remove("show");
    forms.forEach(form => form.id === id ? form.classList.add("show-form") : form);
}
function passTomorrow(id){
    todoArr.forEach(todo => {
        if(todo.id*1 !== id*1){
            return;
        }
        else if(todo.id*1 === id*1){
            const lazyDay = new Date(YMDFormatter(todo.day));
            const nextDay = new Date(lazyDay.setDate(lazyDay.getDate() + 1));
            let tomorrow = `${nextDay.getFullYear()}${nextDay.getMonth()+1 < 10 ? "0"+(nextDay.getMonth()+1) : nextDay.getMonth()+1}${nextDay.getDate() < 10 ? "0"+nextDay.getDate() : nextDay.getDate()}`
            todo.day=tomorrow;
        }
    });
    todoModal.classList.remove("show");
    const lists = document.querySelectorAll(".todo-li");
    lists.forEach(list => list.id === id ? list.remove() : list);
    localStorage.setItem("todos", JSON.stringify(todoArr));
    howManyleft()
}
function YMDFormatter(num){
    let formatNum;
    if(num.length === 8) {
        formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        return formatNum;
    }
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
    } else if(e.target.classList.contains("pass")){
        passTomorrow(this.dataset.id);
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
    howManyleft()
}

/////////////////////////// 챌린지 시작
//MEMO 구현완료 : 챌린지 랜덤생성, 챌린지 로컬저장, 챌린지 모달창 생성, 
//TODO 미완료 : 챌린지 날짜별 갱신, 모달창닫기 및 챌린지 항목 수정, 챌린지 체크 
let challArr = [];
let challengeList = [
    "하루에 물 1리터 마시기",
    "식후 30분 걷기",
    "깃 허브 커밋 1회 하기",
    "하루 감사했던 일 하나 찾기",
    "한 끼 잘 차려먹기",
    "좋아하는 과일 먹기",
    "알람 듣고 바로 일어나기",
    "한 시간 이상 스스로 공부해보기",
    "하루 1가지 나를 칭찬하기",
    "책 10장 읽기"
];
const savedChall = localStorage.getItem("challenge");
if(savedChall != null){
    challArr = JSON.parse(savedChall);
    challArr.forEach(createChallenge);
};
function saveChallenge(){
    let randomList = Math.floor(Math.random() * challengeList.length);
    let challObj = {
        checked: false, //체크상태여부(기본 False)
        date: whatDay,
        text: challengeList[randomList]
    }
    createChallenge(challObj);
    challArr.push(challObj);
    localStorage.setItem("challenge", JSON.stringify(challArr));
}
function createChallenge(chall){
    const li = document.createElement('li');
    li.id = chall.date;
    li.className = "todo-li challList";
    const img = document.createElement('img');
    img.src = "img/check-ok.png";
    const span = document.createElement('span');
    span.innerText = chall.text;
    span.className = "todo-span";
    li.appendChild(img);
    li.appendChild(span);
    const ul = document.querySelector("#challenge .todo-ul");
    ul.appendChild(li);
}
const challBtn = document.querySelector("#challenge .goal")
challBtn.addEventListener("click",function(){
    const savedChall = document.querySelector("#challenge .todo-li");
    if(savedChall == null){
        saveChallenge();
    }
});
const challModal = document.querySelector(".challenge-modal .todo-modal")
for(let challIdx=0; challIdx<challengeList.length; challIdx++){
    challModal.innerHTML += `${challIdx+1}. ${challengeList[challIdx]}<br>`;
}
const challModalBtn = document.querySelector(".challenge-modify");
const challModalPop = document.querySelector(".challenge-modal");
function challShowModal(){
    challModalPop.classList.add("show");
}
function challShowoffModal(e){
    if(e.target.classList.contains("show")){
        challModalPop.classList.remove("show");
    }
}
challModalPop.addEventListener("click",challShowoffModal);
challModalBtn.addEventListener("click",challShowModal);

//챌린지 날짜 랜덤하게 나오기

const td = document.querySelectorAll('.cal-table td');

function afterDateChall(){
    var now = new Date();
    var end = new Date();

    with(end) {
        setDate(now.getDate()+1);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setMilliseconds(0);
    }

    var result = end-now;

    if(result == 0){
        const savedChall = document.querySelector("#challenge .todo-li");
        localStorage.removeItem('challenge'); 
        savedChall.parentNode.innerHTML = ''
    }
}

setInterval(afterDateChall,40);


//////////////////////챌린지 끝


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

//-----------------------------------TODO 남은갯수-----------------------------------------//
function howManyleft(){
    let getList = JSON.parse(localStorage.getItem('todos'))

    let lastTodo =[] // 해당월에 남아있는 TODO 리스트의 총 개수
    const result = {};

    getList.forEach(function(list,k){
        if(list.checked)return;
        dateArr.forEach(function(m,n){
            if(list.day !== m.parentElement.className)return;
            lastTodo.push(list.day)
        })
    })

    lastTodo.forEach((x) => {   
        result[x] = (result[x] || 0)+1; 
    });

    let haveDay = Object.keys(result)
    let haveLeng = Object.values(result)
    // console.log(haveDay,haveLeng)

    dateArr.forEach(function(m,n){
        if (m.parentElement.children[1]){
        m.parentElement.children[1].remove()
        }
    })

    haveDay.forEach(function(day,k){
        dateArr.forEach(function(m,n){

            if(day !== m.parentElement.className)return;
            let nodeDiv = document.createElement('div');

            nodeDiv.className = "lastdiv"
            nodeDiv.innerHTML = haveLeng[k]
            m.parentElement.appendChild(nodeDiv)
            // console.log(m.parentElement,haveLeng[k])
        })
    })
}
howManyleft()
