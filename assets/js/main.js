// --------------------------- Main code ------------------------------------

const userStroys = new Set()
var id = 17;
function onLoad(){
    for(let task of tasks){
        userStroys.add(task)
    }
    updateDataInHtml();
}
function save(){
    let newData = formData()
    if(userStroys.add(newData)){
        addUserStory(newData)
    }
    onSuccess()
    setTimeout(closePopup, 3000)
}
function closePopup(){
    document.getElementById('closePopup').click();
}
function onSuccess(){
    document.getElementById("alertAdd")
        .innerHTML =`<div class="alert alert-success">
                            <strong>Success!</strong> user Story been added
                        </div>`
}
function formData() {
    return {
                id: ++id,
                title: document.getElementById("title").value,
                type: document.querySelector('input[type="radio"]:checked').value,
                priority: document.getElementById("Priority").value,
                status: document.getElementById("Status").value,
                date: document.getElementById("Date").value,
                description: document.getElementById("Description").value
            }

}

function resetForm(){
    document.getElementById("alertAdd").innerHTML = ""
    document.getElementById('reset').click();
}

function addUserStory(userStory) {
    if (userStory.status === "to do") {
        document.getElementById('to-do-tasks').innerHTML += `
                 <button class="d-flex userStoryCard w-100 alert-black rounded-1 mt-1 pb-2">
                     <div class="col-1">
                         <i class="bi bi-exclamation-octagon bx-xs text-red-700"></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-black-100">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${userStory.description.substring(0, 80)} ...
                                 </div>
                             </div>
                             <div class="mt-1">
                                  <span class="bg-gradient-blue-purple rounded-2 p-1 text-white">${userStory.priority}</span>
                                  <span class="bg-black-100 rounded-2 p-1 text-white">${userStory.type}</span>
                             </div>
                     </div>
                 </button>
            `;
    } else if (userStory.status === "in progress") {
        document.getElementById('in-progress-tasks').innerHTML += `
                <button class="d-flex userStoryCard w-100 alert-blue rounded-1 pb-2 mt-1">
                     <div class="col-1">
                         <i class="fa fa-spinner fa-spin\t bx-xs text-primary mt-3 "></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-muted">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${userStory.description.substring(0, 80)} ...
                                 </div>
                             </div>
                             <div class="mt-1">
                                  <span class="bg-gradient-blue-purple rounded-2 p-1 text-white">${userStory.priority}</span>
                                  <span class="bg-black-100 rounded-2 p-1 text-white">${userStory.type}</span>
                             </div>
                     </div>
                 </button>
            `;
    } else {
        document.getElementById('done-tasks').innerHTML += `
                <button onclick="deleteUserStory(${userStory.id})"  class="d-flex userStoryCard w-100 alert-green rounded-1 pb-2 mt-1">
                     <div class="col-1">
                         <i class="bx bx-check-circle bx-sm text-green mt-3"></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-muted">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${userStory.description.substring(0, 80)} ...
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
}

function updateDataInHtml(){
    let toDoCount = 0;
    let inProgressCount = 0;
    let doneCount = 0;

    document.getElementById('to-do-tasks').innerHTML = "";
    document.getElementById('in-progress-tasks').innerHTML = "";
    document.getElementById('done-tasks').innerHTML = "";
    for(let userStory of userStroys){
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
                                    ${userStory.description.substring(0, 80)} ...
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
                <button class="d-flex userStoryCard w-100 alert-blue rounded-1 pb-2 mt-1">
                     <div class="col-1">
                         <i class="fa fa-spinner fa-spin\t bx-xs text-primary mt-3 "></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-muted">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${userStory.description.substring(0, 80)} ...
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
                <button class="d-flex userStoryCard w-100 alert-green rounded-1 pb-2 mt-1">
                     <div class="col-1">
                         <i class="bx bx-check-circle bx-sm text-green mt-3"></i>
                     </div>
                     <div class="col-11 text-start">
                         <div class="">${userStory.title}</div>
                             <div class="">
                                 <div class="text-muted">#${userStory.id} created in ${userStory.date}</div>
                                 <div class="" title="${userStory.description}">
                                    ${userStory.description.substring(0, 80)} ...
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
    }
    document.getElementById("to-do-tasks-count").innerHTML = toDoCount;
    document.getElementById("in-progress-tasks-count").innerText = inProgressCount;
    document.getElementById("done-tasks-count").innerText = doneCount;
}

function deleteUserStory(id){
    let userStory = findById(id)
    userStroys.delete(userStory)
    updateDataInHtml()
}

function findById(id){
    for(let data of userStroys){
        if(data.id === id)
            return data;
    }
}