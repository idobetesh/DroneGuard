const app = require('express')();
const cors = require('cors');

const port = 3333;

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({message: 'OK Bitch!'})
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
