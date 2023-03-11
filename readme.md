
# rrmanager


Ein Tool zum Speichern von Mitgliederdaten innerhalb eines Royal-Ranger Stammes. 

**noch in entwicklung** - sicherheitslücken und bugs sind aktuell inbegriffen. Darüber hinaus sind viele geplante Features noch nicht eingebaut.

## verwendete Bibeotheken

- nodejs
- expressjs
- bootstrap
- bootstrap-table
- fuse.js
- jquery
- tom-select
- sqlite3

## Sicherheit

Zur authentifizierung wird basic-authentication verwendet. 
*(noch nicht eingebaut)*

Durch eine TLS verschlüsselung (https) wird die Verbindung im falle eines nicht-offline Hostings verschlüsselt. Dabei bietet sich entweder ein selbst-signiertes Zertifikat oder eines einer CA an. 

## Aufsetzen

Das System wurde auf und für Ubuntu 22.04 Desktop/Server entwickelt, sollte jedoch dennoch mit Windows/MacOS oder anderen Linux-Distros kompatibel sein. Der Server hat in meinen Tests keine hohen Leistungsanforderungen. Jedes Linux-fähige SoC-basierte Board (z.B. Raspberry PI/Banana-PI/etc.) sollte über genug Leistung zur Ausführung im Serverbetrieb verfügen.

### Installieren von nodejs

**Debian u.a.**

```console
sudo apt-get install nodejs
```

Alternativ kann mit dem node-version-manager (nvm) die aktuelle Version installiert werden.

**Windows und MacOS**

`https://nodejs.org/en/download/`

### Klonen und aufsetzen

```console
git clone https://github.com/alessioC42/rrmanager.git && cd rrmanager
npm install
```

### Ausführen

```console
node index.js
```

### Autostart

Damit der Server bei jedem Start des Systems automatisch gestartet wird, muss das folgende Script in den Autostart des systems:

start.sh
```console
cd /path/to/rrmanager
node index.js
```

*Bei einer Installation von nodejs mit nvm kann es zu einem Fehler beim Autostart kommen, bei dem node nicht als Befehl erkannt wird.*