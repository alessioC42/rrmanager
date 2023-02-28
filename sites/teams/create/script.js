const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


document.getElementById("submit").addEventListener("click", ()=> {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        
        window.location.pathname = "/sites/teams/index.html";
    }
    );
    xhttp.open("POST", "/api/teams/create?data="+String(JSON.stringify({
        teamname: document.getElementById("teamname").value,
        leaderID1: document.getElementById("leaderID1").value,
        leaderID2: document.getElementById("leaderID2").value,
        leaderID3: document.getElementById("leaderID3").value,
        extra: document.getElementById("extra").value
    })));
    xhttp.send()
});
