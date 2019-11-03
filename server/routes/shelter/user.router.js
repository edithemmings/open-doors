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
//-----------POSTING NEW SHELTER DURING SIGN UP-------------//
router.post('/new-shelter', async (req, res) => {
    const connection = await pool.connect();
    const postToShelter = `INSERT INTO "shelter" ("name", "location", "phone", "website", "user_id") VALUES ($1, $2, $3, $4, $5) RETURNING "id";`
    console.log(req.body.contact.name, req.body.contact.address, req.body.contact.phone, 'http://' + req.body.contact.website, req.user.id)
    let postMoreInfo = ''
    
    try {
        await connection.query('BEGIN');
        const shelterId = await connection.query(postToShelter, [req.body.contact.name, req.body.contact.address, req.body.contact.phone, 'http://' + req.body.contact.website, req.user.id]);
        console.log('SHELTER ID', shelterId.rows[0].id)

        await req.body.types.forEach(obj => {
            connection.query(
                `INSERT INTO "shelter_guest_count"("shelter_id", "type_id", "capacity") VALUES($1, ${Number(obj.type_id)}, ${Number(obj.capacity)});`,
                [shelterId.rows[0].id]);
            // console.log('id, type, capacity', req.body.id, obj.type, obj.capacity)
        })
        await req.body.hours.forEach(obj => {
            connection.query(
                `INSERT INTO "hours" ("shelter_id", "day", "open", "close") VALUES ($1, '${obj.day}', '${obj.open}', '${obj.close}');`,
                [shelterId.rows[0].id]);
            // console.log('day, open, close', obj.day, obj.open, obj.close)
        })
        await req.body.tags.forEach(obj => {
            connection.query(
                `INSERT INTO "shelter_tags" ("shelter_id", "tag_id") VALUES ($1, ${Number(obj.tag_id)});`,
                [shelterId.rows[0].id]);
            // console.log('tag', obj.tag)
        })

        await connection.query('COMMIT')
        console.log('success')
        res.send(201)
    } catch (error) {
        await connection.query('ROLLBACK')
        console.log(error)
    } finally {
        console.log('success')
        connection.release()
    }
})


// --------------------------------------------------//
// ------------GETTING ONE SHELTER TYPES--------------//
router.get('/types/:id', (req, res) => {
    //-----------query text for any call
    const queryText = `SELECT * from "shelter_guest_count" WHERE "shelter_id" = $1 ORDER BY "id";`;
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

router.put(`/set/:id`, (req, res) => {
    //-----------query text for any call
    const queryText = `UPDATE "shelter_guest_count" SET "count" = $1 WHERE "id" = $2;`;
    //-------------querying database 
    pool.query(queryText, [req.body.count, req.params.id])
        .then((result) => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error decrementing', err);
            res.sendStatus(500);
        });

})


module.exports = router;