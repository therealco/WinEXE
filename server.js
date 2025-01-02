const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/execute', (req, res) => {
    const command = req.body.command;

    exec(`powershell -Command "${command}"`, (error, stdout, stderr) => {
        if (error) {
            res.json({ result: stderr });
        } else {
            res.json({ result: stdout });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
