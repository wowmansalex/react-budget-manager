import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addEntry } from '../features/entries/entrySlice';

const initialFormData = {
  description: '',
  type: '',
  category: 'Groceries',
  amount: '',
};

const EntryForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(addEntry(formData));
    setFormData(initialFormData);
  };

  return (
    <form className='form-control' onSubmit={onSubmit}>
      <label className='label'>
        <span className='label-text'>Enter a description</span>
      </label>
      <input
        name='description'
        value={formData.description}
        type='text'
        onChange={handleChange}
        placeholder='Type here'
        className='input input-bordered w-full max-w-xs'
      />
      <label className='label'>
        <span className='label-text'>Income or Expense?</span>
      </label>
      <input
        value={formData.type}
        name='type'
        type='text'
        onChange={handleChange}
        placeholder='Type here'
        className='input input-bordered w-full max-w-xs'
      />
      <label className='label'></label>
      <div className='input-group'>
        <select
          value={formData.category}
          name='category'
          className='select select-bordered'
          onChange={handleChange}>
          <option disabled defaultValue>
            Pick a category
          </option>
          <option value={'Groceries'}>Groceries</option>
          <option value={'Transportation'}>Transportation</option>
          <option value={'Subscription'}>Subscription</option>
          <option value={'Entertainment'}>Entertainment</option>
          <option value={'Utilities'}>Utilities</option>
          <option value={'Restaurants'}>Restaurans & Bars</option>
        </select>
      </div>
      <label className='label'>
        <span className='label-text'>Enter amount</span>
      </label>
      <label className='input-group'>
        <input
          value={formData.amount}
          name='amount'
          onChange={handleChange}
          type='text'
          placeholder='0.01'
          className='input input-bordered'
        />
        <span>EURO</span>
      </label>
      <button className='btn' type='submit'>
        Add Entry
      </button>
    </form>
  );
};

export default EntryForm;
