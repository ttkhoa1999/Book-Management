const express = require('express'),
      dbOperation = require('./dbFiles/dbOperation'),
      cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 10000}));
app.use(cors());

app.get('/api', async (req, res) => {
    const data = await dbOperation.getAllbook();
    res.send(data.recordset);
});

app.get('/apiPL', async (req, res) => {
    const data = await dbOperation.getAllbookPL();
    res.send(data.recordset);
});

app.get('/update/:id', async (req, res) => {
    let { id } = req.params;
    const data = await dbOperation.getbook(id);
    res.send(data.recordset);
});

app.get('/pt', async (req, res) => {
    let { data } = req.body;
    const post = await dbOperation.getPT(data);
    if (!post) {
        res.send('OKE');
    }
})
app.post('/postData', async (req, res) => {
    let { data } = req.body;
    const post = await dbOperation.addbook(data);
    if (!post) {
        res.send('OKE');
    }
})

app.post('/postDataPL', async (req, res) => {
    let { data } = req.body;
    const post = await dbOperation.addbookPL(data);
    if (!post) {
        res.send('OKE');
    }
})


app.delete('/delData', async (req, res) => {
    let { id } = req.body;
    const post = await dbOperation.delbook(id);
    if (!post) {
        res.send('OKE');
    }
})

app.delete('/delDataPL', async (req, res) => {
    let { id } = req.body;
    const post = await dbOperation.delbookPL(id);
    if (!post) {
        res.send('OKE');
    }
})

app.put('/updateData', async (req, res) => {
    let { id } = req.body;
    let { data } = req.body;
    const post = await dbOperation.updatebook(id, data);
    if (!post) {
        res.send('OKE');
    }
})

app.put('/updateDataPL', async (req, res) => {
    let { id } = req.body;
    let { data } = req.body;
    const post = await dbOperation.updatebookPL(id, data);
    if (!post) {
        res.send('OKE');
    }
})


app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));


