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

loadDashboardData();