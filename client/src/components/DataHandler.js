import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default (recipe) => {
  const sendData = async () => {
    try {
      const res = await axios.post('/newrecipe', recipe);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  sendData();
}
