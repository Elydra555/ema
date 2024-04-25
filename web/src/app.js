const doc = {
    empBody: document.querySelector("#empBody"),
    addButton: document.querySelector("#addButton"),
    idInput: document.querySelector("#id"),
    nameInput: document.querySelector("#name"),
    cityInput: document.querySelector("#city"),
    salaryInput: document.querySelector("#salary")
}

const state = {
    url: 'http://localhost:8000/employees',
    name: 'névtelen',
    city: 'ismeretlen',
    salary: 300,
    add: true
}


doc.addButton.addEventListener('click', () => {
    // console.log('műkődik')
    getDataFromForm()
    createEmployee()
    deleteMessage()
    clearTableContent()
    getEmployees()
})

function startAdding(){
    deleteModalContent()
}

function getDataFromForm() {
    state.name = doc.nameInput.value
    state.city = doc.cityInput.value
    state.salary = doc.salaryInput.value
}

function createEmployee() {
    fetch(state.url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            name: state.name,
            city: state.city,
            salary: state.salary
        })
    })
}

function getEmployees() {
    fetch(state.url)
    .then( response => response.json())
    .then(result => {
        // console.log(result)
        clearTableContent()
        renderEmployees(result)
    })
}

function renderEmployees(employeeList) {
    
    employeeList.forEach(emp => {
        console.log(emp.salary)
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
            <td>
                <button 
                    class="btn btn-primary" 
                    data-id = "${emp.id}"
                    data-name = "${emp.name}"
                    data-city = "${emp.city}"
                    data-salary = "${emp.salary}"
                    onclick="startEdit(this)"
                    data-bs-toggle="modal" data-bs-target="#operatorModal">
                    Szerkesztés <svg fill="#ffffff" height="5%" width="5%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 162.577 162.577" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M159.059,1.283c-2.066-1.394-4.689-1.671-7.002-0.738L123.3,12.149C110.654,4.467,96.216,0.427,81.293,0.427 c-14.922,0-29.361,4.041-42.009,11.722L10.52,0.545C8.208-0.388,5.584-0.111,3.518,1.283C1.452,2.678,0.213,5.007,0.213,7.5v74.003 c0,44.705,36.372,81.074,81.079,81.074c44.703,0,81.071-36.37,81.071-81.074V7.5C162.364,5.007,161.126,2.678,159.059,1.283z M81.293,147.577c-22.751,0-42.854-11.558-54.745-29.109h11.625c3.313,0,6-2.687,6-6s-2.687-6-6-6H20.126 c-0.988-2.412-1.834-4.895-2.535-7.438h33.426c3.313,0,6-2.687,6-6s-2.687-6-6-6H15.462c-0.152-1.824-0.248-3.664-0.248-5.526 v-1.907h22.959c3.313,0,6-2.687,6-6c0-3.313-2.687-6-6-6H15.213V18.613l22.05,8.896c2.317,0.934,4.946,0.654,7.014-0.747 c10.941-7.416,23.741-11.335,37.015-11.335c13.274,0,26.073,3.919,37.012,11.335c2.067,1.402,4.698,1.682,7.015,0.747l22.044-8.895 v48.982h-22.959c-3.314,0-6,2.687-6,6c0,3.313,2.686,6,6,6h22.959v1.907c0,1.863-0.097,3.702-0.248,5.526h-35.552 c-3.313,0-6,2.687-6,6s2.687,6,6,6h33.423c-0.701,2.543-1.546,5.027-2.534,7.438h-18.047c-3.314,0-6,2.687-6,6s2.686,6,6,6h11.625 C124.141,136.019,104.042,147.577,81.293,147.577z"></path> <path d="M94.12,84.619H68.457c-1.104,0-2,0.896-2,2c0,8.176,6.655,14.828,14.836,14.828c8.176,0,14.827-6.652,14.827-14.828 C96.12,85.515,95.224,84.619,94.12,84.619z"></path> </g> </g></svg><i class="bi bi-pencil-square"></i>
                </button>
                <button
                    class="btn btn-danger"
                    onclick="startDelete(${emp.id})">
                    Törlés <svg fill="#ffffff" height="5%" width="5%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 379.777 379.777" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M366.314,97.749c-0.129-1.144-1.544-1.144-2.389-1.144c-6.758,0-37.499,4.942-62.82,13.081 c-1.638,0.527-2.923,0.783-3.928,0.783c-1.961,0-2.722-0.928-4.254-3.029c-1.848-2.533-4.379-6.001-11.174-8.914 c-2.804-1.202-6.057-1.812-9.667-1.812c-14.221,0-32.199,9.312-42.749,22.142c-0.066,0.08-0.103,0.096-0.107,0.096 c-0.913,0-4.089-3.564-9.577-17.062c-4.013-9.87-8.136-22.368-10.504-31.842c-3.553-14.212-13.878-34.195-20.71-47.417 c-2.915-5.642-5.218-10.098-5.797-11.836c-0.447-1.339-1.15-2.019-2.091-2.019c-0.604,0-1.184,0.3-1.773,0.917 c-6.658,6.983-20.269,65.253-19.417,83.132c0.699,14.682,12.291,24.61,17.861,29.381c0.659,0.564,1.363,1.167,1.911,1.67 c-2.964-1.06-9.171-6.137-17.406-12.873c-11.881-9.718-29.836-24.403-54.152-40.453c-34.064-22.484-55.885-44.77-68.922-58.084 C29.964,3.599,26.338,0,23.791,0c-0.605,0-1.707,0.227-2.278,1.75c-2.924,7.798,0.754,88.419,37.074,132.002 c20.279,24.335,46.136,36.829,63.246,45.097c9.859,4.764,17.647,8.527,18.851,12.058c0.273,0.803,0.203,1.573-0.223,2.425 c-1.619,3.238-4.439,7.193-8.011,12.202c-9.829,13.783-24.682,34.613-35.555,69.335c-4.886,15.601-55.963,70.253-69.247,83.537 c-0.648,0.648-15.847,15.917-14.06,20.229c0.142,0.344,0.613,1.143,1.908,1.143c3.176,0,11.554-5.442,24.902-16.195 c17.47-14.073,29.399-25.848,38.11-34.452c8.477-8.374,13.784-13.596,17.427-14.161c-0.333,1.784-1.385,6.367-4.576,17.926 c-0.077,0.279-0.238,0.938,0.127,1.418l0.355,0.576h0.495c0.001,0,0.002,0,0.003,0c0.773,0,1.172-0.618,4.53-4.786 c10.244-12.714,41.417-51.561,84.722-60.067c25.376-4.985,56.886-28.519,68.008-63.854c16.822-53.439,30.902-87.056,105.176-104.081 C366.502,99.413,366.428,98.751,366.314,97.749z"></path> </g></svg> <i class="bi bi-trash"></i>
                </button>
            </td>
        `
        doc.empBody.appendChild(row)
    });
    
}

function deleteModalContent(){
    doc.idInput.value = ''
    doc.nameInput.value = ''
    doc.cityInput.value = ''
    doc.salaryInput.value = ''
}

function deleteMessage(){
    alert('Sikeres mentés')
}

function clearTableContent(){
    doc.empBody.textContent = ''
}

function startDelete(id){
    console.log('törlendő:', id)
    deleteEmployee(id)
    getEmployees()
}

function deleteEmployee(id){
    let newUrl = state.url + '/' + id
    fetch(newUrl, {
        method: 'delete'
    })
}

function startEdit(source){
    console.log("Szerkesztés árnyékeljárás...")
    // console.log(source.dataset.salary)
    doc.idInput.value = source.dataset.id
    doc.nameInput.value = source.dataset.name
    doc.cityInput.value = source.dataset.city
    doc.salaryInput.value = source.dataset.salary
}


getEmployees()
