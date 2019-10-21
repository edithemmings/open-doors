const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// this router is used for the data on the listing page 
// that shows how recently the shelter bed availability info
// was updated

router.get('/', (req, res) => {
    let queryText = `SELECT "lastupdate" from "shelter" WHERE "user_id" = $1;`
    pool.query(queryText, [req.user.id])
        .then(() => res.send(response.data))
        .catch(() => res.sendStatus(500));
});

router.put('/', (req, res) => {
    const queryText = `UPDATE "shelter_guest_count" SET "lastupdate" = $1 WHERE "user_id" = $2;`;
    pool.query(queryText, [req.body.timestamp, req.user.id])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});


module.exports = router;
