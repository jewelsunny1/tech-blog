const path =require ('path');
const express=require ('express');
const session=require('express-session');
const exphbs= require ('express-handlebars');
const routes= require('./controllers');
const helpers=require('./utils/helpers');

const sequelize= require('./config/connection');

const SequelizeStore= require('connect-session-sequelize')(session.Store)

const app=express(); //instantiating express 
const PORT= process.env.PORT || 3001;//setting up the port

const hbs=express.create({helpers})//where we can use the custom helper meth/function

const sess={//creating a session object that can be accessed in our code
secret: 'Super secret secret',
cookie:{},
resave:false,
saveUninitialized: true,
store: new SequelizeStore({
    db: sequelize//store everything on sequelize storage? NOT node server bc that is NOT good practice
})
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(routes);

sequelize.synce({force:false}).then(()=>{
    app.listen(PORT, ()=> console.log('Now listening'));
});