require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb-demo.xjcty6t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const dbURI = 'mongodb://127.0.0.1:27017/userAuthShaun?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use('/smoothies', authRoutes);