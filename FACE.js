const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulated database of registered faces (for demonstration purposes)
const registeredFaces = [];

// API endpoint to handle attendance marking
app.post('/api/attendance', async (req, res) => {
    const {
        image
    } = req.body;

    // Simulate face recognition logic
    const recognizedUser = registeredFaces.find((user) => user.faceData === image);

    if (recognizedUser) {
        // Simulate successful recognition
        return res.json({
            success: true,
            message: `Attendance marked for ${recognizedUser.name}`
        });
    } else {
        // Simulate failed recognition
        return res.json({
            success: false,
            message: 'Face not recognized.'
        });
    }
});

// API endpoint to register a new person
app.post('/api/register', async (req, res) => {
    const {
        name,
        image
    } = req.body;

    if (!name || !image) {
        return res.status(400).json({
            success: false,
            message: 'Name and image are required.'
        });
    }

    // Add the new person to the database
    registeredFaces.push({
        name,
        faceData: image
    });
    return res.json({
        success: true,
        message: `New person "${name}" registered successfully.`
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});