const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(session({
    secret: 'albi_secret_key',
    resave: false,
    saveUninitialized: true
}));

const ADMIN_PASSWORD = 'mg24pro'; 

// লগইন চেক
app.post('/login', (req, res) => {
    if (req.body.password === ADMIN_PASSWORD) {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.send('পাসওয়ার্ড ভুল! <a href="/login">আবার চেষ্টা করুন</a>');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/', (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/login');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// ফাইল আপলোড সিস্টেম
app.post('/upload', (req, res) => {
    if (!req.files) return res.status(400).send('কোনো ফাইল আপলোড হয়নি।');
    let pyFile = req.files.pythonFile;
    pyFile.mv(path.join(__dirname, pyFile.name), (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/?success=uploaded');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
