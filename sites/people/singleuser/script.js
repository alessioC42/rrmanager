const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function loadData() {
    let xhttp = new XMLHttpRequest()
    xhttp.addEventListener("load", ()=> {
        if (xhttp.responseText != String("")) {
            let data = (JSON.parse(xhttp.responseText));
            document.getElementById("id").value = data.id;
            document.getElementById("first_name").value = data.first_name;
            document.getElementById("second_name").value = data.second_name;
            document.getElementById("team").value = data.team;
            document.getElementById("gender").value = data.gender;
            document.getElementById("date_of_birth").value = data.date_of_birth;
            document.getElementById("address").value = data.address;
            document.getElementById("email").value = data.email;
            document.getElementById("phone").value = data.phone;
            document.getElementById("phone2").value = data.phone2;
            document.getElementById("leading").value = data.leading;
            document.getElementById("function").value = data.function;
        } else {
            document.getElementById("id").value = params.id;
        }
    });
    
    xhttp.open("GET", "/api/user/"+params.id);
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

function loadTeamNames() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let teamNames = JSON.parse(xhttp.responseText);
        let options = "<option value='null'>kein Team</option>";
        for (let i = 0; i < teamNames.length; i++) {
            const element = teamNames[i].teamname;
            options+="<option value='"+element+"'>"+element+"</option>"
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
    
    xhttp.open("POST", "/api/modifyuser/?data="+String(JSON.stringify({
        id: document.getElementById("id").value,
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
});

document.getElementById("delete_button").addEventListener("click", () => {
    if (confirm("Mitglied wirklich löschen?")) {
        let xhttp = new XMLHttpRequest()
        xhttp.addEventListener("load", ()=>{
            
            window.location.pathname = "/sites/people/index.html";
        });
        xhttp.open("DELETE", "/api/delmember/"+document.getElementById("id").value);
        xhttp.send();
    }
})

loadTeamNames()
loadData()