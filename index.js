const express = require("express");
const sqlite = require("sqlite3");
const app = express();
const port = 3000;

var db = new sqlite.Database(__dirname+"/database.db", (err) => {
if (err) {
    return console.error(err.message);
}
console.log('Connected to SQlite database.');
});
db.on("error", (err) => {
    console.error(err);
})

app.use('/favicon.ico', express.static(__dirname+'/favicon.ico'));

app.get("/", (_req, res) => {
    res.sendFile(__dirname+"/sites/index.html");
});

app.get("/sites/*", (req, res) => {
    res.sendFile(__dirname+req.path);
});

app.get("/api/users", (req, res) => {
    db.all("SELECT * FROM People;", (err, rows) => {
        if (err) {console.error(err);}
        res.send(rows);
    });
});

app.get("/api/user/*", (req, res) => {
    let id = Number(req.path.split("/").pop());
    if (isNaN(id) ==false) {
        db.all("SELECT * FROM People WHERE id="+id+";", (err, rows) => {
            if (err) {console.error(err);}
            res.send(rows[0]);
        });
    }   else {
        res.send(id+" is not a valid id")
    }
});

app.get("/api/members/smaallist/", (_req, res) => {
    db.all("SELECT id, first_name, second_name FROM People", (err, rows) => {
        if(err){console.log(err)}
        res.send(rows);
    })
});

app.get("/api/family/*", (req, res) => {
    let id = (req.path.split("/").pop());
    db.all("SELECT * FROM Familys WHERE family_name='"+id+"';", (err, rows) => {
        if (err) {console.error(err);}
        res.send(rows[0]);
    });
});

app.get("/api/tempteam/", (req, res) => {
    let id = req.query.id;
    db.all("SELECT * FROM Tempteams WHERE id='"+id+"';", (err, rows) => {
        if (err) {console.error(err);}
        res.send(rows[0]);
    });
});

app.get("/api/teamnames/", (req, res) => {
    db.all("SELECT teamname FROM Teams;", (err, rows) => {
        if (err) {console.error(err);}
        res.send(rows);
    });
});

app.get("/api/teams/", (req, res) => {
    db.all("SELECT * FROM Teams", (err, rows) => {
        for (let i = 0; i < rows.length; i++) {
            let team = rows[i];
            db.all("SELECT id, first_name, second_name FROM People WHERE team = '"+team.teamname+"';", (err, members) => {
                if (err) {console.error(err);}
                rows[i].members = members;

                if (i == rows.length -1) {
                    res.send(rows);
                }
            });
        }
    });
});

app.get("/api/tempteams/", (req, res) => {
    db.all("SELECT * FROM Tempteams", (err, rows) => {
        for (let i = 0; i < rows.length; i++) {
            let team = rows[i];
            let members = "("+team.members.slice(1, -1)+")"
            db.all("SELECT id, first_name, second_name FROM People WHERE id In "+members+";", (err, members) => {
                if (err) {console.error(err);}
                rows[i].members = members;

                if (i == rows.length -1) {
                    res.send(rows);
                }
            });
        }
    });
});

app.get("/api/teams/info", (req, res) => {
    db.all("SELECT * FROM Teams WHERE teamname='"+req.query.id+"';", (err, rows) => {
        let team = rows[0];
        db.all("SELECT id, first_name, second_name FROM People WHERE team = '"+team.teamname+"';", (err, members) => {
            if (err) {console.error(err);}
            rows[0].members = members;
            res.send(rows);
        });
    });
})

app.post("/api/teams/create", (req, res) => {
    let userdata = JSON.parse(req.query.data);
    let keys = "";
    let data = "'";
    for (const key in userdata) {
        keys+=key+",";
        data+=userdata[key]+"','";
    }
    keys = keys.slice(0, -1);
    data = data.slice(0, -2);
    db.exec('INSERT INTO Teams ('+keys+') VALUES ('+data+");");
    res.send("Das Team "+userdata.teamname+" wurde hinzugefügt.");
});

app.post("/api/tempteam/create", (req, res) => {
    let teamdata = JSON.parse(req.query.data);
    let keys = "";
    let data = "'";
    for (const key in teamdata) {
        keys+=key+",";
        data+=teamdata[key]+"','";
    }
    keys = keys.slice(0, -1);
    data = data.slice(0, -2);
    db.exec('INSERT INTO Tempteams ('+keys+') VALUES ('+data+');');
    res.send("Das Team "+teamdata.teamname+" wurde hinzugefügt.");
});

app.post("/api/teams/update", (req, res) => {
    let userdata = JSON.parse(req.query.data);
    let teamname = userdata.teamname;
    delete userdata.teamname;
    let newValues = "";
    for (const key in userdata) {
        newValues+=key+"='"+userdata[key]+"',";
    }
    newValues = newValues.slice(0, -1);
    db.exec('UPDATE Teams SET '+newValues+' WHERE teamname="'+teamname+'";');
    res.send("Das Team "+teamname+" wurde modifiziert.");
});

app.post("/api/modifyuser/", (req, res) => {
    let userdata = JSON.parse(req.query.data);
    let id = userdata.id;
    delete userdata.id;
    let newValues = "";
    for (const key in userdata) {
        newValues+=key+"='"+userdata[key]+"',";
    }
    newValues = newValues.slice(0, -1);

    //console.log('UPDATE People SET '+newValues+' WHERE id='+id);
    db.exec('UPDATE People SET '+newValues+' WHERE id='+id);
    res.send("Das Mitglied "+userdata.first_name+" "+userdata.second_name+" wurde modifiziert.");
});

app.post("/api/family/modify/", (req, res) => {
    let userdata = JSON.parse(req.query.data);
    let family_name = userdata.family_name;
    delete userdata.family_name;
    let newValues = "";
    for (const key in userdata) {
        newValues+=key+"='"+userdata[key]+"',";
    }
    newValues = newValues.slice(0, -1);
    db.exec('UPDATE Familys SET '+newValues+' WHERE family_name="'+family_name+'";');
    res.send("Die Familie "+family_name+" wurde modifiziert.");
});

app.post("/api/tempteam/modify/", (req, res) => {
    let teamdata = JSON.parse(req.query.data);
    let id = teamdata.id;
    delete teamdata.id;
    let newValues = "";
    for (const key in teamdata) {
        newValues+=key+"='"+teamdata[key]+"',";
    }
    newValues = newValues.slice(0, -1);
    db.exec('UPDATE Tempteams SET '+newValues+' WHERE id="'+id+'";');
    res.send("Das Temporäre Team "+teamdata.teamname+" wurde modifiziert.");
});

app.post("/api/addmember/", (req, res) => {
    let userdata = JSON.parse(req.query.data);
    let keys = "";
    let data = "'"
    for (const key in userdata) {
        keys+=key+", ";
        data+=userdata[key]+"', '";
    }
    keys = keys.slice(0, -2);
    data = data.slice(0, -3);

    db.exec('INSERT INTO People ('+keys+') VALUES ('+data+");");
    res.send("Das Mitglied "+userdata.first_name+" "+userdata.second_name+" wurde der Liste hinzugefügt.");
});

app.post("/api/family/new/", (req, res) => {
    let userdata = JSON.parse(req.query.data);
    let keys = "";
    let data = "'"
    for (const key in userdata) {
        keys+=key+", ";
        data+=userdata[key]+"', '";
    }
    keys = keys.slice(0, -2);
    data = data.slice(0, -3);

    db.exec('INSERT INTO Familys ('+keys+') VALUES ('+data+");");
    res.send("Die Familie "+userdata.family_name+" wurde der Liste hinzugefügt.");
});

app.all("/api/delmember/*", (req, res) => {
    let id = Number(req.path.split("/").pop().split("?")[0]);
    db.exec('DELETE FROM People WHERE id='+id+';');
    res.send("Das Mitglied "+id+" wurde aus der Liste entfernt.");
});

app.all("/api/family/delete/*", (req, res) => {
    let family_name = (req.path.split("/").pop().split("?")[0]);
    db.exec('DELETE FROM Familys WHERE family_name="'+family_name+'";');
    res.send("Die Familie "+family_name+" wurde aus der Liste entfernt.");
});

app.all("/api/tempteam/delete/", (req, res) => {
    let id = (req.query.id);
    db.exec('DELETE FROM Tempteams WHERE id='+id+';');
    res.send("Das temporäre Team ID="+id+" wurde aus der Liste entfernt.");
});


app.all("/api/teams/delete/*", (req, res) => {
    let teamname = (req.path.split("/").pop().split("?")[0]);

    db.all("SELECT id FROM People WHERE team='"+teamname+"';", (err, rows) => {

        if (rows.length == 0) {
            db.exec('DELETE FROM Teams WHERE teamname="'+teamname+'";');
            res.send("Das Team "+teamname+" wurde aus der Liste entfernt.");
        } else {
            for (let i = 0; i < rows.length; i++) {
                db.exec('UPDATE People SET team=Null WHERE id='+rows[i].id+";");
                if (i == rows.length-1) {
                    db.exec('DELETE FROM Teams WHERE teamname="'+teamname+'";');
                    res.send("Das Team "+teamname+" wurde aus der Liste entfernt.");
                }
            }
        }
    });
});

app.get("/api/familys", (req, res) => {
    db.all("SELECT * FROM Familys", (err, rows) => {
        for (let i = 0; i < rows.length; i++) {
            let family = rows[i];
            let members = "("+family.childs.slice(1, -1)+")"
            db.all("SELECT id, first_name, second_name FROM People WHERE id In "+members+";", (err, members) => {
                if (err) {console.error(err);}
                rows[i].members = members;
                if (i == rows.length -1) {
                    res.send(rows);
                }
            });
        }
    });
});

app.listen(port, ()=>{
    console.log("running...");
});
