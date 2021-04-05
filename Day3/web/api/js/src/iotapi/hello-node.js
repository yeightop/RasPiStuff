const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.listen(PORT, () => console.log('Hello Node running on port 3000'));

app.get('/', (request, response) => {
    console.log(request.url);
    response.send('Hello, World');
});

app.post('/', (request, response) => {
    const content = request.body;

    console.log(content);
    response.json(content);
});