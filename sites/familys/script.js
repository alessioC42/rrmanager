function insertAllPeople() {
    let table = document.getElementById("table");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            table.innerHTML += "<td><a href='/sites/familys/modify/index.html?id="+e.family_name+"'>"+e.family_name+"</a></td><td>"+e.parent_first_name+"</td><td>"+e.parent_last_name+"</td><td>"+e.parent_gender+"</td><td>"+e.parent_address+"</td><td><a href='mailto:"+e.parent_email+"'>"+e.parent_email+"</a></td><td>"+e.parent_phone+"</td><td>"+e.parent_phone2+"</td><td id='family"+e.family_name+"'></td>";
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
    let str = "";
    for (let i = 0; i < list.length; i++) {
        const name = list[i];
        str += "<a href='/sites/people/singleuser/index.html?id="+name.id+"'>["+name.id+"] "+name.first_name+" "+name.second_name+"</a><br>";
        if (i == list.length-1) {
            str = str.slice(0, -2);
            document.getElementById(id).innerHTML = str;
        }
    }
}

insertAllPeople();