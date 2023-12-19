const {Pool} = require('pg');
const express = require('express');
const dotenv = require('dotenv')
const app = express();
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3000;
dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors())



//get route
app.get('/api/book', async (req, res, next) => {
    try {
        const query = 'SELECT * FROM book;';
        const result = await pool.query(query);
        res.status(200).send(result.rows);
    } catch (err) {
        next(err);
    }
});

//get 1 route
app.get('/api/book/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        if(isNaN(id)) {
            errorMessage()
        }
        const query = `SELECT * FROM book WHERE book_id = $1`;
        const result = await pool.query(query, [id]);

        if(result.rows.length === 0) {
            res.status(404).json({error: 'Book not found'});
        } else {
            res.status(200).json(result.rows[0])
        }
    } catch(err) {
        next(err)
    }
})
//post route
app.post('/api/book', async (req, res, next) => {
    try {
        const {title, author, summary, picture, price} = req.body
        const query = `INSERT INTO book (title, author, summary, picture, price)
         VALUES($1, $2, $3, $4, $5) 
         RETURNING *;`
        const result = await pool.query(query, [title, author, summary, picture, price])
        res.status(201).json(result.rows[0])
    } catch(err) {
        next(err)
    }
})

//update route
app.put('/api/book/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, author, summary, picture, price} = req.body
        const query = `UPDATE book SET title = $1, author = $2, summary = $3, picture = $4, price= $5 WHERE book_id = $6 RETURNING *`
        const result = await pool.query(query, [title, author, summary, picture, price, id])
        res.status(200).json(result.rows[0])
    } catch(err) {
        next(err)
    }
})

//delete route
app.delete('/api/book/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const query = `DELETE FROM book WHERE book_id = $1 RETURNING *`
        const result = await pool.query(query, [id])

        if(result.rows.length === 0) {
            res.status(404).json({error: 'Book not found'});
        } else {
            res.status(200).json(result.rows[0])
        }
    } catch(err) {
        next(err)
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.use((req, res, next) => {
    const err = new Error('NOT FOUND ☹️');
    err.status = 404;
    next(err)
})

app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const errorMessage =
        statusCode === 500 ? 'Internal Server Error' : err.message;

    res.status(statusCode).json({ error: errorMessage, stack: err.stack });
});


app.listen(PORT, (req, res) => {
    console.log(`Listening in on port: ${PORT}`)
})

function errorMessage() {
    const err  = new Error('NOT FOUND 🙃');
    err.status = 404;
    throw err;
}