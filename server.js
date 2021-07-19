const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
    // res.send('helloworld')
})

//TODO

// app.post('/songs', (req, res) => {
//     req.body()
// })



app.listen(4000, () => {
    console.log('listening at port 4000')
})