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

function insertAllTempTeams() {
    let table = document.getElementById("table_tempteams");
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", () => {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let a = document.createElement('a');
            a.href = '/sites/tempteams/overview/index.html?id=' + nts(e.id);
            a.textContent = nts(e.id);
            td1.appendChild(a);
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            td2.textContent = nts(e.teamname);
            tr.appendChild(td2);
            let td3 = document.createElement('td');
            td3.textContent = nts(e.event);
            tr.appendChild(td3);
            let memberElement = document.createElement('td');
            tr.appendChild(memberElement);

            for (let i = 0; i < e.members.length; i++) {
                const name = e.members[i];
                let link = document.createElement("a");
                link.textContent = "[" + name.id + "] " + name.first_name + " " + name.second_name;
                link.href = "/sites/people/singleuser/index.html?id=" + encodeURIComponent(name.id);
                memberElement.appendChild(link);
                memberElement.appendChild(document.createTextNode("; "));
            }


            let td5 = document.createElement('td');
            td5.textContent = nts(e.description);
            tr.appendChild(td5);
            table.appendChild(tr);
        }
    });
    

    xhttp.open("GET", "/api/tempteams/");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}



function nts(str) {
    if (str == null) {
        return ""
    } else { return str }
}

insertAllTeams();
insertAllTempTeams();