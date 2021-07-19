const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
    // res.send('helloworld')
})





app.listen(4000, () => {
    console.log('listening at port 4000')
})