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
            document.getElementById("family").value = data.family;
            document.getElementById("gender").value = data.gender;
            document.getElementById("date_of_birth").value = data.date_of_birth;
            document.getElementById("address").value = data.address;
            document.getElementById("email").value = data.email;
            document.getElementById("phone").value = data.phone;
            document.getElementById("phone2").value = data.phone2;
            document.getElementById("active").value = data.active;
            document.getElementById("function").value = data.function;
            loadContactPersonData(data.family);
            document.getElementById("age_of_person_calculated").innerText = "Alter: "+getAge(document.getElementById("date_of_birth").value);
        } else {
            document.getElementById("id").value = params.id;
        }
    });
    
    xhttp.open("GET", "/api/user/?id="+params.id);
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

function loadContactPersonData(familyName) {
    if (familyName == "" || familyName == "null" ||familyName == "-" ||familyName == null){
        document.getElementById("contactperson").innerHTML = "<br><br><h3>Kontakt Person</h3><i>Es ist keine Familie Hinterlegt</i>";
    } else {
        let xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", ()=> {
            familyData = JSON.parse(xhttp.responseText);
            document.getElementById("parent_first_name").value=familyData.parent_first_name;
            document.getElementById("parent_second_name").value=familyData.parent_last_name;
            document.getElementById("parent_gender").value=familyData.parent_gender;
            document.getElementById("parent_address").value = familyData.parent_address;
            document.getElementById("parent_email").value = familyData.parent_email;
            document.getElementById("parent_phone").value = familyData.parent_phone;
            document.getElementById("parent_phone2").value = familyData.parent_phone2;
            document.getElementById("editcontact").addEventListener("click", (_ev) => {
                window.location.href="/sites/familys/modify/index.html?id="+familyName;
            });
        });
        xhttp.open("GET", "/api/family?id="+familyName);
        xhttp.send();
    }
}

function loadFamilyNames() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=> {
        let familyNames = JSON.parse(xhttp.responseText);
        document.getElementById("family").innerHTML += "<option value='null'>keine Familie</option>"+familyNames.map(x => "<option value="+x+">"+x+"</option>").join("");
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
    
    xhttp.open("POST", "/api/modifyuser/?data="+String(JSON.stringify({
        id: document.getElementById("id").value,
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

document.getElementById("delete_button").addEventListener("click", () => {
    if (confirm("Mitglied wirklich löschen?")) {
        let xhttp = new XMLHttpRequest()
        xhttp.addEventListener("load", ()=>{
            
            window.location.pathname = "/sites/people/index.html";
        });
        xhttp.open("DELETE", "/api/delmember/?id="+document.getElementById("id").value);
        xhttp.send();
    }
})

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
document.getElementById("mailbutton").addEventListener("click", ()=> {
    window.location.href = "mailto:"+document.getElementById("email").value;
});
document.getElementById("parent_mailbutton").addEventListener("click", ()=> {
    window.location.href = "mailto:"+document.getElementById("parent_email").value;
});


loadTeamNames();
loadFamilyNames();
loadData();