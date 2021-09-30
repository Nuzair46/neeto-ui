import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Playground from "./Playground";
import { ToastContainer } from "react-toastify";
import { Button } from "../../neetoui";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Button/>
      <Switch>
        <Route path="/" component={Playground} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
