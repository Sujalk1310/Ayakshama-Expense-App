const mongoose = require('mongoose');
const Category = require('./models/Category');
const Expense = require('./models/Expense');
const ExpenseType = require('./models/ExpenseType');
const FrequencyType = require('./models/FrequencyType');
const Saving = require('./models/Saving');
const User = require('./models/User');
const { v4: uuidv4 } = require('uuid');

const expenseTypeData = [
    {
        type: "Recurring"
    },
    {
        type: "One-Time"
    },
    {
        type: "Miscellaneous"
    }
]

const frequencyTypeData = [
    {
        type: "Daily",
        gap: 1
    },
    {
        type: "Weekly",
        gap: 7
    },
    {
        type: "Monthly",
        gap: 30
    },
    {
        type: "Yearly",
        gap: 365
    }
]

const insertIntoDB = async () => {
    try {
        await ExpenseType.insertMany(expenseTypeData);
        console.log("Deafult Expense Types added");
        await FrequencyType.insertMany(frequencyTypeData);
        console.log("Default Frequency Types added");
    } catch (error) {
        console.log(error);
    }
}

module.exports = insertIntoDB;

