const logo = document.querySelector(".logo");
const imgs = document.querySelectorAll(".buttons img");
const btns = document.querySelectorAll(".colorBtn")
const items = document.querySelector(".items");

function show(item, index){
    items.innerHTML +=
    `<li class="item">
        <img src="${item.image}" alt="item${index}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>`
}

function showItems(){
    fetch("https://raw.githubusercontent.com/JiyongInSpace/greenstudy/main/KJY/0802/data/data.json")
    .then(res => res.json())
    .then(data => callback(data, this.dataset.value, this.className));
    items.innerHTML = '';
    function callback(data, value, cn){
        if(cn === "logo"){
            data.items.forEach((item, index) => {
                show(item, index);
            })
        } else {
            data.items.forEach((item, index) => {
                if(item.type === value && item.color === value) show(item, index);
            })
        }
    }
}

logo.addEventListener("click", showItems);
btns.forEach((btn) =>{
    btn.addEventListener("click", showItems);
})
imgs.forEach((img) => {
    img.addEventListener("click", showItems);
})