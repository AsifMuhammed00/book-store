const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require('cors');
const { ObjectId } = require('mongodb');

const { connectDB } = require('./db');


app.use(bodyParser.json());
app.use(cors());


app.post('/api/books', async (req, res) => {
    try {
        const { db, client } = await connectDB();
        const bookCollection = db.collection('books');
        const newBook = req.body;
        console.log(newBook);

        const result = await bookCollection.insertOne(newBook);
        console.log(result);

        await client.close();

        res.status(201).json({ ...newBook, _id: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add book' });
    }
});


app.get('/api/books', async (req, res) => {
    try {
        const { db, client } = await connectDB();
        const bookCollection = db.collection('books');
        const { page = 1, pageSize = 10, search = '' } = req.query;
        const skip = (page - 1) * pageSize;
        const query = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        };
        console.log("Asif");
        const books = await bookCollection.find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(parseInt(pageSize))
            .toArray();

        const totalCount = await bookCollection.countDocuments(query);

        await client.close();

        res.status(200).json({ books, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});


app.put('/api/books/:id', async (req, res) => {
    try {
        const { db, client } = await connectDB();
        const bookCollection = db.collection('books');
        const id = req.params.id;
        const updatedBook = req.body;

        const result = await bookCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedBook });

        await client.close();

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ ...updatedBook, _id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

app.delete('/api/books/:id', async (req, res) => {
    try {
        const { db, client } = await connectDB();
        const bookCollection = db.collection('books');
        const id = req.params.id;

        const result = await bookCollection.deleteOne({ _id: new ObjectId(id) });

        await client.close();

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});
app.listen(port, () => console.log(`Server running on port ${port}`));