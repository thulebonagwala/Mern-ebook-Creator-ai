const Book = require("../models/Book");

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Please provide a title and author" });
    }

    const book = await Book.create({
      userId: req.user._id,
      title,
      author,
      subtitle,
      chapters,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};