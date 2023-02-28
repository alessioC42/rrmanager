function insertAllPeople() {
    let table = document.getElementById("table");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            table.innerHTML += "<td><a href='/sites/people/singleuser/index.html?id="+e.id+"'>"+e.id+"</a></td><td>"+e.first_name+"</td><td>"+e.second_name+"</td><td>"+e.gender+"</td><td>"+getAge(e.date_of_birth)+"<br>"+e.date_of_birth+"</td><td>"+e.team+"</td><td>"+e.address+"</td><td><a href='mailto:"+e.email+"'>"+e.email+"</a></td><td>"+e.phone+"</td><td>"+e.phone2+"</td><td>"+e.leading+"</td><td>"+e.function+"</td>"
        }
    });
    
    xhttp.open("GET", "/api/users");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

insertAllPeople();