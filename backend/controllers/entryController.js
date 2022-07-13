const express = require('express');
const asyncHandler = require('express-async-handler');

const Entry = require('../model/entryModel');
const User = require('../model/userModel');

const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find({ user: req.user.id });
  res.status(200).json(entries);
});

const createEntry = asyncHandler(async (req, res) => {
  const { description, type, category, amount } = req.body;

  const entry = await Entry.create({
    description,
    type,
    category,
    amount,
    user: req.user.id,
  });
  res.status(200).send(entry);
});

const editEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(400);
    throw new Error('goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedEntry);
});

const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  await entry.remove();

  res.status(200).send('Entry removed');
});

module.exports = {
  getEntries,
  createEntry,
  editEntry,
  deleteEntry,
};
