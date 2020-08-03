const { db } = require("./pgAdaptor");

db.any('select * from "Users"')
    .then(res => {
        console.log(res);
    });