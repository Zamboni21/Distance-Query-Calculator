import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const index = express();
const PORT = process.env.PORT || 3000;

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));
index.use(express.static(path.join(__dirname, '../public')));

let queries = [];

index.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'index.html'));
});

index.post('/query', (req, res) => {
    const {source, destination, distance} = req.body;
    const query = {source, destination, distance, timestamp: new Date()};
    queries.push(query);
    res.status(201).json(query);
});

index.get('/queries', (req, res) => {
    res.status(200).json(queries);
});

index.get('/queriesView', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/queries.html'));
});

index.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});