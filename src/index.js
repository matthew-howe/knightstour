import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import * as serviceWorker from "./serviceWorker.tsx";
import { Provider } from "react-redux";
import store from "./store";
import GitHubForkRibbon from "react-github-fork-ribbon";

const Ribbon = () => (
  <GitHubForkRibbon
    href="//www.github.com/matthew-howe/knightstour"
    target="_blank"
    position="right"
  >
    Fork me on GitHub
  </GitHubForkRibbon>
);

ReactDOM.render(
  <Provider store={store}>
    <Ribbon />
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
