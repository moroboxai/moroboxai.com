"use client";

import React from "react";

type AppProps = {
    children: React.ReactNode;
};

class App extends React.Component<AppProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return <React.StrictMode>{this.props.children}</React.StrictMode>;
    }
}

App.propTypes = {};

export default App;
