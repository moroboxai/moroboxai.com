import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Menu from "@/components/Menu";
import "@/app.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <Menu />
                        <Component {...pageProps} />
                    </header>
                </div>
            </Provider>
        </>
    );
}
