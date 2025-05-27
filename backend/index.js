const express = require('express')
const app = express()
const cors = require("cors");

const mongoose = require('mongoose');
const port = 3000

require('dotenv').config()


//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))


//routes

const bookRoutes = require('./src/books/book.route')
const userRoutes = require("./src/users/user.route")
app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)


async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Calebs Server 2025!')
    })
}


main().then(() => console.log("Mongodb Successfully Connected")).catch(err => console.log(err));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
