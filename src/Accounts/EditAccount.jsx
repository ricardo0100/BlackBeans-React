import React from 'react'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ColorPicker from './ColorPicker';

const EditAccount = forwardRef((props, ref) => {

  const [accountId, setAccountId] = useState(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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
    setAccountId(null);
    setShowDeleteAlert(false);
  }

  function saveAccount(isDeletion) {
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
      body: JSON.stringify({ name: name, color: color, lastSavedTime: 0, createdTime: 0, isActive: !isDeletion }),
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

  let title = accountId == null ? 'New account' : 'Edit account';

  function DeleteButton() {
    return accountId == null ? <span /> : <button hidden={showDeleteAlert} type='button' className='btn btn-danger float-start' onClick={() => setShowDeleteAlert(true)}>Excluir</button>;
  }

  function deleteAccount() {
    saveAccount(true);
  }

  return (
    <div className='modal fade modal-md' id={props.target} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <form>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>{title}</h5>
              <button type='button' className='btn-close' aria-label='Close' disabled={loading || showDeleteAlert} onClick={closeModal}></button>
            </div>
            <div className='modal-body'>
              <label className={'form-label'} required>Name</label>
              <input type='text' className='form-control' value={name} onChange={e => setName(e.target.value)} />
              {<NameErrorMessage />}
              <ColorPicker callback={(color) => { setColor(color) }} selectedColor={color} />
            </div>
            <div className='modal-footer'>
              <DeleteButton />
              <button type='button' className='btn btn-primary' hidden={loading || showDeleteAlert} onClick={() => saveAccount(false)}>Save</button>
              <div className="w-100 alert alert-danger" role="alert" hidden={!showDeleteAlert}>
                <h6 className='mb-3'>Are you sure you want to delete this account?</h6>
                <div className='d-flex justify-content-end'>
                  <button type='button' className='btn btn-light' onClick={() => setShowDeleteAlert(false)}>Cancel</button>
                  <button type='button' className='btn btn-danger ms-3' onClick={() => deleteAccount()}>Delete</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default EditAccount;
