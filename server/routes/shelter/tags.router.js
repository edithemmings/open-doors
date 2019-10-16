const express = require('express');
const router = express.Router();
const pool = require('../../modules/pool');

// --------------------------------------------------//
// ------------GETTING ONE SHELTER --------------//
router.get('/', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT * FROM "tags";`;
    //-------------querying database 
    pool.query(queryText)
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing tags', err);
            res.sendStatus(500);
        });
});

module.exports = router;