let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function displayStudents() {
    let list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach((s, i) => {
        list.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.roll}</td>
                <td>${s.course}</td>
                <td>${s.email}</td>
                <td>
                    <button onclick="editStudent(${i})">Edit</button>
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>`;
    });
}

document.getElementById("studentForm").onsubmit = function(e) {
    e.preventDefault();

    let student = {
        name: document.getElementById("name").value,
        roll: document.getElementById("roll").value,
        course: document.getElementById("course").value,
        email: document.getElementById("email").value
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        document.getElementById("saveBtn").innerText = "Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));

    this.reset();
    displayStudents();
};

function editStudent(i) {
    document.getElementById("name").value = students[i].name;
    document.getElementById("roll").value = students[i].roll;
    document.getElementById("course").value = students[i].course;
    document.getElementById("email").value = students[i].email;

    editIndex = i;
    document.getElementById("saveBtn").innerText = "Update Student";
}

function deleteStudent(i) {
    students.splice(i, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

displayStudents();