import React from 'react'
import { useCallback } from 'react';

function AccountsList(props) {

  function onAccountClick(account) {
    props.openEditAccount(account);
  }

  const items = props.accounts.map((account) => {
    return (
      <button className='list-group-item list-group-item-action' key={account.id} onClick={() => onAccountClick(account)}>
        <div className="hstack gap-4">
          <i className="bi-circle-fill" style={{ color: account.color }} />
          <div className="me-auto">
            <h5>{account.name}</h5>
          </div>
          <p className='text-success'><b>R$ 2.123,44</b></p>
        </div>
      </button>
    );
  });

  return (
    <>
      <ul className='list-group list-group-flush'>
        {items}
      </ul>
    </>
  );
}

export default AccountsList;
