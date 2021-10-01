// require express
const express = require('express');
// express app
const app = express();
var fs = require('fs');
// express json
app.use(express.json());
// express static
app.use(express.static('public'));
// express cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// express get
app.get('/34283634576395873', (req, res) => {
    var data = JSON.parse(fs.readFileSync('data.json'))
    res.json(data)
    res.end()
});
app.post('/298342897934234', (req, res) => {
    var data = req.body
    console.log(data)
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
    res.json({
        status: true
    })
})
app.get('/', (req, res) => {
    res.send("<center><h1 style='margin-top:20px'>Welcome to Game! Please click <a href='/play'>Play</a> to play the game</h1></center>")
})
app.get('/736574323933343732', (req, res) => {
    res.sendFile(__dirname+"/public/set.html")
})
app.get("/play",(req,res)=>{
   res.sendFile(__dirname+"/public/game/game.html")
})
app.listen(process.env.PORT || 3000)
