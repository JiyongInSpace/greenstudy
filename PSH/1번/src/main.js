function init(){

    fetch('./data/data.json')
    .then( res => res.json() )
    .then( data => callback(data) );

    function callback(data){

        const elUl = document.querySelector('.items');
        let tagList = '';

        //MEMO json으로 li 호출 
        data.items.forEach(function(v,k){
            tagList += `
            <li class="item ${v.type} ${v.color}">
            <!-- TODO 클래스명에 타입과 색상 추가 -->
            <img src="${v.image}" alt="" class="item__thumbnail">
            <span class="item__description">${v.gender}, ${v.size}</span>
            </li>
            `;
        });
        elUl.innerHTML = tagList;

        //TODO 태그의 dataset.value 값을 이용해서 풀어보려 했으나... 
        //TODO 실패해서 태그 일일이 변수 잡아줬습니다ㅠ 
        const elLogo = document.querySelector('.logo');
        const elBtn = document.querySelectorAll('.btn');
        const elLi = document.querySelectorAll('.item');
        const elT = document.querySelectorAll('.tshirt');
        const elP = document.querySelectorAll('.pants');
        const elS = document.querySelectorAll('.skirt');
        const elB = document.querySelectorAll('.blue');
        const elY = document.querySelectorAll('.yellow');
        const elPi = document.querySelectorAll('.pink');

        //MEMO 함수생성 
        function show(e){
            for(let k=0; k<elLi.length; k++){
                elLi[k].style = 'display:none;';
            } //TODO 일단 옷 전부 삭제 
            for(let j=0; j<elT.length; j++){
                e[j].style = 'display:flex;';
            } //TODO 그 후 특정 클래스명을 가진 옷만 나오게 설정 
        }

        elLogo.addEventListener('click',function(){
            for(let k=0; k<elLi.length; k++){
                elLi[k].style = 'display:flex;';
            }
        }) //TODO 로고 클릭시 전체 옷 전부 뜨게 설정 

        elBtn[0].addEventListener('click',function(){
            show(elT); //MEMO 함수호출 
        });
        elBtn[1].addEventListener('click',function(){
            show(elP); //MEMO 함수호출 
        });
        elBtn[2].addEventListener('click',function(){
            show(elS); //MEMO 함수호출 
        });
        elBtn[3].addEventListener('click',function(){
            show(elB); //MEMO 함수호출 
        });
        elBtn[4].addEventListener('click',function(){
            show(elY); //MEMO 함수호출 
        });
        elBtn[5].addEventListener('click',function(){
            show(elPi); //MEMO 함수호출 
        });
        
    };

}
window.onload = init;