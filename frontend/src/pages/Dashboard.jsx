import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ScaleIcon } from '@heroicons/react/solid';
import { getEntries } from '../features/entries/entrySlice';
import { openModal } from '../features/modal/modalSlice';

import EntryForm from '../components/EntryForm';
import Entry from '../components/Entry';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { entries } = useSelector(state => state.entry);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getEntries());
  }, [user, navigate]);

  return (
    <div className='my-4 container mx-auto'>
      <h1 className='font-bold text-xl text-center my-4'>
        {user.name + "'s " + 'Wallet'}
      </h1>
      <section className='border w-auto h-auto'>
        <div className='mx-2 my-3 flex flex-row justify-items-start'>
          <ScaleIcon className='w-6 mx-2' />
          <h1 className='text-xl mx-1'>Balance</h1>
          <span className='mx-1 text-xl'>{'$' + user.balance}</span>
          <button
            type='button'
            className='mx-2 btn btn-sm btn-outline'
            onClick={() => dispatch(openModal())}>
            Add Funds
          </button>
        </div>
        <div className='mx-auto my-6 w-6/12 '>
          <div className='grid grid-cols-2 gap-4'>
            <div className='w-12/12 h-20 bg-red-400'>
              <h3 className='font-bold mx-2'>Expense</h3>
              <div className='mx-32'>$0.000</div>
            </div>
            <div className='w-12/12 h-20  bg-green-400'>
              <h3 className='font-bold mx-2'>Income</h3>
              <div className='mx-32'>$0.000</div>
            </div>
          </div>
        </div>
      </section>
      <section className='border w-auto h-auto'>
        <h1 className='text-xl mx-2'>Entries</h1>
        {entries.map(entry => {
          return <Entry key={entry.id} entry={entry} />;
        })}
      </section>
      <hr />
      <section>
        <h1>Add Entry</h1>
        <EntryForm />
      </section>
    </div>
  );
}

export default Dashboard;
