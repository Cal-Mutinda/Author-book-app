const Book = require("./books.model");

const postBook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book Posted Successfully", book: newBook })
    } catch (error) {
        console.error("Error Adding the Book!", error);
        res.status(500).send({ message: "Failed to Add the Book!" })

    }
}




const getAllBooks = async (req, res) => {

    try {

        const books = await Book.find().sort({ createdAt: -1 })
        res.status(200).send(books)


    } catch (error) {
        console.error("Error fetching the Book!", error);
        res.status(500).send({ message: "Failed to fetch the Book!" })


    }

}

//Get one book
const getOneBook = async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {

            res.status(404).send({ message: "Book Not Found" })


        }
        res.status(200).send(book)


    } catch (error) {
        console.error("Error fetching the Book!", error);
        res.status(500).send({ message: "Failed to fetch the Book!" })


    }

}

//Update Book data
const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const UpdateBook = await Book.findByIdAndUpdate(id, req.body, { new: true })
        if (!UpdateBook) {
            res.status(404).send({ message: "Book not found!" })


        }
        res.status(200).send({
            message: "Book updated successfully",
            book: UpdateBook
        })


    } catch (error) {
        console.error("Error updating data!", error);
        res.status(500).send({ message: "Failed to update the book data!" })

    }
}

//Delete Book data
const DeleteBook = async (req, res) => {

    try {
        const { id } = req.params;
        const DeleteBook = await Book.findByIdAndDelete(id);
        if (!DeleteBook) {
            res.status(404).send({ message: "Book not found!" })

        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: DeleteBook
        })


    } catch (error) {
        console.error("Error deleting book!", error);
        res.status(500).send({ message: "Failed to delete the book data!" })

    }

}

module.exports = {
    postBook,
    getAllBooks,
    getOneBook,
    UpdateBook,
    DeleteBook
}