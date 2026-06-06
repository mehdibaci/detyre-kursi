const express = require('express');
const router = express.Router();

// Importing the transaction controller
const {
    getTransactions,
    setTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
} = require('../controllers/transactionController');

// Importing the protect middleware to secure routes that require authentication
const { protect } = require('../middlewares/authMiddleware');

// @route   GET /api/transactions/summary
// @desc    Get financial summary (income, expense, balance, by category)
// @access  Private
// E vendosim para '/:id' qe Express te mos e ngaterroje 'summary' me nje ID
router.get('/summary', protect, getSummary);

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', protect, getTransactions);

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/', protect, setTransaction);

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put('/:id', protect, updateTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', protect, deleteTransaction);

module.exports = router;
