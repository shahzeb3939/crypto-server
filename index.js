import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/access_token', (req, res) => {

    // console.log("Request received:", req.url)

const params = {
    client_id: 'b76227f559e4ff3e664b',
    client_secret: "ae245b62e0cdb003c52f3ae50cec0e361628f803",
    code: req.query.code,
};

const options = {
    method: 'POST',
    headers: {
        "Accept": "application/json"
    },
};

fetch(`https://github.com/login/oauth/access_token?client_id=${params.client_id}&client_secret=${params.client_secret}&code=${params.code}`, options )
    .then(fetchResponse => fetchResponse.json())
    .then(data => {
        // console.log(data)
        res.send(data)
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));