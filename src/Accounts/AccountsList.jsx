import React from 'react'

function AccountCard(props) {
  const items = props.accounts.map((account) => {
    return (
      <li className='list-group-item' key={account.id}>
        <i class="bi-circle-fill" style={{ color: account.color }}></i> {account.name}
      </li>
    );
  });

  return (
    <ul className='list-group'>
      {items}
    </ul>
  );
}

export default AccountCard;
