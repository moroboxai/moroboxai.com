"use client";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";
import reportWebVitals from "../reportWebVitals";
import { Helmet } from "react-helmet";

import dynamic from "next/dynamic";
import "../index.css";

const App = dynamic(() => import("../App"), { ssr: false });

export default function Page() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <Helmet></Helmet>
                    <App />
                </Router>
            </Provider>
        </React.StrictMode>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
