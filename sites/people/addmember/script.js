const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function loadTeamNames() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let teamNames = JSON.parse(xhttp.responseText);
        for (let i = 0; i < teamNames.length; i++) {
            const element = teamNames[i].teamname;
            const option = document.createElement('option');
            option.value = element;
            option.text = element;
            document.getElementById("team").appendChild(option);
        }
    });
    
    xhttp.open("GET", "/api/teamnames");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

function loadFamilyNames() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let familyNames = JSON.parse(xhttp.responseText);
        const familySelect = document.getElementById("family");

        let nullOption = document.createElement("option");
        nullOption.value="null";
        nullOption.textContent = "keine Familie";
        familySelect.appendChild(nullOption);

        for (let i = 0; i < familyNames.length; i++) {
            const familyname = familyNames[i];
            let newOption = document.createElement("option");
            newOption.value = familyname;
            newOption.textContent = familyname;
            familySelect.appendChild(newOption);
        }
        
    });
    
    xhttp.open("GET", "/api/familys?smaal=true");
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
        family: document.getElementById("family").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        phone2: document.getElementById("phone2").value,
        active: document.getElementById("active").value,
        function: document.getElementById("function").value
    })));
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send()
});

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
document.getElementById("date_of_birth").addEventListener("change", (_ev) => {
    document.getElementById("age_of_person_calculated").innerText = "Alter: "+getAge(document.getElementById("date_of_birth").value);
});

loadTeamNames();
loadFamilyNames();