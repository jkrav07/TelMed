const express = require('express');
const router = require('./router');
const path = require('path');


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/telmed', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});

module.exports = app;