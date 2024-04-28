const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    limit: {
        type: Number,
        default: 0
    },
    spent: {
        type: Number,
        required: true,
        default: 0
    },
    alerted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;