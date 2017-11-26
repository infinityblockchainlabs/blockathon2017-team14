const express       = require('express');
const fs            = require('fs');
const bodyParser    = require('body-parser');
const db            = require('./db.js');

const app       = express();
const template  = fs.readFileSync('templates/index.html', 'utf-8');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/add', require('./addStore.js'));
app.use('/show', require('./show.js'));

app.get('/', (req, res) => {
    res.send(template);
});

app.post('/', (req, res) => {
    let info = {
        address: req.body.storeAddr
    };
    db.Insert(info, () => {
        if (req.body.add)
            res.redirect('/add');
        else
            res.redirect('/show');
    });
});

app.listen(process.env.PORT || 5000);
