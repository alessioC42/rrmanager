function overWriteTable(data) {
    let table = document.getElementById("table");
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        var e;
        if (data[i].item) {
            e = data[i].item;
        } else {
            e = data[i];
        }
        
        let row = table.insertRow(-1);

        let idCell = row.insertCell(0);
        let idLink = document.createElement("a");
        idLink.href = "/sites/people/singleuser/index.html?id=" + encodeURIComponent(e.id);
        idLink.textContent = e.id;
        idCell.appendChild(idLink);

        let firstNameCell = row.insertCell(1);
        firstNameCell.textContent = e.first_name;

        let secondNameCell = row.insertCell(2);
        secondNameCell.textContent = e.second_name;

        let genderCell = row.insertCell(3);
        genderCell.textContent = e.gender;

        let ageCell = row.insertCell(4);
        ageCell.textContent = getAge(e.date_of_birth);

        let dobCell = row.insertCell(5);
        dobCell.textContent = e.date_of_birth;

        let teamCell = row.insertCell(6);
        let team = nts(e.team);
        if (team == "-") {
            teamCell.textContent = "-";
        } else {
            let teamLink = document.createElement("a");
            teamLink.href = "/sites/teams/overview/index.html?id=" + encodeURIComponent(team);
            teamLink.textContent = team;
            teamCell.appendChild(teamLink);
        }

        let familyCell = row.insertCell(7);
        let family = nts(e.family);
        if (family == "-") {
            familyCell.textContent = "-";
        } else {
            let familyLink = document.createElement("a");
            familyLink.href = "/sites/familys/modify/index.html?id=" + encodeURIComponent(family);
            familyLink.textContent = family;
            familyCell.appendChild(familyLink);
        }

        let addressCell = row.insertCell(8);
        addressCell.textContent = e.address;

        let emailCell = row.insertCell(9);
        let emailLink = document.createElement("a");
        emailLink.href = "mailto:" + e.email;
        emailLink.textContent = e.email;
        emailCell.appendChild(emailLink);

        let phoneCell = row.insertCell(10);
        phoneCell.textContent = e.phone;

        let phone2Cell = row.insertCell(11);
        phone2Cell.textContent = e.phone2;

        let activeCell = row.insertCell(12);
        activeCell.textContent = e.active;

        let functionCell = row.insertCell(13);
        functionCell.textContent = e.function;
    }
}


function insertAllPeople() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        let data = JSON.parse(xhttp.responseText);
        overWriteTable(data);
        const fuse = new Fuse(data, {
            keys: [
                "id", "first_name", "second_name", "address", "email", "phone"
            ]
        });
        document.getElementById("searchbar").addEventListener("keyup", (_ev) => {
            let search = document.getElementById("searchbar").value;
            if (search.length > 1) {
                overWriteTable(fuse.search(search));
            } else {
                overWriteTable(data);
            }
        });
    });

    xhttp.open("GET", "/api/users");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

function nts(str) {
    if (str == null || str == "null" || str == "None" || str == "") {
        return "-";
    } else { return str }
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

insertAllPeople();