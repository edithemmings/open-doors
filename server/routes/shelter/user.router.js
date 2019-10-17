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
    let queryText = ''
    req.body.guest_types.forEach(obj => {
        queryText = queryText + `INSERT INTO "shelter_guest_count"("shelter_id", "type", "capacity") VALUES(${Number(req.body.id)}, '${obj.type}', ${Number(obj.capacity)});`
        console.log('id, type, capacity', req.body.id, obj.type, obj.capacity)
    })
    req.body.hours.forEach(obj => {
        queryText = queryText + `INSERT INTO "hours" ("shelter_id", "day", "open", "close") VALUES (${Number(req.body.id)}, '${obj.day}', '${obj.open}', '${obj.close}');`
        console.log('day, open, close', obj.day, obj.open, obj.close)
    })
    req.body.tags.forEach(obj => {
        queryText = queryText + `INSERT INTO "shelter_tags" ("shelter_id", "tag") VALUES (${Number(req.body.id)}, '${obj.tag}');`
        console.log('tag', obj.tag)
    })
    console.log(queryText)
    //-----------query text
    pool.query(queryText,)
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing adding your shelter details', err);
            res.sendStatus(500);
        });
});

// --------------------------------------------------//
// ------------GETTING ONE SHELTER --------------//
router.get('/types/:id', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT * from "shelter_guest_count" WHERE "shelter_id" = $1;`;
    //-------------querying database 
    pool.query(queryText, [Number(req.params.id)])
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing your shelter types', err);
            res.sendStatus(500);
        });
});


router.put(`/up/:id`, (req, res) => {
    //-----------query text for any call
    const queryText = `UPDATE "shelter_guest_count" SET "count" = "count"+1 WHERE "id" = $1;`;
    //-------------querying database 
    pool.query(queryText, [req.params.id])
        .then((result) => { res.sendStatus(201);  })
        .catch((err) => {
            console.log('Error incrementing', err);
            res.sendStatus(500);
        });

});

router.put(`/down/:id`, (req, res) => {
    //-----------query text for any call
    const queryText = `UPDATE "shelter_guest_count" SET "count" = "count"-1 WHERE "id" = $1;`;
    //-------------querying database 
    pool.query(queryText, [req.params.id])
        .then((result) => { res.sendStatus(201);  })
        .catch((err) => {
            console.log('Error decrementing', err);
            res.sendStatus(500);
        });

});


module.exports = router;