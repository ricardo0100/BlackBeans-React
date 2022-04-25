import { useState } from 'react';
import Login from './Login';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  function Content() {
    if (isLogin) {
      return <Login showSignUp={ () => setIsLogin(false) } />
    } else {
      return <button onClick={() => setIsLogin(true)}>Go to Login</button>
    }
  }

  return <Content />
}

export default Authentication;