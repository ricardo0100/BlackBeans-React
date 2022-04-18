import React from 'react'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ColorPicker from './ColorPicker';

const EditAccount = forwardRef((props, ref) => {

  const [accountId, setAccountId] = useState(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    saveAccount();
  }

  useImperativeHandle(ref, () => ({
    updateAccount: (account) => {
      updateWithAccount(account);
    }
  }));

  function updateWithAccount(account) {
    if (account == null) return;
    setAccountId(account.id);
    setName(account.name);
    setColor(account.color);
    var modal = bootstrap.Modal.getOrCreateInstance(document.getElementById(props.target));
    modal.show();
  }

  function closeModal() {
    var modal = bootstrap.Modal.getOrCreateInstance(document.getElementById(props.target));
    props.didSaveCallback();
    modal.hide();
    setName('');
    setColor('');
  }

  function saveAccount() {
    if (name.trim() == '') {
      setNameError('Name is required');
      return;
    }
    setNameError(null);
    setLoading(true);

    let method = accountId == null ? 'POST' : 'PUT';
    let url = accountId == null ? 'http://127.0.0.1:5000/accounts' : 'http://127.0.0.1:5000/account/' + accountId;
    console.log(method);
    console.log(url);

    fetch(url, {
      method: method,
      body: JSON.stringify({ name: name, color: color, lastSavedTime: 0, createdTime: 0, isActive: true }),
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
        }
      )
  }

  function NameErrorMessage() {
    if (nameError) return <p className='text-danger'>Name is required.</p>;
    return null;
  }

  useEffect(() => {
    if (props.account) {
      setName(props.account.name);
      setColor(props.account.color);
    }
  }, []);

  return (
    <div className='modal fade' id={props.target} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
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
              <ColorPicker callback={(color) => { setColor(color) }} selectedColor={color} />
            </div>
            <div className='modal-footer'>
              <button type='submit' className='btn btn-primary' disabled={loading}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default EditAccount;
