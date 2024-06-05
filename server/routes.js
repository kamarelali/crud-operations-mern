const express = require('express');
const User = require('./user');

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  const { name } = req.body;

  try {
    const user = new User({ name });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).send({message:"User updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).send({message:"User deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
