let title, deadline;

window.onload = function(){
    getRenderData();
    document.querySelector('#addToDoButton').addEventListener('click', function(){
        title = document.querySelector('.title-input');
        deadline = document.querySelector('.date-input');
        isDateDataExist(deadline.value);
    })

    // 已完成待辦事項更新樣式
    document.querySelectorAll('.form-check-input').forEach(item => {
        item.addEventListener('change', function(){
            if(this.checked){
                let btn = this.parentNode.parentNode.querySelector('.edit-btn');
                btn.innerText = 'REMOVE';
                btn.setAttribute('class', 'remove-btn')
            }else{
                let btn = this.parentNode.parentNode.querySelector('.remove-btn');
                btn.innerText = 'EDIT';
                btn.setAttribute('class', 'edit-btn')
            }
            updateTodoStatus(item, this.checked);
        })
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
    render(today, dataArray);
}

function render(today, dataArray){
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

                // 該待辦事項是否已完成
                if(item.finished){
                    cloneToDoItem.querySelector('.form-check-input').setAttribute('checked', '');
                    cloneToDoItem.querySelector('.edit-btn').innerText = 'REMOVE';
                    cloneToDoItem.querySelector('.edit-btn').setAttribute('class', 'remove-btn');
                }
                toDoListWrap.append(cloneToDoItem);
            })
            toDoRow.append(cloneToDoWrap);

            // 判斷是否已過期
            let date = new Date(group.deadline);
            if(date<today){
                toDoRow.querySelector('.wrap').classList.add('expire-wrap');

                // disable checkbox
                toDoRow.querySelectorAll('.expire-wrap .form-check-input').forEach(item => {
                    item.setAttribute('disabled','');
                })
            }
        })
    }
}

function updateTodoStatus(todoItem, isChecked){
    let itemId = (todoItem.id).split('_');
    let itemDeadline = itemId[0];
    let itemTitle = itemId[1];

    let obj = JSON.parse(localStorage.getItem(itemDeadline));
    let todo = obj.list.find(x => x.title == itemTitle);

    if(isChecked){
        todo.finished = true;
    }else{
        todo.finished = false;
    }

    localStorage.setItem(itemDeadline, JSON.stringify(obj));
}