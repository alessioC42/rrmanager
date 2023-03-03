const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function loadData() {
    let xhttp = new XMLHttpRequest()
    xhttp.addEventListener("load", ()=> {
        let data = (JSON.parse(xhttp.responseText))[0];
        document.getElementById("teamname").value = data.teamname;
        document.getElementById("leaderID1").value = data.leaderID1;
        document.getElementById("leaderID2").value = data.leaderID2;
        document.getElementById("leaderID3").value = data.leaderID3;
        document.getElementById("extra").value = data.extra;
        createPeopleStringAndInsertAt(data.members, "memberlist");
    });
    
    xhttp.open("GET", "/api/teams/info?id="+params.id);
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


document.getElementById("submit").addEventListener("click", ()=> {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        
        window.location.pathname = "/sites/teams/index.html";
    }
    );
    xhttp.open("POST", "/api/teams/update?data="+String(JSON.stringify({
        teamname: document.getElementById("teamname").value,
        leaderID1: document.getElementById("leaderID1").value,
        leaderID2: document.getElementById("leaderID2").value,
        leaderID3: document.getElementById("leaderID3").value,
        extra: document.getElementById("extra").value
    })));
    xhttp.send()
});

document.getElementById("delete_button").addEventListener("click", () => {
    if (confirm("Team wirklich löschen?")) {
        let xhttp = new XMLHttpRequest()
        xhttp.addEventListener("load", ()=>{
            
            window.location.pathname = "/sites/people/index.html";
        });
        xhttp.open("DELETE", "/api/teams/delete/?teamname="+document.getElementById("teamname").value);
        xhttp.send();
    }
})

loadData()
