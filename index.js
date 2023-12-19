// Import required modules
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const swagger = require('./swagger'); // Import the Swagger configuration file

// Create an instance of Express
const app = express();
const port = 3000;

// Create an instance of NodeCache for caching
const cache = new NodeCache();

// SWAPI base URL
const swapiBaseUrl = 'https://swapi.dev/api/';

// Middleware to enable JSON parsing
app.use(express.json());

app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));


// Define a route for fetching people with caching
/**
 * @swagger
 * /people:
 *   get:
 *     summary: Get a list of people
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "results": [...] }
 */
app.get('/people', async (req, res) => {
    try {
        // Check if data is in the cache
        const cachedData = cache.get('people');
        if (cachedData) {
            console.log('Data retrieved from cache');
            return res.json(cachedData);
        }

        // If not in the cache, fetch from SWAPI
        const response = await axios.get(swapiBaseUrl + 'people');
        const data = response.data;

        // Cache the data for future use
        cache.set('people', data, 3600); // Cache for 1 hour

        console.log('Data retrieved from SWAPI');
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route for searching people
/**
 * @swagger
 * /people/search:
 *   get:
 *     summary: Search for people
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "results": [...] }
 */
app.get('/people/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;

        // Check if search term is provided
        if (!searchTerm) {
            return res.status(400).json({ error: 'Search term is required' });
        }

        // Fetch people data from SWAPI
        const response = await axios.get(`${swapiBaseUrl}people/?search=${searchTerm}`);
        const data = response.data;

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Define a route for sorting people
/**
 * @swagger
 * /people/sort:
 *   get:
 *     summary: Sort people based on a parameter
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "results": [...] }
 */
app.get('/people/sort', async (req, res) => {
    try {
        const sortBy = req.query.sortBy;

        // Check if sort parameter is provided
        if (!sortBy) {
            return res.status(400).json({ error: 'Sort parameter is required' });
        }

        // Fetch people data from SWAPI and sort
        const response = await axios.get(`${swapiBaseUrl}people`);
        let data = response.data.results;

        // Implement sorting based on the provided parameter
        switch (sortBy.toLowerCase()) {
            case 'name':
                data.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'height':
                data.sort((a, b) => a.height - b.height);
                break;
            // Add more cases for other sorting options
            default:
                return res.status(400).json({ error: 'Invalid sort parameter' });
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Add more routes for other SWAPI resources, search, sort, etc.

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
