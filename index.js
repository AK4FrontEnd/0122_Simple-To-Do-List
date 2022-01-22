let title, deadline;

window.onload = function(){
    document.querySelector('#addToDoButton').addEventListener('click', function(){
        title = document.querySelector('.title-input');
        deadline = document.querySelector('.date-input');
        isDateDataExist(deadline.value);
    })
}

function isDateDataExist(deadlineDate){
    var obj = JSON.parse(localStorage.getItem(deadlineDate));
    if(obj == null){
        addToDoGroup(title.value, deadlineDate)
    }else{
        let item = {
            title: title.value,
            "finished": false
        }
        (obj.list).push(item);
        localStorage.setItem(deadlineDate, JSON.stringify(obj));

        title.value = '';
        deadline.value = '';
    }
}

function addToDoGroup(titleStr, deadlineDate){
    if(titleStr == '' || deadlineDate == ''){
        alert('請輸入標題與日期');
    }else{
        let obj = {
            "deadline": deadlineDate,
            "expired": false,
            "list":[
                {
                    "title": titleStr,
                    "finished": false
                }
            ]
        }
        localStorage.setItem(deadlineDate, JSON.stringify(obj));

        title.value = '';
        deadline.value = '';
    }
}