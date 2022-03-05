//  ---Selectors---
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.querySelector("#grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//  ---Edit Items---
let editElement;
let editFlag = false;
let editID = "";

//  ---Event Listeners---

//submit form
form.addEventListener("submit", addItem);

//clear items
clearBtn.addEventListener("click", clearItem);

//  ---Functions---

//add grocery item
function addItem(e) {
    e.preventDefault();
    const value = grocery.value
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        const element = document.createElement("article");
        
        //add class to element
        element.classList.add('grocery-item');
        
        //add id & grocery item
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = ` <p class="title">${value}</p>
                                <div class="btn-container">
                                    <button type="button" class="edit-btn">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button type="button" class="delete-btn">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </div>`;
        
        //edit&delete selectors
        const deleteBtn = element.querySelector(".delete-btn")
        const editBtn = element.querySelector(".edit-btn")
        
        //edit&delete listeners
        deleteBtn.addEventListener("click", deleteItem);
        editBtn.addEventListener("click", editItem);

        //append 'article' as a child of list
        list.appendChild(element);
        
        //display alert
        displayAlert("item added to the list", "success")
        
        //show container
        container.classList.add("show-container");

        //calling set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        
        
        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger")
    }
}

//display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}

//clear grocery list
function clearItem() {
    const items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        items.forEach(function(item){
            list.removeChild(item);
        }); 
    }
    container.classList.remove("show-container");
    displayAlert("cleared grocery list", "danger");
    setBackToDefault();
}

//delete item
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    //if no grocery items, hide container
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("Item Removed", "danger");
    setBackToDefault();
}

//edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;

    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    //set edit flag
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Edit";
}

//set back to default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Submit";
}

