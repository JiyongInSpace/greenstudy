function solution2(arr){
    var answer = 0;
    arr.forEach(item => answer += item);
    answer /= arr.length;
    return answer;
};


function solution(new_id) {
    var answer = new_id
    answer = answer.toLowerCase()
                .replace(/[\{\}\[\]\/?,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/g, "")
                // .replace(/[^\w-.]/g, "")
                .replace(/[.]{1,}/g, ".")
                .replace(/^[.]/, "").replace(/[.]$/, "");
                // .replace(/^\.|\.$/, "")
    if(answer === "") answer = "a";
    answer = answer.substring(0,15);
    if(answer.charAt(14) === ".") answer = answer.replace(/[.]$/, "");
    for(let i=answer.length; i<3 ;i++){
        answer += answer.charAt(answer.length-1);
    }
    return answer;
}

// console.log(solution("...!@BaT#*..y.abcdefghijklm"));
// console.log(solution("z-+.^."));
// console.log(solution("=.="));
// console.log(solution("123_.def"));
// console.log(solution("abcdefghijklmn.p"));
