function insertAllTeams() {
    let table = document.getElementById("table_teams");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            table.innerHTML += "<td><a href='/sites/teams/overview/index.html?id="+nts(e.teamname)+"'>"+nts(e.teamname)+"</a></td><td>"+nts(e.leaderID1)+"</td><td>"+nts(e.leaderID2)+"</td><td>"+nts(e.leaderID3)+"</td><td id='"+nts(e.teamname)+"-Team'></td><td>"+nts(e.extra)+"</td>";
            createPeopleStringAndInsertAt(e.members, e.teamname+"-Team")
        }
    });

    xhttp.open("GET", "/api/teams");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

function insertAllTempTeams() {
    let table = document.getElementById("table_tempteams");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            table.innerHTML += "<td><a href='/sites/tempteams/overview/index.html?id="+nts(e.id)+"'>"+nts(e.id)+"</a></td><td>"+nts(e.teamname)+"</td><td>"+nts(e.event)+"</td><td id='"+nts(e.id)+"-TempTeam'></td><td>"+nts(e.description)+"</td>";
            createPeopleStringAndInsertAt(e.members, e.id+"-TempTeam");
        }
    });

    xhttp.open("GET", "/api/tempteams/");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}


function createPeopleStringAndInsertAt(list, id) {
    let str = "";
    for (let i = 0; i < list.length; i++) {
        const name = list[i];
        str += "<a href='/sites/people/singleuser/index.html?id="+name.id+"'>["+name.id+"] "+name.first_name+" "+name.second_name+"</a>; ";
        if (i == list.length-1) {
            str = str.slice(0, -2);
            document.getElementById(id).innerHTML = str;
        }
    }
}

function nts(str) {
    if (str == null) {
        return ""
    } else {return str}
}

insertAllTeams();
insertAllTempTeams();