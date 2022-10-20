// --------------------------- Main code ------------------------------------

const userStroys = new Set()
var id = 17;
let toDoCount = 0;
let inProgressCount = 0;
let doneCount = 0;

function onLoad(){
    for(let task of tasks){
        userStroys.add(task)
    }
    updateDataInHtml();
}
function save(idAModifier){
    let newData = formData(idAModifier)
    if(typeof idAModifier  == "undefined") {
        if (userStroys.add(newData)) {
            addUserStory(newData)
            onSuccess()
            setTimeout(closePopup, 2000)
        }
    }else {
             let elementAModifier = findById(idAModifier)
                if (userStroys.has(elementAModifier)) {
                    userStroys.delete(elementAModifier);
                    userStroys.add(newData);
                    updateDataInHtml();
                    $('#exampleModal').modal('hide');
                }
        }
}
function closePopup(){
    document.getElementById('closePopup').click();
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
    document.getElementById("alertAdd").innerHTML = ""
    $("#form").trigger( "reset" )
    document.getElementById("headerH5").innerText = "Add task"
    document.getElementById("0").innerText= "save"
    document.getElementById("0").setAttribute("onclick", "save()")
}

function addUserStory(userStory) {
        if(userStory.status === "to do"){
            toDoCount++;
            document.getElementById('to-do-tasks').innerHTML+=`
                 <button onclick="deleteUserStory(${userStory.id})" class="d-flex userStoryCard w-100 alert-black rounded-1 mt-1 pb-2">
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
                <button onclick="deleteUserStory(${userStory.id})"  class="d-flex userStoryCard w-100 alert-blue rounded-1 pb-2 mt-1">
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
                <button onclick="deleteUserStory(${userStory.id})"  class="d-flex userStoryCard w-100 alert-green rounded-1 pb-2 mt-1">
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
    for(let userStory of userStroys){
        addUserStory(userStory)
    }
}

function deleteUserStory(id){
    let userStorySelect = findById(id);
    let userStory = findById(id)

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
                    userStroys.delete(userStory)
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
            document.getElementById("0").innerText= "modifier"
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
    for(let data of userStroys){
        if(data.id === id)
            return data;
    }
}

function onSuccess(){
    document.getElementById("alertAdd")
        .innerHTML =`<div class="alert alert-success">
                            <strong>Success!</strong> user Story been added
                        </div>`
    /*
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    * */
}

function onError(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}