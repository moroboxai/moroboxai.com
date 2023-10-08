"use client";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("@/components/Menu"), { ssr: false });

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
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <Menu />
                            {this.props.children}
                        </header>
                        <ScrollToTop smooth />
                    </div>
                </Router>
            </React.StrictMode>
        );
    }
}

App.propTypes = {};

export default App;
