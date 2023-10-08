import Menu from "./components/Menu";
import Home from "./components/Home";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Menu />
                <Home />
            </header>
        </div>
    );
}

export default App;
