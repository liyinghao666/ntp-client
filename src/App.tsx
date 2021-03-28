import React, { useEffect } from 'react';
import './App.less';
import { useSelector, RootStateOrAny } from "react-redux"

function App() {
  useEffect(() => {
    window.api.get("/api/test").then((res: any) => console.log(res))
  }, [])
  const test = useSelector((state: RootStateOrAny) => state.test.get("test"))
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React and Electron
        </a>
        <a href="a">
          {test}
        </a>
      </header>
    </div>
  );
}

export default App;
