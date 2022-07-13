const express = require('express');
const router = express.Router();
const {
  getEntries,
  createEntry,
  editEntry,
  deleteEntry,
} = require('../controllers/entryController');
const { protect } = require('../middleware/authMiddelware');

router.route('/').get(protect, getEntries).post(protect, createEntry);

router.route('/:id').put(protect, editEntry).delete(protect, deleteEntry);

module.exports = router;
