const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
})); 