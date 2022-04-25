
const Login = (props) => {

  function showSignUp() {
    props.showSignUp();
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
              <input type="email" className="form-control" id="inputEmail" />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" />
            </div>
            <button type="submit" className="btn btn-secondary" onClick={() => showSignUp()}>Sign Up</button>
            <button type="submit" className="btn btn-primary float-end">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
