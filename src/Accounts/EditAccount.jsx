import React from 'react'
import { useState } from 'react';

function EditAccount(props) {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    saveAccount();
  }

  function closeModal() {
    var myModalEl = document.getElementById('newAccountModal');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    props.fetchAccounts();
    modal.hide();
  }

  function saveAccount() {
    if (name.trim() == '') {
      setNameError('Name is required');
      return;
    }
    setNameError(null);
    setLoading(true);

    fetch('http://127.0.0.1:5000/accounts', {
      method: 'POST',
      body: JSON.stringify({ name: name, lastSavedTime: 0, createdTime: 0 }),
      headers: new Headers({
        'Authorization': 'Bearer a16923f4-922d-4a87-96fb-9922442418a2',
        'Content-Type': 'application/json'
      })
    })
      .then(
        (result) => {
          setLoading(false);
          closeModal();
        },
        (error) => {
          setLoading(false);
          closeModal();
        }
      )
  }

  function NameErrorMessage() {
    if (nameError) return <p>Name is required.</p>;
    return null;
  }

  return (
    <div className='modal fade' id='newAccountModal' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <form onSubmit={handleSubmit}>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>New Account</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' disabled={loading}></button>
            </div>
            <div className='modal-body'>
              <label className={'form-label'} required>Name</label>
              <input type='text' className='form-control' value={name} onChange={e => setName(e.target.value)} />
              {<NameErrorMessage />}
            </div>
            <div className='modal-footer'>
              <button type='submit' className='btn btn-primary' disabled={loading}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
