const express = require('express');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require('path');
const cors = require('cors');

const { PORT } = require('./configs/env');
const conn = require('./database/conn');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Criação do store de sessão usando Sequelize
const sessionStore = new SequelizeStore({ db: conn, tableName: 'Sessions' });

// Middleware de sessão com store integrado
app.use(session({
  secret: 'uma-chave-secreta-muito-segura', // chave para assinar a sessão
  resave: false,
  saveUninitialized: false,
  store: sessionStore, // integra o Sequelize Store
  cookie: {
    maxAge: 1000 * 60 * 60 // duração do cookie: 1h
  }
}));

// Cria a tabela de sessões automaticamente, se ainda não existir
sessionStore.sync();

const authenticateRoutes = require('./routes/authenticate');
const objectRoutes = require('./routes/object');
const rotas_navegacao = require('./routes/navegacao');

app.use(rotas_navegacao);
app.use(authenticateRoutes);
app.use(objectRoutes);

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
