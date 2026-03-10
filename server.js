const express = require('express');
const path = require('path');
const app = express();

// ফর্ম থেকে ডেটা পড়ার জন্য
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public ফোল্ডারটি স্ট্যাটিক হিসেবে সেট করা
app.use(express.static('public'));

// পাসওয়ার্ড চেক করার লজিক
app.post('/login', (req, res) => {
    const { password } = req.body;
    const correctPassword = 'MG24'; // এটাই আপনার পাসওয়ার্ড

    if (password === correctPassword) {
        // পাসওয়ার্ড ঠিক থাকলে ড্যাশবোর্ডে নিয়ে যাবে
        // যেহেতু আপনি আলাদা ড্যাশবোর্ড ফাইল চাচ্ছেন না, 
        // তাই আপাতত একটি সাকসেস মেসেজ বা আপনার ড্যাশবোর্ড কন্টেন্ট এখানে দেওয়া যায়।
        res.send(`
            <body style="background:#000; color:#0f0; font-family:monospace; padding:50px;">
                <h1>AUTHENTICATION SUCCESSFUL!</h1>
                <p>Welcome to PRIME VPS Terminal.</p>
                <hr border="1px solid #0f0">
                <p>Status: ACTIVE</p>
                <p>User: ALBI (Dakshata Sperm)</p>
                <br>
                <button onclick="location.href='/'" style="background:none; border:1px solid #0f0; color:#0f0; padding:10px; cursor:pointer;">LOGOUT</button>
            </body>
        `);
    } else {
        // পাসওয়ার্ড ভুল হলে
        res.send(`
            <body style="background:#000; color:red; font-family:monospace; text-align:center; padding-top:100px;">
                <h1>ACCESS DENIED!</h1>
                <p>Invalid Security Key.</p>
                <a href="/" style="color:white;">Try Again</a>
            </body>
        `);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

