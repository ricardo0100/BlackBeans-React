import { useState } from 'react';

const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function showSignUp() {
    props.showSignUp();
  }

  function fetchLogin() {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    fetch('http://127.0.0.1:5000/login', {
      body: formData,
      method: 'POST'
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          //TODO: Handle error
        }
      );
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <a className='navbar-brand' href='#'>Black Beans</a>
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-lg-4">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <form className="col-lg-4">
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="button" className="btn btn-secondary" onClick={() => showSignUp()}>Sign Up</button>
            <button type="button" className="btn btn-primary float-end" onClick={() => fetchLogin()}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
