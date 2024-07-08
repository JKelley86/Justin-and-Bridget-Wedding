// server.js
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, req.file.path);

    try {
        const response = await drive.files.create({
            requestBody: {
                name: req.file.originalname,
                mimeType: req.file.mimetype,
            },
            media: {
                mimeType: req.file.mimetype,
                body: fs.createReadStream(filePath),
            },
        });

        fs.unlinkSync(filePath); // remove file from server after upload
        res.status(200).json({ fileId: response.data.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
