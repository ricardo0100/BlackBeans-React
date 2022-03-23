import React from 'react'
import { useState, useEffect } from 'react';
import EditAccount from './EditAccount';

function AccountsList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchAccounts() {
    setLoading(true);
    fetch('http://127.0.0.1:5000/', {
      headers: new Headers({
        'Authorization': 'Bearer a16923f4-922d-4a87-96fb-9922442418a2'
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        setLoading(false);
        setAccounts(result);
        console.log("OK");
      },
      (error) => {
        setLoading(false);
        setError(error);
        console.log("ERROR");
      }
    )
  }

  useEffect(() => {
    if (loading == false && error == null && accounts.length == 0) {
      fetchAccounts();
    }
  });

  const accountsCards = accounts.map((account) => {
    return (
      <div className='col-4 mt-3' key={account.id}>
        <div className='card'>
          <div className='card-body'>
            <p className='text-center'>{account.name}</p>
          </div>
        </div>
      </div>
    );
  });

  function content() {
    if (loading == true) {
      return <p>Loading...</p>
    } else {
      return accountsCards
    }
  }

  if (error != null) {
    return (
      <div className='container mt-3'>
        <div className='row'>
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container mt-3'>
        <button type='button' className='btn btn-primary float-end' data-bs-toggle='modal' data-bs-target='#newAccoundModal'>
          New account
        </button>

        <EditAccount />
        <div className='row'>
          { content() }
        </div>
      </div>
    );
  }
}

export default AccountsList
