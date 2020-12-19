import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../container/Home/index";
import Chat from "../container/chat app/index";
class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route path="/chat" component={Chat} />
            </Router>
        );
    }
}

export default AppRouter;
