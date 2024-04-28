const mongoose = require('mongoose');

const savingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
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
    paid: {
        type: Number,
        required: true,
        default: 0
    },
    frequency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FrequencyType',
        requires: true
    },
    startDate: {
        type: Date,
        required: true
    },
    punchDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const Saving = mongoose.model('Saving', savingSchema);

module.exports = Saving;