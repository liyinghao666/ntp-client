import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"

function App() {
  window.api.receive("toRendererProcess", () => {});
  window.api.send("toMainProcess", "aaa");
  window.api.invoke("invoke", "我在invoke").then((res: any) => console.log(res))
  const dispatch = useDispatch()
  dispatch({
    type: "TEST"
  })
  const test = useSelector((state: RootStateOrAny) => state.test.get("test"))
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a>
          {test}
        </a>
      </header>
    </div>
  );
}

export default App;
