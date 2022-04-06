import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import EditAccount from './EditAccount';
import AccountsList from './AccountsList';

function AccountsPage() {
  const [state, setState] = useState({
    loading: true,
    error: null,
    accounts: []
  });

  const handleCallback = useCallback(() => {
    fetchAccounts();
  }, []);

  function fetchAccounts() {
    if (!state.loading) return;

    fetch('http://127.0.0.1:5000/accounts', {
      headers: new Headers({
        'Authorization': 'Bearer a16923f4-922d-4a87-96fb-9922442418a2'
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setState({
            loading: false,
            error: null,
            accounts: result
          });
        },
        (error) => {
          setState({
            loading: false,
            error: error,
            accounts: []
          });
        }
      )
  };

  useEffect(() => {
    fetchAccounts();
  });

  function content() {
    if (state.loading == true) {
      return <p>Loading...</p>
    } else {
      return <AccountsList accounts={state.accounts} />
    }
  }

  if (state.error != null) {
    return (
      <div className='container mt-3'>
        <div className='row'>
          <p>Error: {state.error.message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-3'>
            <h3>Accounts</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-8'>
            {content()}
          </div>
          <div className='col-4'>
            <button type='button' className='btn btn-primary float-end' data-bs-toggle='modal' data-bs-target='#newAccountModal'>
              New account
            </button>
            <EditAccount fetchAccounts={handleCallback} />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountsPage;
