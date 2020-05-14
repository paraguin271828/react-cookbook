import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default (recipe, option) => {
  const sendData = async () => {
    try {
      const res = await axios.post('/newrecipe/'+option, recipe);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  sendData();
}
