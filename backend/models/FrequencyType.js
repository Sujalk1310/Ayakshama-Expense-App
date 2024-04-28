const mongoose = require('mongoose');

const frequencyTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    gap: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const FrequencyType = mongoose.model('FrequencyType', frequencyTypeSchema);

module.exports = FrequencyType;