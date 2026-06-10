const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all expenses
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add expense
router.post('/', auth, async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const newExpense = new Expense({
      user: req.user,
      title,
      amount,
      category,
      date: date || Date.now()
    });
    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit expense
router.put('/:id', auth, async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
