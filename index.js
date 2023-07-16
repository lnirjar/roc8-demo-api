const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express()

app.use(cors())

const generateToken = async () => {
    const endpoint = 'https://devcore02.cimet.io/v1/generate-token';

    const response = await axios.post(endpoint, {}, {
        headers: {
            'Api-Key': process.env.API_KEY,
            'Content-Type': 'application/json'
        }
    });

    const token = response.data?.data?.token;

    return token;
}

const getPlanList = async (token) => {
    const endpoint = 'https://devcore02.cimet.io/v1/plan-list';

    const body = { "session_id": "eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9" };

    const response = await axios.post(endpoint, body, {
        headers: {
            'Api-Key': process.env.API_KEY,
            'Auth-token': token,
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

app.post('/plan-list', async (req, res) => {
    try {
        const token = await generateToken();
        const data = await getPlanList(token);
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
