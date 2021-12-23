import './style.scss';
import Dashboard from '../../pages/Dashboard';
import Login from '../Login';
import Header from '../Header';

import {useState, useEffect} from 'react';

function App() {
  const [codeAPI, setCodeAPI] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(codeAPI) return;
    const code = new URLSearchParams(window.location.search).get("code");
    if(code) setIsLoggedIn(true);
    setCodeAPI(code);
  }, [codeAPI]);

  return (
    <div className="app">
      <Header />
      {codeAPI
        ? <Dashboard code={codeAPI} />
        : <Login />
      }
    </div>
  );
}

export default App;
