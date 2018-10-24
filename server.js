const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//middleware
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {(err)? console.log('unable to append to server.log'):console.log('sucessfully logged to server.log')});
    next();
});
//-------Under Development-------
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });
//-----------done---------------------
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
        return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle:'Home',
        welcomeMessage: 'Welcome to your Home Page'
    });
});

app.get('/about', (req,res)=> {
    res.render('about.hbs',{
        pageTitle: 'About',
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: 'Unable handle request',
        statusCode: 404
    });
}); 
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects',
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port: ${port}`);
});