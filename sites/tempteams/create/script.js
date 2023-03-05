const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

function getMemberData(cb) {
    let xhttp = new XMLHttpRequest()
    xhttp.addEventListener("load", () => {
        let members = JSON.parse(xhttp.responseText);
        let r = [];
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            r.push({ value: member.id, text: member.first_name + " " + member.second_name })
        }
        cb(r);
    });
    
    xhttp.open("GET", "/api/members/smaallist/");
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
}

getMemberData((members) => {
    const tomselectList = document.getElementById("members");
    for (let i = 0; i < members.length; i++) {
        let member = members[i];
        let elem = document.createElement("option");
        elem.value = member.value;
        elem.textContent = member.text;
        tomselectList.appendChild(elem);

        if (i==members.length-1) {
            new TomSelect("#members", {
                plugins: {
                    remove_button:{
                        title:'Remove this item',
                    }
                }
            });
        }
    }
    
});

document.getElementById("submit").addEventListener("click", () => {
    let xhttp = new XMLHttpRequest();
    let memberlist = JSON.stringify(getChildIDData(document.getElementById("members")));
    xhttp.addEventListener("load", () => {
        
        window.location.pathname = "/sites/teams/index.html";
    }
    );
    
    xhttp.open("POST", "/api/tempteam/create?data=" + String(JSON.stringify({
        teamname: document.getElementById("teamname").value,
        event: document.getElementById("event").value,
        description: document.getElementById("description").value,
        members: memberlist
    })));
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
});



function getChildIDData(select) {
    var result = [];
    var options = select && select.options;
    var opt;
    for (var i = 0; i < options.length; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result.map(Number);
}

