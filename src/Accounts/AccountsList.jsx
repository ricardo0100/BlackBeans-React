import React from 'react';

function AccountsList(props) {

  function onAccountClick(account) {
    props.openEditAccount(account);
  }

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const items = props.accounts.map((account) => {
    let sumColor = account.total >= 0 ? 'text-success' : 'text-danger';
    return (
      <button className='list-group-item list-group-item-action ps-0 pe-0' key={account.id} onClick={() => onAccountClick(account)}>
        <div className="hstack gap-1">
          <i className="bi-circle-fill" style={{ color: account.color }} />
          <div className="me-auto m-1">
            <p className='mb-0'>{account.name}</p>
          </div>
          <p className='mb-0'><b className={sumColor}>{formatter.format(account.total)}</b></p>
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
