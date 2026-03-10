const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === 'MG24') { // আপনার পাসওয়ার্ড
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.get('/system_stats', (req, res) => {
    res.json({
        cpu: (Math.random() * 10 + 5).toFixed(1),
        ram: (Math.random() * 20 + 40).toFixed(1)
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
