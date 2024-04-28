const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { verifyTokenMiddleware } = require('../utils/jwtResolver');
const BlacklistToken = require('../models/BlacklistToken');
const User = require('../models/User');
const ExpenseType = require('../models/ExpenseType');
const FrequencyType = require("../models/FrequencyType");
const Category = require("../models/Category");
const axios = require('axios');
const Expense = require("../models/Expense");

router.use(verifyTokenMiddleware);

router.get('/test', (req, res) => {
    return res.status(201).send("Passed");
})

router.get('/types', async (req, res) => {
    try {
        const expenses = await ExpenseType.find();
        return res.status(201).json({ data: expenses });

    } catch (error) {
        return res.status(500).json({ message: `Oops! An error occured: ${error}` });
    }
}) 

router.get('/frequencies', async (req, res) => {
    try {
        const frequencies = await FrequencyType.find();
        return res.status(201).json({ data: frequencies });

    } catch (error) {
        res.status(500).json({ message: `Oops! An error occured: ${error}` });
    }
}) 

router.get('/categories', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.headers.uid });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const categories = await Category.find({ user: user._id });
        return res.status(201).json({ data: categories });
    } catch (error) {
        return res.status(500).json({ message: `Oops! An error occurred: ${error}` });
    }
});

router.post('/add/category', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.headers.uid });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const { name, limit } = req.body;
        if (!name || !limit) {
            return res.status(400).json({ message: "Name and limit are required fields." });
        }

        await Category.create({ user: user._id, name, limit, spent: 0, alerted: false });
        return res.status(201).json({ message: "Category Added Successfully." });
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({ message: "Oops! An error occurred while adding the category." });
    }
});

router.get("/expenses", async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.headers.uid });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const expenses = await Expense.find({ user: user._id })
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'type', select: 'type' })
            .populate({ path: 'frequency', select: 'type' })
            .sort({ createdAt: -1 });
        return res.status(201).json({ data: expenses });
        
    } catch (error) {
        return res.status(500).json({ message: `Oops! An error occured: ${error}` });
    }
})

router.post("/add/expense", async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.headers.uid });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        let { type, transactionId, merchantName, amount, description, frequency, startDate, category } = req.body;
        if (!type || !amount || !category) {
            return res.status(400).json({ message: "Incorrect request fields." });
        }

        const typeInstance = await ExpenseType.findOne({ type: type });
        if (!typeInstance) {
            return res.status(404).json({ message: "Type instance not found." });
        }
        const frequencyInstance = await FrequencyType.findOne({ type: frequency });
        if (!frequencyInstance) {
            return res.status(404).json({ message: "Frequency instance not found." });
        }
        
        const categoryInstance = await Category.findOne({ name: category, user: user._id });
        if (!categoryInstance) {
            if (category === 'Miscellaneous') {
                await Category.create({ user: user._id, name: 'Miscellaneous', limit: null, spent: amount, alerted: false });
                return res.status(201).json({ message: "Expense added successfully." });
            }
            return res.status(404).json({ message: "Category instance not found." });
        }

        if (description === '') description = null;
        if (transactionId === '') transactionId = null;
        if (merchantName === '') merchantName = null;
        if (startDate === '') startDate = new Date();
        else if (startDate) startDate = new Date(startDate);

        const expiryDate = new Date(startDate);
        expiryDate.setDate(expiryDate.getDate() + frequencyInstance.gap);

        const typeId = typeInstance._id;
        const categoryId = categoryInstance._id;
        const frequencyId = frequencyInstance._id;

        await Expense.create({ user: user._id, type: typeId, transactionId, merchantName, amount, description, frequency: frequencyId, startDate, category: categoryId, expiryDate });

        const newAmount = categoryInstance.spent + parseInt(amount);

        await Category.findByIdAndUpdate(categoryInstance._id, { spent: newAmount });
        
        if (category !== 'Miscellaneous' && newAmount >= categoryInstance.limit) {
            return res.status(201).json({ message: "Warning: Budget limit crossed!", flag: 1 });
        }

        if (category !== 'Miscellaneous' && newAmount >= categoryInstance.limit * 0.9) {
            return res.status(201).json({ message: "Warning: 90% budget limit exhausted!", flag: 1 });
        }

        return res.status(201).json({ message: "Expense added successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Oops! An error occurred: ${error}` });
    }
})

router.post("/llm", async (req, res) => {
    try {
        const query = req.body['query'];
        const response = await axios.post('http://127.0.0.1:5000/llm', { query });
        const data = response.data;
        return res.status(201).json({ data });
    } catch (error) {
        return res.status(500).json({ message: `Oops! An error occured: ${error}` });
    }
})


router.post("/logout", async (req, res) => {
    try {
        await BlacklistToken.create({ token: req.headers.authorization });
        return res.status(201).json({
            message: "User logged out."
        });
    } catch (error) {
        return res.status(500).json({ message: `Oops! An error occured: ${error}` });
    }
});

module.exports = router;

