"use client";

import React from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import dynamic from "next/dynamic";
import "./app.scss";

const Menu = dynamic(() => import("../components/Menu"), { ssr: false });

type AppProps = {
    children: React.ReactNode;
};

class App extends React.Component<AppProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <React.StrictMode>
                <Provider store={store}>
                    <Router>
                        <div className="App">
                            <header className="App-header">
                                <Menu />
                                {this.props.children}
                            </header>
                            <ScrollToTop smooth />
                        </div>
                    </Router>
                </Provider>
            </React.StrictMode>
        );
    }
}

App.propTypes = {};

export default App;
