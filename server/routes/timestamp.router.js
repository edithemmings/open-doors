const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// this router is used for the data on the listing page 
// that shows how recently the shelter bed availability info
// was updated

router.get('/:id', (req, res) => {
    let queryText = `SELECT "timestamp" FROM "shelter" WHERE "id" = $1;`;
    pool.query(queryText, [ Number(req.params.id) ])
        .then((response) => res.send(response.rows))
        .catch((error) => { res.sendStatus(500); console.log(error) });
});

router.put('/', (req, res) => {
    const queryText = `UPDATE "shelter" SET "timestamp" = $1 WHERE "user_id" = $2;`;
    pool.query(queryText, [req.body.timestamp, req.user.id])
        .then(() => res.sendStatus(201))
        .catch((error ) => {res.sendStatus(500); console.log(error)});
});


module.exports = router;
