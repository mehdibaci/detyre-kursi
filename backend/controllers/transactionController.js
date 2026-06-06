const asyncHandler = require('express-async-handler');

// Importing the Transaction model and User model to interact with the database
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

// @desc    Merr te gjitha transaksionet e perdoruesit te kyçur
const getTransactions = asyncHandler(async (req, res) => {
    // Fetch all transactions that belong to the logged-in user, newest first
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
});

// @desc    Krijo nje transaksion te ri
const setTransaction = asyncHandler(async (req, res) => {
    const { description, amount, type, category } = req.body;

    // Kontrollojme qe fushat kryesore jane plotesuar
    if (!description || amount === undefined || amount === null) {
        res.status(400);
        throw new Error('Please add a description and an amount');
    }

    // Krijojme transaksionin dhe e lidhim me ID-ne e perdoruesit te kyçur
    const transaction = await Transaction.create({
        description,
        amount,
        type: type || 'expense',
        category: category || 'Te tjera',
        user: req.user.id
    });
    res.status(200).json(transaction);
});

// @desc    Perditeso nje transaksion ekzistues
const updateTransaction = asyncHandler(async (req, res) => {
    // Kontrollojme nese transaksioni ekziston
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
        res.status(400);
        throw new Error('Transaction not found');
    }

    // Kontrollojme nese perdoruesi ekziston
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Kontrollojme nese perdoruesi i kyçur perputhet me pronarin e transaksionit
    if (transaction.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Perditesojme transaksionin me te dhenat e reja
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTransaction);
});

// @desc    Fshi nje transaksion
const deleteTransaction = asyncHandler(async (req, res) => {
    // Kontrollojme nese transaksioni ekziston
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
        res.status(400);
        throw new Error('Transaction not found');
    }

    // Kontrollojme nese perdoruesi ekziston
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Kontrollojme nese perdoruesi i kyçur perputhet me pronarin e transaksionit
    if (transaction.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Fshijme transaksionin nga databaza
    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `Transaction ${req.params.id} deleted.` });
});

// @desc    Llogarit permbledhjen financiare (te ardhura, shpenzime, bilanc, sipas kategorive)
// Kjo behet ne backend qe frontend-i te mos perserise llogaritjet.
const getSummary = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id });

    let totalIncome = 0;
    let totalExpense = 0;
    const byCategory = {};

    // Pershkojme çdo transaksion dhe mbledhim totalet
    transactions.forEach((t) => {
        if (t.type === 'income') {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
            // Grupojme shpenzimet sipas kategorise (per grafikun)
            byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
        }
    });

    res.status(200).json({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        byCategory,
        count: transactions.length,
    });
});

module.exports = { getTransactions, setTransaction, updateTransaction, deleteTransaction, getSummary };
