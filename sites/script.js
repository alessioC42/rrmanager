function loadDashboardData() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", ()=>{
        let response = JSON.parse(xhttp.responseText);
        let activememberpercent = (response.activemembercount / response.membercount) * 100;
        let inactivememberpercent = (response.inactivemembercount / response.membercount) * 100;
        let progressBarActive = document.getElementById("progressBarActive");
        let progressBarInactive = document.getElementById("progressBarInactive");
        let avgAgeNode = document.getElementById("avgAge");
        progressBarActive.style.width = activememberpercent+"%";
        progressBarActive.textContent = "Aktiv: "+Math.round(activememberpercent)+"%"
        progressBarInactive.style.width = inactivememberpercent+"%";
        progressBarInactive.textContent = "Inaktiv: "+Math.round(inactivememberpercent)+"%"
        avgAgeNode.textContent = Math.round(response.avgage);
    });
    xhttp.open("GET", "/api/stats");
    xhttp.send();
}
function initContactPersonSearch() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        const data = JSON.parse(xhttp.responseText);
        let searchbar = document.getElementById("contactpersonsearchbar");
        let searchbarbutton = document.getElementById("contactpersonsearchbutton");
        let label = document.getElementById("contactpersonlabel");
        let labelcontainer = document.getElementById("contactpersonlabelarea");
        labelcontainer.hidden = true;
        searchbarbutton.disabled = true;
        var currentmatch = 0;
        let fuse = new Fuse(data, {
            keys: ["first_name", "second_name"]
        });

        searchbar.addEventListener("keyup", (_ev)=>{
            let matches = fuse.search(searchbar.value);
            if (matches.length >= 1) {
                labelcontainer.hidden = false;
                searchbarbutton.disabled = false;
                label.textContent = matches[0].item.first_name+" "+matches[0].item.second_name;
                currentmatch = matches[0].item.id;
            } else {
                currentmatch = 0;
                labelcontainer.hidden = true;
                label.textContent = "";
                searchbarbutton.disabled = true;
            }

        });

        searchbarbutton.addEventListener("click", (_ev) => {
            if (currentmatch != 0) {
                fetch("/api/contactperson?id="+currentmatch)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    document.getElementById("disabledNameLabelInput").value = label.textContent;
                    document.getElementById("disabledAddressLabelInput").value = data.person.address;
                    document.getElementById("disabledEmailLabelInput").value = data.person.email;
                    document.getElementById("emailButtonPerson").addEventListener("click", (_ev) => {window.location.href="mailto:"+data.person.email});
                    document.getElementById("disabledTelLabelInput").value = data.person.phone;
                    document.getElementById("telButtonPerson").addEventListener("click", (_ev) => {window.location.href="tel:"+data.person.phone});
                    document.getElementById("disabledTel2LabelInput").value = data.person.phone2;
                    document.getElementById("tel2ButtonPerson").addEventListener("click", (_ev) => {window.location.href="tel:"+data.person.phone2});
                    if (data.family) {
                        document.getElementById("card_contactperson").hidden = false;
                        document.getElementById("contactpersonFirstName").value = data.family.parent_first_name;
                        document.getElementById("contactpersonSecondName").value = data.family.parent_last_name;
                        document.getElementById("contactpersonGender").value = data.family.parent_gender;
                        document.getElementById("contactpersonAddress").value = data.family.parent_address;
                        document.getElementById("contactpersonEmail").value = data.family.parent_email;
                        document.getElementById("contactpersonEmailButton").addEventListener("click", (_ev) => {window.location.href="mailto:"+data.family.parent_email});
                        document.getElementById("contactpersonTel").value = data.family.parent_phone;
                        document.getElementById("contactpersonTelButton").addEventListener("click", (_ev) => {window.location.href="tel:"+data.family.parent_phone});
                        document.getElementById("contactpersonTel2").value = data.family.parent_phone2;
                        document.getElementById("contactpersonTel2Button").addEventListener("click", (_ev) => {window.location.href="tel:"+data.family.parent_phone2});
                    } else {
                        document.getElementById("card_contactperson").hidden = true;
                    }
                });
            }
        });
    });
    xhttp.open("GET", "/api/members/smaallist");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}
loadDashboardData();
initContactPersonSearch();