function insertAllTeams() {
    let table = document.getElementById("table_teams");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let teamLink = document.createElement("a");
            teamLink.href = '/sites/teams/overview/index.html?id=' + nts(e.teamname);
            teamLink.textContent = nts(e.teamname);

            let teamLinkCell = document.createElement("td");
            teamLinkCell.appendChild(teamLink);

            let leader1Cell = document.createElement("td");
            leader1Cell.textContent = nts(e.leaderID1);

            let leader2Cell = document.createElement("td");
            leader2Cell.textContent = nts(e.leaderID2);

            let leader3Cell = document.createElement("td");
            leader3Cell.textContent = nts(e.leaderID3);

            let memberCell = document.createElement("td");
            memberCell.id = nts(e.teamname) + "-Team";

            for (let i = 0; i < e.members.length; i++) {
                const name = e.members[i];
                let link = document.createElement("a");
                link.textContent = "[" + name.id + "] " + name.first_name + " " + name.second_name;
                link.href = "/sites/people/singleuser/index.html?id=" + encodeURIComponent(name.id);
                memberCell.appendChild(link);
                memberCell.appendChild(document.createTextNode("; "));
            }

            let extraCell = document.createElement("td");
            extraCell.textContent = nts(e.extra);

            let row = document.createElement("tr");
            row.appendChild(teamLinkCell);
            row.appendChild(leader1Cell);
            row.appendChild(leader2Cell);
            row.appendChild(leader3Cell);
            row.appendChild(memberCell);
            row.appendChild(extraCell);
            table.appendChild(row);
        }
    });

    xhttp.open("GET", "/api/teams");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

function memberstring(value) {
    let x = "";
    for (let i = 0; i < value.length; i++) {
        const member = value[i];
        x += "<a href='/sites/people/singleuser/index.html?id=" + member.id + "'>" + member.first_name + " " + member.second_name + "</a>; "
    }
    return x;
}

function nts(str) {
    if (str == null) {
        return ""
    } else { return str }
}

//insertAllTeams();
//insertAllTempTeams();


$('#tempteamtable').bootstrapTable()
$('#teamtable').bootstrapTable()
$('#tempteamtable').click((ev) => {
    try {
        let val = ev.target.parentElement.parentElement.firstChild.childNodes[1].innerText;
        if (!isNaN(val)) {
            if (!(val == "")) {
                window.open("/sites/tempteams/overview/index.html?id=" + val)
            }
        } else {
            throw Error("");
        }
    } catch (error) {
        try {
            let val = ev.target.parentElement.childNodes[0].innerText;
            if (!isNaN(val)) {
                window.open("/sites/tempteams/overview/index.html?id=" + val)
            }
        } catch (_err) { }
    }
});

$('#teamtable').click((ev) => {
    if (ev.target.hasAttribute("data-index") || ev.target.hasAttribute("colspan") || (ev.target.classList).contains("card-view-title") || (ev.target.classList).contains("card-view-value") || (ev.target.classList).contains("card-view") || (ev.target.classList).contains("card-views")) {
        console.log("nr1")
        val = ev.target.parentElement.parentElement.firstChild.childNodes[1].innerText;
        window.open("/sites/teams/overview/index.html?id=" + val)
    } else {
        if (!(ev.target.classList).contains("sortable")) {
            console.log("nr2")
            console.log(ev.target)
            let val = ev.target.parentElement.childNodes[0].innerText;
            window.open("/sites/teams/overview/index.html?id=" + val);
        }
    }
});