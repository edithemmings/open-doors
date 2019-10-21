const express = require('express');
const router = express.Router();
const pool = require('../../modules/pool');

// --------------------------------------------------//
// ------------GETTING SHELTERS --------------//
router.get('/', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT "shelter"."id", "name", "location", "phone", "website", "user_id", 
	json_agg(distinct "shelter_tags".tag) AS "tags",
	json_agg(distinct "shelter_guest_count") AS "types",
	json_agg(distinct "hours") AS "hours"
    FROM "shelter"
    JOIN "hours"  on "shelter".id = "hours".shelter_id
    JOIN "shelter_guest_count" on "shelter".id = "shelter_guest_count".shelter_id
    JOIN "shelter_tags" on "shelter".id = "shelter_tags".shelter_id
    JOIN "tags" on "tags".tag = "shelter_tags".tag
    JOIN "guest_type" on "guest_type".type = "shelter_guest_count".type
    GROUP BY "shelter".id`;
    //-------------querying database 
    pool.query(queryText)
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});

router.get('/user', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT "shelter"."id", "name", "location", "phone", "website", "user_id", 
	json_agg(distinct "tags".tag) AS "tags",
	json_agg(distinct "shelter_guest_count") AS "types",
	json_agg(distinct "hours") AS "hours"
 FROM "shelter"
    JOIN "hours" 
    	on "shelter".id = "hours".shelter_id
    JOIN "shelter_guest_count" 
    	on "shelter".id = "shelter_guest_count".shelter_id
    JOIN "shelter_tags" 
    	on "shelter".id = "shelter_tags".shelter_id
    JOIN "tags" 
    	on "tags".tag = "shelter_tags".tag
    JOIN "guest_type" 
    	on "guest_type".type = "shelter_guest_count".type
    WHERE "shelter".user_id = $1
    GROUP BY "shelter".id`;
    //-------------querying database 
    pool.query(queryText, [req.user.id])
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});


module.exports = router;