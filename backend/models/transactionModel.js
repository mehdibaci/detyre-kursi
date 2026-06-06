const mongoose = require("mongoose");

// Skema e transaksionit - ngjashem me taskSchema te seminarit, por me me shume fusha.
// Çdo transaksion i perket nje perdoruesi te caktuar (lidhja user -> dokument).
const transactionSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "Please add a description"],
        },
        amount: {
            type: Number,
            required: [true, "Please add an amount"],
            min: [0, "Amount cannot be negative"],
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"],
            default: "expense",
        },
        category: {
            type: String,
            required: true,
            default: "Te tjera",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);
