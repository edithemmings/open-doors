const express = require('express');
const router = express.Router();
const pool = require('../../modules/pool');

// --------------------------------------------------//
// ------------GETTING SHELTERS --------------//
router.get('/', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT
    "shelter".id,
        "name",
        "location",
        "phone",
        "website",
        "user_id",
        json_agg(distinct "tags") AS "tags",
            json_agg(distinct "guest_type") AS "types",
                json_agg(distinct "shelter_guest_count") AS "counts",
                    json_agg(distinct "hours") AS "hours",
                        "timestamp"
    FROM "shelter"
    JOIN "hours"
    on "shelter".id = "hours".shelter_id
    JOIN "shelter_guest_count"
    on "shelter".id = "shelter_guest_count".shelter_id
    JOIN "shelter_tags"
    on "shelter".id = "shelter_tags".shelter_id
    JOIN "tags"
    on "tags".id = "shelter_tags".tag_id
    JOIN "guest_type"
    on "guest_type".id = "shelter_guest_count".type_id
    GROUP BY "shelter".id;`

    //-------------querying database 
    pool.query(queryText)
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing all shelters', err);
            res.sendStatus(500);
        });
});

router.get('/user', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT 
	"shelter"."id",
	"name",
	"location",
	"phone",
	"website",
	"user_id",
	json_agg(distinct "tags") AS "tags",
	json_agg(distinct "guest_type") AS "types",
	json_agg(distinct "shelter_guest_count") AS "counts",
	json_agg(distinct "hours") AS "hours"
 FROM "shelter"
    JOIN "hours" 
    	on "shelter".id = "hours".shelter_id
    JOIN "shelter_guest_count" 
    	on "shelter".id = "shelter_guest_count".shelter_id
    JOIN "shelter_tags" 
    	on "shelter".id = "shelter_tags".shelter_id
    JOIN "tags" 
    	on "tags".id = "shelter_tags".tag_id
    JOIN "guest_type" 
    	on "guest_type".id = "shelter_guest_count".type_id
     WHERE "shelter".user_id = $1
     GROUP BY "shelter".id;`;
    //-------------querying database 
    pool.query(queryText, [req.user.id])
        .then((result) => { res.send(result.rows); console.log(result.rows); })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});


module.exports = router;