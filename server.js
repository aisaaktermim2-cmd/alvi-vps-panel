const express = require('express');
const path = require('path');
const si = require('systeminformation');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// পাসওয়ার্ড সেট করুন এখানে
const ADMIN_PASSWORD = "MG24"; 

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: "Wrong Password!" });
    }
});

app.get('/system_stats', async (req, res) => {
    try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        res.json({
            cpu: cpu.currentLoad.toFixed(1),
            ram: ((mem.active / mem.total) * 100).toFixed(1)
        });
    } catch (e) {
        res.status(500).json({ error: "Failed to get stats" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
