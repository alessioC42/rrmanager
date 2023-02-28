function insertMembersToAllUserLists() {
    let inputs = document.getElementsByClassName("members_input");
    if (inputs.length >= 1) {
        let xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", () => {
            let response = JSON.parse(xhttp.responseText);

            inputStr = "<option value='-'>";
            for (let i = 0; i < response.length; i++) {
                const member = response[i];
                inputStr+="<option value='"+member.first_name+" "+member.second_name+"'>";
            }
            document.getElementById("datalist_members").innerHTML = inputStr;
        });
        
        xhttp.open("GET", "/api/members/smaallist");
        xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
        xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
        xhttp.setRequestHeader("Pragma", "no-cache");
        xhttp.send();
    }
}

insertMembersToAllUserLists();

