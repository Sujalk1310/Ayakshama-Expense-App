const mongoose = require('mongoose');

const expenseTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

const ExpenseType = mongoose.model('ExpenseType', expenseTypeSchema);

module.exports = ExpenseType;