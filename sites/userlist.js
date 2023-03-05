function insertMembersToAllUserLists() {
    let inputs = document.getElementsByClassName("members_input");
    if (inputs.length >= 1) {
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
}

insertMembersToAllUserLists();

