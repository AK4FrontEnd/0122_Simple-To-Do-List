let title, deadline;

window.onload = function(){
    document.querySelector('#addToDoButton').addEventListener('click', function(){
        title = document.querySelector('.title-input');
        deadline = document.querySelector('.date-input');
        postToDo(title.value, deadline.value);
    })
}

function postToDo(titleStr, deadlineDate){
    // 1. 防呆：判斷是否有資料未填寫
    if(titleStr == '' || deadlineDate == ''){
        alert('請輸入標題與日期');
    }else{
        // 2. 將輸入的待辦名稱與日期資料存成事先設計好的資料結構
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
        // 3. 存進 Local Storage
        localStorage.setItem(deadlineDate, JSON.stringify(obj));
        // 4. 清空 input 資料
        title.value = '';
        deadline.value = '';
    }
}