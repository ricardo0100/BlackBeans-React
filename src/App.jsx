import LoggedApp from "./LoggedApp";
import Authentication from './Authentication';
import './assets/bootstrap.min.css';
import './assets/bootstrap.min.js';

const App = () => {
  function Content() {
    let isAuthenticated = false;
    if(isAuthenticated) {
      return <LoggedApp />
    }
    return <Authentication />
  }
  return (
    <Content />
  );
}

export default App
