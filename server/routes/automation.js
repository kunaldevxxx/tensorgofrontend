const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mount these routes in your main Express app
app.use('/api/automation', require('./routes/automation')); 