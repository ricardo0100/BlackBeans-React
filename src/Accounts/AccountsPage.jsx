import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import EditAccount from './EditAccount';
import AccountsList from './AccountsList';

function AccountsPage() {
  const [state, setState] = useState({
    loading: true,
    error: null,
    accounts: []
  });

  const childRef = useRef();

  const handleKeyDown = (acount) => {
    childRef.current.updateAccount(acount);
  };

  const modalId = 'editAccountModal';

  const editAccountDidSaveCallback = useCallback(() => {
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
      );
  };

  useEffect(() => {
    fetchAccounts();
  });

  function content() {
    if (state.loading == true) {
      return <p>Loading...</p>
    } else {
      return <AccountsList accounts={state.accounts} fetchAccounts={fetchAccounts} openEditAccount={handleKeyDown} />
    }
  }

  function openEditAccount(account) {
    let element = document.getElementById(modalId);
    var modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.show();
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
          <div className='col mb-3'>
            <h1 className='float-start'>Accounts</h1>
            <button type='button' className='btn btn-primary float-end' onClick={() => openEditAccount()}>
              New account
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {content()}
          </div>
        </div>
        <EditAccount ref={childRef} didSaveCallback={editAccountDidSaveCallback} target={modalId} />
      </div>
    );
  }
}

export default AccountsPage;
