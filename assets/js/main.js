const userStroys = new Map();
let id = 1;
function addUserStroy() {
    resetForm();
    userStroys.set(
        id++,{
        title: document.getElementById("title").value,
        type: document.querySelector('input[type="radio"]:checked').value,
        Priority: document.getElementById("Priority").value,
        Status: document.getElementById("Status").value,
        Date: document.getElementById("Date").value,
        Description: document.getElementById("Description").value,
    });
    userStroys.forEach(res =>{
        console.log(res.get(1));

   /* document.getElementById('to-do-tasks').innerHTML+=`
        <button class="d-flex userStoryCard w-100 alert-black rounded-1 mt-1 pb-2">
            <div class="col-1">
                <i class="bi bi-exclamation-octagon bx-xs text-red-700"></i>
            </div>
            <div class="col-11 text-start">
                <div class=""></div>
                    <div class="">
                        <div class="text-black-100">#Hi</div>
                        <div class="" title="While it is not always necessary, sometimes it might be beneficial to prepare a flowchart, a block diagram or some other kind of concept visualization that will render it easy for the developer to comprehend the task and its scope.">
                            While it is not always necessary, sometimes it might be...
                        </div>
                    </div>
                    <div class="mt-1">
                         <span class="bg-gradient-blue-purple rounded-2 p-1 text-white">High</span>
                         <span class="bg-black-100 rounded-2 p-1 text-white">Feature</span>
                    </div>
            </div>
        </button>
    `; */
    });
    document.getElementById('closePopup').click();
}

function resetForm(){
    document.getElementById('reset').click();
}