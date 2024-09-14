const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(cors());

app.post('/api/esp/data', (req, res) => {
    const { temp, humd, pos } = req.body;
    console.log(`Received data - Temp: ${temp}, Humidity: ${humd}, Position: ${pos}`);

    // Do something with the received values
    res.status(200).send({ message: 'Data received successfully' });
});

app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
