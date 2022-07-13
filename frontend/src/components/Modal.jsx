import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';

const Modal = () => {
  const dispatch = useDispatch();
  return <div>Test MOdal</div>;
};

export default Modal;
