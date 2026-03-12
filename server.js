const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

// ফাইল স্টোর করার অবজেক্ট
let activeProcesses = {};

app.use(express.static(path.join(__dirname)));
app.use(fileUpload());

// মেইন পেজ লোড
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ফাইল আপলোড সিস্টেম (আপনার প্যানেলে নতুন স্ক্রিপ্ট যোগ করার জন্য)
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let pythonFile = req.files.pythonFile;
    pythonFile.mv(path.join(__dirname, pythonFile.name), (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/?msg=UploadSuccess');
    });
});

// আপনার HTML বাটনগুলোর অ্যাকশন হ্যান্ডলার
app.get('/action/:scriptName/:type', (req, res) => {
    const { scriptName, type } = req.params;
    const fileName = scriptName.endsWith('.py') ? scriptName : `${scriptName}.py`;

    if (type === 'restart' || type === 'start') {
        // আগের প্রসেস থাকলে বন্ধ করা
        if (activeProcesses[scriptName]) {
            activeProcesses[scriptName].kill();
        }
        // নতুন করে রান করা
        const process = spawn('python3', [fileName]);
        activeProcesses[scriptName] = process;
        console.log(`${fileName} started!`);
    } 
    else if (type === 'stop') {
        if (activeProcesses[scriptName]) {
            activeProcesses[scriptName].kill();
            delete activeProcesses[scriptName];
            console.log(`${fileName} stopped!`);
        }
    }

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`SHANTO Cyber Panel running on port ${port}`);
});
        
