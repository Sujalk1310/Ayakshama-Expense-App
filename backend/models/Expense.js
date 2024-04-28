const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ExpenseType', 
        required: true 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    frequency: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FrequencyType',
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    transactionId: { 
        type: String, 
        default: null,
        trim: true
    },
    merchantName: { 
        type: String, 
        default: null,
        trim: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        default: null,
        trim: true
    },
    expiryDate: { 
        type: Date, 
        default: null 
    }
}, {timestamps: true});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;