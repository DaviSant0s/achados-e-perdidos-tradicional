const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const { PORT } = require('./configs/env');
const conn = require('./database/conn');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static(path.join(__dirname, 'uploads')));


const authenticateRoutes = require('./routes/authenticate');
const objectRoutes = require('./routes/object');

app.use(cors());
app.use('/api', authenticateRoutes);
app.use('/api', objectRoutes);

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
