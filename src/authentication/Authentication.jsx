import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  function Contents() {

    if (isLogin) {
      return <Login showSignUp={ () => setIsLogin(false) } />
    } else {
      return <SignUp showLogin={ () => setIsLogin(true) } />
    }
  }

  return <Contents />
}

export default Authentication;