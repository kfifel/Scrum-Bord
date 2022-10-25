// --------------------------- Main code ------------------------------------
const userStroys = new Map()
var id = 0;
let toDoCount = 0;
let inProgressCount = 0;
let doneCount = 0;

    for(let task of tasks){
        userStroys.set(++id,task)
    }
    updateDataInHtml();

function save(idAModifier){
    let newData = formData(idAModifier)
    if(typeof idAModifier  == "undefined") {
        if (userStroys.set(newData.id, newData)) {
            addUserStory(newData)
            document.getElementById('closePopup').click()
            onSuccess()
        }
    }else {
                if (userStroys.has(idAModifier)) {
                    userStroys.set(idAModifier, newData)
                    updateDataInHtml();
                    $('#exampleModal').modal('hide');
                }else{
                    onError();
                }
        }
}

function formData(idAModifier) {

    if(typeof idAModifier  == "undefined") {
        return {
            id: ++id,
            title: document.getElementById("title").value,
            type: document.querySelector('input[type="radio"]:checked').value,
            priority: document.getElementById("Priority").value,
            status: document.getElementById("Status").value,
            date: document.getElementById("Date").value,
            description: document.getElementById("Description").value
        }
    }else{
        return {
            id: idAModifier,
            title: document.getElementById("title").value,
            type: document.querySelector('input[type="radio"]:checked').value,
            priority: document.getElementById("Priority").value,
            status: document.getElementById("Status").value,
            date: document.getElementById("Date").value,
            description: document.getElementById("Description").value
        }
    }
}

function resetForm(){
    $("#form").trigger( "reset" )
    document.getElementById("headerH5").innerText = "Add task"
    document.getElementById("0").innerText= "save"
    document.getElementById("0").setAttribute("onclick", "save()")
}

function addUserStory(userStory) {
        if(userStory.status === "to do"){
            toDoCount++;
            document.getElementById('to-do-tasks').innerHTML+=`
                 <button id="${userStory.id} " onclick="editUserStory(${userStory.id})" class="d-flex userStoryCard w-100 alert-black rounded-1 mt-1 pb-2" draggable="true">
                     <div class="col-1">
                         <i class="bi bi-exclamation-octagon bx-xs text-red-700"></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-black-100">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${ (userStory.description).length > 80 ?  userStory.description.substring(0, 80)+'...' : userStory.description }
                                 </div>
                             </div>
                             <div class="mt-1">
                                  <span class="bg-gradient-blue-purple rounded-2 p-1 text-white">${userStory.priority}</span>
                                  <span class="bg-black-100 rounded-2 p-1 text-white">${userStory.type}</span>
                             </div>
                     </div>
                 </button>
            `;
        }
        else if(userStory.status === "in progress"){
            inProgressCount++;
            document.getElementById('in-progress-tasks').innerHTML+=`
                <button id="${userStory.id}" onclick="editUserStory(${userStory.id})"  class="d-flex userStoryCard w-100 alert-blue rounded-1 pb-2 mt-1" draggable="true">
                     <div class="col-1">
                         <i class="fa fa-spinner fa-spin\t bx-xs text-primary mt-3 "></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-muted">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${ (userStory.description).length > 80 ?  userStory.description.substring(0, 80)+'...' : userStory.description }
                                 </div>
                             </div>
                             <div class="mt-1">
                                  <span class="bg-gradient-blue-purple rounded-2 p-1 text-white">${userStory.priority}</span>
                                  <span class="bg-black-100 rounded-2 p-1 text-white">${userStory.type}</span>
                             </div>
                     </div>
                 </button>
            `;

        }else{
            doneCount++;
            document.getElementById('done-tasks').innerHTML+=`
                <button id="${userStory.id}" onclick="editUserStory(${userStory.id})"  class="d-flex userStoryCard w-100 alert-green rounded-1 pb-2 mt-1" draggable="true">
                     <div class="col-1">
                         <i class="bx bx-check-circle bx-sm text-green mt-3"></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-muted">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${ (userStory.description).length > 80 ?  userStory.description.substring(0, 80)+'...' : userStory.description }
                                 </div>
                             </div>
                             <div class="mt-1">
                                  <span class="bg-gradient-blue-purple rounded-2 p-1 text-white">${userStory.priority}</span>
                                  <span class="bg-black-100 rounded-2 p-1 text-white">${userStory.type}</span>
                             </div>
                     </div>
                 </button>
            `;
    }

    document.getElementById('to-do-tasks-count').innerText = toDoCount;
    document.getElementById('in-progress-tasks-count').innerText = inProgressCount;
    document.getElementById('done-tasks-count').innerText = doneCount;
}

function updateDataInHtml(){
    document.getElementById('to-do-tasks').innerHTML = "";
    document.getElementById('in-progress-tasks').innerHTML = "";
    document.getElementById('done-tasks').innerHTML = "";

    toDoCount = 0;
    inProgressCount = 0;
    doneCount = 0;
    for(let [key ,userStory] of userStroys){
            addUserStory(userStory)
    }
}

function editUserStory(id){
    let userStorySelect = findById(id);

    Swal.fire({
        title: 'Chose an action?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#d33',
        denyButtonColor: '#38c00b',
        cancelButtonColor: '#3085d6',
        denyButtonText: `Modify`,
        confirmButtonText: 'delete!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#38c00b',
                confirmButtonText: 'delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    userStroys.delete(id)
                    updateDataInHtml()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        } else if (result.isDenied) {

                document.getElementById("headerH5").innerText = 'Update task'
                document.getElementById("0").innerText= "Update"

                //det date selected
                document.getElementById("title").value = userStorySelect.title
                if(userStorySelect.type === 'Bug')
                    document.getElementById('typeBug').checked = true;
                else
                document.getElementById('typeFeature').checked = true;
                document.getElementById("Priority").value = userStorySelect.priority
                document.getElementById("Status").value= userStorySelect.status
                document.getElementById("Date").value= userStorySelect.date
                document.getElementById("Description").value= userStorySelect.description


                document.getElementById("0").setAttribute("onclick", "save("+userStorySelect.id+")")
                $('#exampleModal').modal('show');

            }

    })
}

function findById(id){
    for(let [key ,userStory] of userStroys){
        if(key === id)
            return userStory;
    }
}

function onSuccess(){
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'Your task has been saved',
      showConfirmButton: false,
      timer: 1500
    })
}

function onError(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}

function closePopup(){
    $('#exampleModal').modal('hide');
}


// drage and drop functions
function onDragStart(e){
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text', e.target.getAttribute("id"))
}
function onDragOver(e){
    return false
}
function dropToDo(e){
    ob = parseInt(e.dataTransfer.getData("text"))
    let data = findById(ob)
    data.status = "to do"
    userStroys.set(ob, data)
    updateDataInHtml()
    e.stopPropagation()
}
function dropInProgress(e){
    ob = parseInt(e.dataTransfer.getData("text"))
    let data = findById(ob)
    data.status = 'in progress'
    userStroys.set(ob, data)
    updateDataInHtml()
    e.stopPropagation()
}
function dropDone(e){
    ob = parseInt(e.dataTransfer.getData("text"))
    let data = findById(ob)
    data.status = "done"
    userStroys.set(ob, data)
    updateDataInHtml()
    e.stopPropagation()
}
function onDragLeave(e){

}
