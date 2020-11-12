let button = document.querySelectorAll('button');
for( let i = 0; i < button.length; i++){
    button[i].classList.add('border' , 'm-1' , 'btn-light' , 'outline');
}

let parentList = document.querySelector('.mainList');
let addButton = document.querySelector('.add-button');
let inputData = document.querySelector('.input-data');
let wrapper = document.querySelectorAll('.wrapper-big');
let removeButton = document.querySelectorAll('.trashButton');
let clearAll = document.querySelector('.clearAll');
let checkwrapper = document.querySelector('.small-wrapper')
let number = document.querySelector('.count');
let count = document.querySelectorAll('.wrapper-big').length;

let boxList = [];
if(localStorage.getItem('taskStorage')){
    boxList = JSON.parse(localStorage.getItem('taskStorage'));
    showTasks();
    counter();  
    deletetask(); 
}

addButton.onclick = function taskManager(event){
    let newBox = {
        list: inputData.value,
        checked: false,
        important:false,
        status:false
    };
    if(inputData.value == ''){
        alert("Be creative!");
         return false
    }
    else{
        boxList.push(newBox);
        showTasks();
        localStorage.setItem('taskStorage' , JSON.stringify(boxList))
        counter();
        console.log(boxList)
        deletetask(); 
    }
  
};

function showTasks(){
    let setTask = '';
    boxList.forEach(function(item, i){
        setTask += `
            <div class="wrapper-big input-group mb-0" id='item_${i}'>
                <div class="wrapper input-group-prepend">
                    <div class="small-wrapper input-group-text" id='item_${i}'>
                        <input type="checkbox" class="list-input" aria-label="item_${i}" ${item.checked ? 'checked' : ''}>
                    </div>
                </div>
                <div class="new-task form-control" aria-label="item_${i}">${item.list}</div>
                <div id="item_${i}" class="border btn .bg-light trashButton">
                    <span class="oi oi-trash"></span>
                </div>
            </div>
            `;
    parentList.innerHTML = setTask;
    inputData.value = '';
    })

   
}
function deletetask(){
    localStorage.getItem('taskStorage')
    $('.trashButton').click(function() {
        let task = $(this).parent('.wrapper-big');
        let order = task.data('id');
            for(let i = 0; i < boxList.length; i++){
                if(boxList[i]=== order)
                boxList.splice(i,1)
            }
        task.remove();
        localStorage.setItem('taskStorage' , JSON.stringify(boxList))
       })
       
}

parentList.addEventListener('change', function(event){
    let checkboxID = event.target.getAttribute('aria-label');
    let checklable = parentList.querySelector('[aria-label=' + checkboxID +']');

    boxList.forEach(function(item){
        if(item.parentList === checklable){
            item.checked = !item.checked;
            localStorage.setItem('taskStorage' , JSON.stringify(boxList))
        }
    })
    console.log(checkboxID);
})

function counter(){
    let count = boxList.length
    number.innerHTML = count;
    localStorage.setItem("taskStorage",JSON.stringify(boxList))
    
}
 
clearAll.onclick = function removeTasks(){
    localStorage.clear();
    location.reload();
}
