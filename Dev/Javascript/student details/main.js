// Create the main structure of the application using JavaScript

// Create and append the main heading
const mainHeading = document.createElement('h1');
mainHeading.textContent = 'Student Details';
mainHeading.style.textAlign = 'center';
mainHeading.style.fontFamily = 'Arial, sans-serif';
mainHeading.style.color = '#333';
document.body.appendChild(mainHeading);

// Create and append the form container
const formContainer = document.createElement('div');
formContainer.style.margin = '20px auto';
formContainer.style.width = '400px';
formContainer.style.padding = '30px';
formContainer.style.border = '1px solid #ddd';
formContainer.style.borderRadius = '10px';
formContainer.style.backgroundColor = '#f4f7f8';
formContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

const form = document.createElement('form');
form.id = 'studentForm';

// Add some global styling for form elements
const formElements = `
    #studentForm label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }
    #studentForm input[type="text"], #studentForm input[type="number"]  {
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
    #studentForm input[type="checkbox"] {
        margin-right: 10px;
    }
    #studentForm button {
        width: 100%;
        padding: 12px;
        background-color: #5cb85c;
        border: none;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    #studentForm button:hover {
        background-color: #4cae4c;
    }
    .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .checkbox-group label {
        display: flex;
        align-items: center;
        margin-bottom: 0;
    }
    #searchBar {
        width: 100%;
        padding: 8px;
        margin: 20px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = formElements;
document.head.appendChild(styleSheet);

// Hidden input for student ID
const studentIdInput = document.createElement('input');
studentIdInput.type = 'hidden';
studentIdInput.id = 'studentId';
form.appendChild(studentIdInput);

// Name input field
const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'name');
nameLabel.textContent = 'Name:';
form.appendChild(nameLabel);

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'name';
nameInput.required = true;
form.appendChild(nameInput);

// Roll Number input field
const rollNumberLabel = document.createElement('label');
rollNumberLabel.setAttribute('for', 'rollNumber');
rollNumberLabel.textContent = 'Roll Number:';
form.appendChild(rollNumberLabel);

const rollNumberInput = document.createElement('input');
rollNumberInput.type = 'number';
rollNumberInput.id = 'rollNumber';
rollNumberInput.required = true;
form.appendChild(rollNumberInput);

// Class input field
const classLabel = document.createElement('label');
classLabel.setAttribute('for', 'class');
classLabel.textContent = 'Class:';
form.appendChild(classLabel);

const classInput = document.createElement('input');
classInput.type = 'text';
classInput.id = 'class';
classInput.required = true;
form.appendChild(classInput);

// Subjects checkboxes
const subjectsLabel = document.createElement('label');
subjectsLabel.setAttribute('for', 'subjects');
subjectsLabel.textContent = 'Subjects:';
form.appendChild(subjectsLabel);

const subjectsContainer = document.createElement('div');
subjectsContainer.className = 'checkbox-group';

const subjects = ['Math', 'English', 'Science', 'History', 'Art'];
subjects.forEach(subject => {
    const subjectLabel = document.createElement('label');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = subject;
    checkbox.name = 'subjects';
    
    subjectLabel.appendChild(checkbox);
    subjectLabel.appendChild(document.createTextNode(subject));
    
    subjectsContainer.appendChild(subjectLabel);
});

form.appendChild(subjectsContainer);

// Submit button
const submitBtn = document.createElement('button');
submitBtn.type = 'submit';
submitBtn.id = 'submitBtn';
submitBtn.textContent = 'Add Student';
form.appendChild(submitBtn);

formContainer.appendChild(form);
document.body.appendChild(formContainer);

// Create and append the search bar
const searchBar = document.createElement('input');
searchBar.id = 'searchBar';
searchBar.type = 'text';
searchBar.placeholder = 'Search by name or class...';
searchBar.addEventListener('input', filterTable);
document.body.insertBefore(searchBar, formContainer.nextSibling);

// Create and append the student list heading
const listHeading = document.createElement('h2');
listHeading.textContent = 'Student List';
listHeading.style.textAlign = 'center';
listHeading.style.fontFamily = 'Arial, sans-serif';
listHeading.style.color = '#333';
document.body.appendChild(listHeading);

// Create and append the table container
const tableContainer = document.createElement('div');
tableContainer.style.width = '80%';
tableContainer.style.margin = '20px auto';

const table = document.createElement('table');
table.style.width = '100%';
table.style.borderCollapse = 'collapse';
table.style.fontFamily = 'Arial, sans-serif';
table.style.color = '#333';

const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
tbody.id = 'studentTableBody';

const headerRow = document.createElement('tr');
['ID', 'Name', 'Roll Number', 'Class', 'Subjects', 'Actions'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    th.style.border = '1px solid #ddd';
    th.style.padding = '12px';
    th.style.backgroundColor = '#f2f2f2';
    th.style.textAlign = 'left';
    headerRow.appendChild(th);
});

thead.appendChild(headerRow);
table.appendChild(thead);
table.appendChild(tbody);
tableContainer.appendChild(table);
document.body.appendChild(tableContainer);

// JavaScript logic for handling CRUD operations

let students = [
    { id: 1, name: 'Muhammad Farhan', rollNumber: 101, class: '12th', subjects: ['Math', 'Science'] },
    { id: 2, name: 'Talha Saeedi', rollNumber: 102, class: '11th', subjects: ['English', 'History'] },
    { id: 3, name: 'Zubair Sheikh', rollNumber: 103, class: '12th', subjects: ['Art', 'Math'] }
];
let currentId = students.length;

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const classValue = document.getElementById('class').value;
    const subjects = Array.from(document.querySelectorAll('input[name="subjects"]:checked')).map(checkbox => checkbox.value);
    
    if (studentId) {
        updateStudent(parseInt(studentId), name, rollNumber, classValue, subjects);
    } else {
        addStudent(name, rollNumber, classValue, subjects);
    }

    resetForm();
    renderTable();
});

function addStudent(name, rollNumber, classValue, subjects) {
    students.push({ id: ++currentId, name, rollNumber, class: classValue, subjects });
}

function updateStudent(id, name, rollNumber, classValue, subjects) {
    const student = students.find(student => student.id === id);
    if (student) {
        student.name = name;
        student.rollNumber = rollNumber;
        student.class = classValue;
        student.subjects = subjects;
    }
}

function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    renderTable();
}

function editStudent(id) {
    const student = students.find(student => student.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('rollNumber').value = student.rollNumber;
        document.getElementById('class').value = student.class;
        document.querySelectorAll('input[name="subjects"]').forEach(checkbox => {
            checkbox.checked = student.subjects.includes(checkbox.value);
        });
        submitBtn.textContent = 'Update Student';
    }
}

function resetForm
() {
    studentIdInput.value = '';
    nameInput.value = '';
    rollNumberInput.value = '';
    classInput.value = '';
    document.querySelectorAll('input[name="subjects"]').forEach(checkbox => {
    checkbox.checked = false;
    });
    submitBtn.textContent = 'Add Student';
    }
    
    function renderTable() {
    tbody.innerHTML = '';
    students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${student.id}</td>
    <td style="border: 1px solid #ddd; padding: 12px;">${student.name}</td>
    <td style="border: 1px solid #ddd; padding: 12px;">${student.rollNumber}</td>
    <td style="border: 1px solid #ddd; padding: 12px;">${student.class}</td>
    <td style="border: 1px solid #ddd; padding: 12px;">${student.subjects.join(', ')}</td>
    <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">
        <button onclick="editStudent(${student.id})" style="margin-right: 5px; padding: 5px 10px; background-color: #5bc0de; color: white; border: none; border-radius: 3px; cursor: pointer;">Edit</button>
        <button onclick="deleteStudent(${student.id})" style="padding: 5px 10px; background-color: #d9534f; color: white; border: none; border-radius: 3px; cursor: pointer;">Delete</button>
    </td>
`;

tbody.appendChild(row);
});
    }
    function filterTable() {
        const query = searchBar.value.toLowerCase();
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(query));
        row.style.display = match ? '' : 'none';
        });
        }
        
        renderTable();
