const express = require('express');
const app = express();

// Settings
const port = 3000;
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(express.json());        



// routes
app.use(require('./routes/employees'));


//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000', app.get('port'));
});