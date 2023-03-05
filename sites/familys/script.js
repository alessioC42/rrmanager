function insertAllPeople() {
    const table = document.getElementById("table");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            const row = table.insertRow();
            const link = document.createElement("a");
            const linkText = document.createTextNode(e.family_name);
            link.appendChild(linkText);
            link.href = "/sites/familys/modify/index.html?id=" + encodeURIComponent(e.family_name);
            const cell1 = row.insertCell();
            cell1.appendChild(link);
            const cell2 = row.insertCell();
            cell2.textContent = e.parent_first_name;
            const cell3 = row.insertCell();
            cell3.textContent = e.parent_last_name;
            const cell4 = row.insertCell();
            cell4.textContent = e.parent_gender;
            const cell5 = row.insertCell();
            cell5.textContent = e.parent_address;
            const cell6 = row.insertCell();
            const emailLink = document.createElement("a");
            emailLink.href = "mailto:" + encodeURIComponent(e.parent_email);
            emailLink.textContent = e.parent_email;
            cell6.appendChild(emailLink);
            const cell7 = row.insertCell();
            cell7.textContent = e.parent_phone;
            const cell8 = row.insertCell();
            cell8.textContent = e.parent_phone2;
            const cell9 = row.insertCell();
            cell9.id = "family" + encodeURIComponent(e.family_name);
            createPeopleStringAndInsertAt((e.members), "family"+e.family_name);
        }
    });
    
    xhttp.open("GET", "/api/familys");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}


function createPeopleStringAndInsertAt(list, id) {
    for (let i = 0; i < list.length; i++) {
        const name = list[i];
        const link = document.createElement("a");
        link.href = "/sites/people/singleuser/index.html?id=" + encodeURIComponent(name.id);
        const text = document.createTextNode("[" + name.id + "] " + name.first_name + " " + name.second_name);
        link.appendChild(text);
        const br = document.createElement("br");
        document.getElementById(id).appendChild(link);
        document.getElementById(id).appendChild(br);
    }
}

insertAllPeople();