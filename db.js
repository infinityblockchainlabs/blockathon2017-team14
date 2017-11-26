const nedb      = require('nedb');
const db        = new nedb({
    autoload: true
});

function Count(cb) {
    db.count({}, (err, count) => {
        cb(count);
    })
}

function Get(cb) {
    db.find({}, (err, rows) => {
        cb(rows[rows.length - 1]);
    })
}

function Insert(info, cb) {
    db.insert(info, (err) => {
        cb();
    });
}

module.exports = {
    Count,
    Get,
    Insert
}