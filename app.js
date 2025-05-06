const express = require('express'); 
const { initDB, User, Post, Like ,Comment,Profil} = require('./src/db/sequelize');
const bodyParser = require('body-parser');
const {Sequelize} = require('sequelize');
// const profil = require('./src/models/profil');

const app = express();
const path = require('path'); // Importer le module path pour gérer les chemins de fichiers

app.set('views', './src/template');
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'src/static')));

app.use(express.json())
app.use((req,res,next) =>{
  console.log(req.url)
  next()
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// app.get('/',(req,res)=>{
//   res.render('acueil')
// })

require('./src/routes/home')(app)
require('./src/routes/info-other-user')(app)
require('./src/routes/info-own-user')(app)
require('./src/routes/amis')(app)
require('./src/routes/upload')(app)
require('./src/routes/login')(app)
require('./src/routes/login-post')(app)
require('./src/routes/signup')(app)
require('./src/routes/signup-post')(app)
require('./src/routes/profilForm')(app)
require('./src/routes/postForm')(app)
require('./src/routes/postupload')(app)
require('./src/routes/données')(app)
require('./src/routes/postContSub')(app)
require('./src/routes/postContPost')(app)
require('./src/routes/like-post')(app)
require('./src/routes/post-comment')(app)
require('./src/routes/send_notif')(app)




initDB();

app.listen(3000, () => {
  console.log('Serveur lancé sur le port 3000');
});