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
    if (confirm("Team wirklich l??schen?")) {
        let xhttp = new XMLHttpRequest()
        xhttp.addEventListener("load", ()=>{
            
            window.location.pathname = "/sites/people/index.html";
        });
        xhttp.open("DELETE", "/api/teams/delete/?teamname="+document.getElementById("teamname").value);
        xhttp.send();
    }
})

loadData()
