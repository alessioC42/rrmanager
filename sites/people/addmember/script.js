const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function loadTeamNames() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let teamNames = JSON.parse(xhttp.responseText);
        let options = "";
        for (let i = 0; i < teamNames.length; i++) {
            const element = teamNames[i].teamname;
            options+="<option value="+element+">"+element+"</option>"
        }
        document.getElementById("team").innerHTML = options;
    });
    
    xhttp.open("GET", "/api/teamnames");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

document.getElementById("submit").addEventListener("click", ()=> {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        
        window.location.pathname = "/sites/people/index.html";
    }
    );
    
    xhttp.open("POST", "/api/addmember/?data="+String(JSON.stringify({
        first_name: document.getElementById("first_name").value,
        second_name: document.getElementById("second_name").value,
        gender: document.getElementById("gender").value,
        date_of_birth: document.getElementById("date_of_birth").value,
        team: document.getElementById("team").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        phone2: document.getElementById("phone2").value,
        leading: document.getElementById("leading").value,
        function: document.getElementById("function").value
    })));
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send()
})

loadTeamNames()
