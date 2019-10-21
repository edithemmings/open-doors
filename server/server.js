
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const sheltersRouter = require('./routes/shelter/all.router');
const userShelterRouter = require('./routes/shelter/user.router');
const typesRouter = require('./routes/shelter/types.router');
const tagsRouter = require('./routes/shelter/tags.router');
const settingsRouter = require('./routes/settings.router');
const timestampRouter = require('./routes/timestamp.router');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/shelter/all', sheltersRouter);
app.use('/api/shelter/user', userShelterRouter);
app.use('/api/shelter/types', typesRouter);
app.use('/api/shelter/tags', tagsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/timestamp', timestampRouter);



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
