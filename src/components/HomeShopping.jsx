import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emptyListImage from '../assets/empty-list.png';

const BASE_URL = 'https://balanced-be-1.onrender.com';

const HomeShopping = ({ user, token }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async (token) => {
      try {
        const response = await fetch(
          '${BASE_URL}/api/auth/shopping/items',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    token && user?.household_id && fetchItems(token);
  }, [token]);

  return (
    <div className='shopping-container green-box border-8 border-black rounded-xl mt-20 mr-8 p-4 h-full flex flex-col relative'>
      <div>
        <h1 className='text-xl text-left ml-5 font-bold mb-2 mt-8'>
          Shopping List
        </h1>
        {items.length === 0 ? (
          <div className='text-center mt-8'>
            <img
              src={emptyListImage}
              alt='Empty Shopping List'
              className='w-48 h-48 mx-auto'
            />
            <p className='text-sm mt-4'>
              Your shopping list is currently empty
            </p>
          </div>
        ) : (
          <ul className='text-left ml-5 list-disc list-inside mb-4'>
            {items.map((item) => (
              <li key={item._id} className='text-sm'>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='btn-shopping text-left absolute bottom-4 left-4 ml-6 mb-6'>
        <Link to='/auth/shoppingpage'>
          <button className='btn-see'>See more</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeShopping;
