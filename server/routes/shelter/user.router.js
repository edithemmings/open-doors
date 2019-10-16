const express = require('express');
const router = express.Router();
const pool = require('../../modules/pool');

// --------------------------------------------------//
// ------------GETTING ONE SHELTER --------------//
router.get('/', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT * from "shelter" WHERE "shelter".user_id = $1;`;
    //-------------querying database 
    pool.query(queryText, [Number(req.user.id)])
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});


//----------------------------------------------------------//
//----------------POSTING NEW SHELTER CONTACT INFO-----------------------//
router.post('/contact', (req, res) => {
    //-----------query text
    const queryText = `INSERT INTO "shelter" ("name", "location", "phone", "website", "user_id") VALUES ($1, $2, $3, $4, $5);`;
    //-------------querying database 
    pool.query(queryText, [req.body.name, req.body.address, req.body.phone, req.body.website, req.user.id])
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});
//----------------------------------------------------------//
//----------------POSTING NEW HOURS, TYPES AND TAGS FOR SHELTER-----------------------//
router.post('/moreInfo', (req, res) => {
    const queryText = ''
    req.body.guest_types.forEach(obj => {
        queryText = queryText + `INSERT INTO "shelter_guest_count"("shelter_id", "type", "capacity") VALUES(${req.body.id}, ${obj.type}, ${obj.capacity});`
    })
    req.body.hours.forEach(obj => {
        queryText = queryText + `INSERT INTO "hours" ("shelter_id", "day", "open", "close") VALUES (${req.body.id}, ${obj.day}, ${obj.open}, ${obj.close});`
    })
    req.body.tags.forEach(obj => {
        queryText = queryText + `INSERT INTO "tags" ("shelter_id", "tag") VALUES (${req.user.id}, ${obj.tag});`
    })
    console.log(queryText)
    //-----------query text
    // const queryText2 = `INSERT INTO "hours" ("shelter_id", "day", "open", "close") VALUES ($1, $2, $3, $4);
    //                     INSERT INTO "tags" ("shelter_id", "tag") VALUES ($1, $5);
    //                     INSERT INTO "shelter_guest_count" ("shelter_id", "type", "count", "capacity") VALUES ($1, $6, $7, $8);`;
    //-------------querying database 
    pool.query(queryText,)
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});

//INSERT INTO "hours" ("shelter_id", "day", "open", "close") VALUES ($1, $2, $3, $4);


module.exports = router;