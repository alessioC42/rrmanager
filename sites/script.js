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
function insertMembersToAllUserLists() {
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        let response = JSON.parse(xhttp.responseText);
        const dataList = document.getElementById("datalist_members");
        for (let i = 0; i < response.length; i++) {
        const member = response[i];
        const option = document.createElement("option");
        option.value = member.first_name + " " + member.second_name;
        const textNode = document.createTextNode(option.value);
        option.appendChild(textNode);
        dataList.appendChild(option);
        }
    });
    xhttp.open("GET", "/api/members/smaallist");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}
loadDashboardData();
insertMembersToAllUserLists();