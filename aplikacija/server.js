var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser'); //citanje iz tela (body) requesta

app.use(bodyParser.json()); // ovde server treba da koristi opciju citanja iz tela requesta
app.use(cors());
app.options('*', cors());

var oglasi = [
    {
        "id": 1,
        "kategorija": "obuca",
        "datum": "2023-01-21",
        "cena": 20000,
        "tekstOglasa": "NIKE patike",
        "tag": ["tag1", "tag2"],
        "email": "nike@gmail.com"
    },
    {
        "id": 2,
        "kategorija": "tehnika",
        "datum": "2023-01-21",
        "cena": 300,
        "tekstOglasa": "Televizor plazma",
        "tag": ["tag2", "tag3"],
        "email": "samsung@gmail.com"
    }
]

app.get('/oglasi', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(oglasi);
});

app.get("/oglasi/:id", function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    var resultOglas = {};

    oglasi.forEach(oglas => {
        // req.params.id vraca id koji se posalje => oglasi/1 - vraca 1 (request param koji se nalazi u url)
        if (oglas.id == req.params.id) {
            resultOglas = oglas;
        }
    });

    res.json(resultOglas);
});

app.get("/oglasi/filter/:filter", function (req, res) {
    var nizfiltriranihOglasa = [];

    var filter = req.params.filter;

    console.log(filter);

    oglasi.forEach(oglas => {
        if(oglas.id == filter  || oglas.tekstOglasa.includes(filter) || oglas.kategorija.includes(filter)) {
            nizfiltriranihOglasa.push(oglas);
        }
    });

    res.json(nizfiltriranihOglasa);
});

app.post('/oglasi', function (req, res) {//kreiranje oglasa
    res.set("Access-Control-Allow-Origin", "*");
    var oglas1 = {};

    oglas1["id"] = funkcijaZaSledeciId();
    oglas1["kategorija"] = req.body.kategorija;
    oglas1["datum"] = req.body.datum;
    oglas1["cena"] = req.body.cena;
    oglas1["tekstOglasa"] = req.body.tekstOglasa;
    oglas1["tag"] = req.body.tag;
    oglas1["email"] = req.body.email;

    oglasi.push(oglas1);

    res.end("OK");
});

app.put('/oglasi/:id', (req, res) => {//azuriranje oglasa
    oglasi.forEach(oglasaz => {
        // req.params.id vraca id koji se posalje => oglasi/1 - vraca 1 (request param koji se nalazi u url)
        if (oglasaz.id == req.params.id) {
            oglasaz["kategorija"] = req.body.kategorija;
            oglasaz["datum"] = req.body.datum;
            oglasaz["cena"] = req.body.cena;
            oglasaz["tekstOglasa"] = req.body.tekstOglasa;
            oglasaz["tag"] = req.body.tag;
            oglasaz["email"] = req.body.email;
        }
    });

    res.end('OK');
});

app.delete('/oglasi/:id', (req, res) => {
    var oglasiPomocna = [];

    oglasi.forEach(oglas => {
        if (oglas.id != req.params.id) {
            oglasiPomocna.push(oglas);
        }
    });

    oglasi = oglasiPomocna;

    res.end('OK');
});

app.listen(3000, function () {
    console.log('Primer slusanja aplikacije na portu 3000!');
});



function funkcijaZaSledeciId() {
    if(oglasi.length > 0) {
        var id = oglasi[oglasi.length - 1].id + 1;
        return id;
    }
    return 1;
}
