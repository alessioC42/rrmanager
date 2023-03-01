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

function loadData() {
    getMemberData((members) => {
        let inputStr = ""
        for (let i = 0; i < members.length; i++) {
            let member = members[i];
            inputStr += "<option value='" + member.value + "'>" +member.text+ "</option>"
            if (i==members.length-1) {
                document.getElementById("childs").innerHTML = inputStr;
                new TomSelect("#childs", {
                    plugins: {
                        remove_button: {
                            title: 'Mitglied entfernen',
                        }
                    }
                });
            }
        }
    });
}

document.getElementById("submit").addEventListener("click", ()=> {
    let xhttp = new XMLHttpRequest();
    let childlist = JSON.stringify(getChildIDData(document.getElementById("childs")));
    xhttp.addEventListener("load", () => {
        window.location.pathname = "/sites/familys/index.html";
    }
    );
    
    xhttp.open("POST", "/api/family/new/?data="+String(JSON.stringify({
        family_name: document.getElementById("family_name").value,
        parent_first_name: document.getElementById("parent_first_name").value,
        parent_last_name: document.getElementById("parent_last_name").value,
        parent_gender: document.getElementById("parent_gender").value,
        parent_address: document.getElementById("parent_address").value,
        parent_email: document.getElementById("parent_email").value,
        parent_email: document.getElementById("parent_email").value,
        parent_phone: document.getElementById("parent_phone").value,
        parent_phone2: document.getElementById("parent_phone2").value,
        childs: childlist,
    })));
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
})

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


loadData()