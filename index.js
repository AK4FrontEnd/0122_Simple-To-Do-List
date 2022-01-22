let title, deadline;

window.onload = function(){
    getRenderData();
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
        getRenderData();
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
        getRenderData();
    }
}

function getRenderData(){
    let dataArray = [];
    let today = new Date;
    let year = today.getFullYear();

    for(let month = 1; month <= 12; month++){
        for(let day = 1; day <= 31; day++){
            let key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            let obj = localStorage.getItem(key);

            if(obj != null){
                dataArray.push(JSON.parse(obj));
            }
        }
    }
    render(dataArray);
}

function render(dataArray){
    let toDoRow = document.querySelector('.todo-row');
    toDoRow.innerHTML = '';
    if(dataArray.length == 0){
        let div = document.createElement('div');
        div.setAttribute('class', 'empty');
        div.innerText = "目前沒有任何待辦事項";
        toDoRow.append(div);
    }else{
        dataArray.forEach(group => {
            let cloneToDoWrap = document.querySelector('#todo-wrap').content.cloneNode(true);
            let toDoListWrap = cloneToDoWrap.querySelector('.list-group');
            cloneToDoWrap.querySelector('.deadline').innerText = group.deadline;
            group.list.forEach((item, idx) => {
                let cloneToDoItem = document.querySelector('#todo-item').content.cloneNode(true);
                cloneToDoItem.querySelector('.form-check-label').innerText = item.title;
                cloneToDoItem.querySelector('.form-check-label').setAttribute('for', `${group.deadline}_${item.title}`);
                cloneToDoItem.querySelector('.form-check-input').setAttribute('id', `${group.deadline}_${item.title}`);

                toDoListWrap.append(cloneToDoItem);
            })
            toDoRow.append(cloneToDoWrap);
        })
    }
}