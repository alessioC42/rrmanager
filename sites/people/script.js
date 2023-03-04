function insertAllPeople() {
    let table = document.getElementById("table");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            table.innerHTML += "<td><a href='/sites/people/singleuser/index.html?id="+e.id+"'>"+e.id+"</a></td><td>"+e.first_name+"</td><td>"+e.second_name+"</td><td>"+e.gender+"</td><td>"+getAge(e.date_of_birth)+"</td><td>"+e.date_of_birth+"</td><td>"+nts(e.team)+"</td><td>"+nts(e.family)+"</td><td>"+e.address+"</td><td><a href='mailto:"+e.email+"'>"+e.email+"</a></td><td>"+e.phone+"</td><td>"+e.phone2+"</td><td>"+e.active+"</td><td>"+e.function+"</td>"
        }
    });
    
    xhttp.open("GET", "/api/users");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

function nts(str) {
    if (str == null || str=="null"|| str=="None" || str=="") {
        return "-";
    } else
    {return str}
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

document.getElementById("searchbar").addEventListener("keyup", (_ev)=> {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("memberlist");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        td = tr[i];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
});

insertAllPeople();