import React from "react";
import type { IPlayer } from "moroboxai-player-web";
import type { Language } from "moroboxai-editor-react";
import Player from "moroboxai-player-react";
import Editor from "moroboxai-editor-react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { IGameInfo, IGamesDb } from "../redux/actions";
import {
    dispatchGamesDbLoaded,
    dispatchSelectGame
} from "../redux/dispatchers";
import { getGames, getSelectedGame } from "../redux/selectors";
import { Actions } from "../redux/actions/types";
import jsyaml from "js-yaml";
import "./PlayerSection.css";

const REACT_APP_URL_GAMES_YML = import.meta.env.VITE_URL_GAMES_YML;

const mapStateToProps = (state: any) => ({
    games: getGames(state),
    selectedGame: getSelectedGame(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
    return {
        gamesDbLoaded: dispatchGamesDbLoaded(dispatch),
        selectGame: dispatchSelectGame(dispatch)
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
});

type ReduxProps = ConnectedProps<typeof connector>;

type PlayerSectionProps = ReduxProps & {
    className?: string;
};

type PlayerSectionState = {
    player?: IPlayer;
};

class PlayerSection extends React.Component<
    PlayerSectionProps,
    PlayerSectionState
> {
    static propTypes: any;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleMount = this.handleMount.bind(this);
        this.handleSelectGame = this.handleSelectGame.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleUnload = this.handleUnload.bind(this);
    }

    componentDidMount(): void {
        console.log(import.meta.env);
        if (REACT_APP_URL_GAMES_YML === undefined) {
            console.error("REACT_APP_URL_GAMES_YML undefined");
            return;
        }

        fetch(REACT_APP_URL_GAMES_YML)
            .then((response) => response.text())
            .then((data) => jsyaml.load(data))
            .then((data) => {
                if (data === null || typeof data !== "object") {
                    throw "Invalid data";
                }

                console.log("Games db loaded", data);
                this.props.gamesDbLoaded(data as IGamesDb);
            })
            .catch((error) => console.log(error));
    }

    handleMount(player: IPlayer) {
        console.log("player mounted");
        this.setState({ player });
    }

    handleSelectGame(evt: React.ChangeEvent<HTMLSelectElement>) {
        console.log("select game", evt.target.value);
        this.props.selectGame(evt.target.value);
    }

    handleLoad(language: Language, value: string): void {
        console.log("load", language, value);
        this.state.player?.getController(0)?.loadAgent({
            language,
            code: value
        });
    }

    handleUnload(): void {
        this.state.player?.getController(0)?.unloadAgent();
    }

    render() {
        console.log("selected game", this.props.selectedGame);
        const selectedGameId = this.props.selectedGame
            ? this.props.selectedGame.id
            : undefined;

        const games_selector = (
            <select value={selectedGameId} onChange={this.handleSelectGame}>
                {Array.from(this.props.games).map(
                    (value: [string, IGameInfo]) => (
                        <option key={value[0]} value={value[0]}>
                            {value[1].name}
                        </option>
                    )
                )}
            </select>
        );

        const selectedGameUrl = this.props.selectedGame
            ? this.props.selectedGame.url
            : "";

        return (
            <div className="mai-player-section h100 vertical">
                <div className="horizontal">
                    <div>
                        <div className="mai-home-player">
                            <div>
                                <Player
                                    url={selectedGameUrl}
                                    width={256}
                                    height={256}
                                    autoPlay={selectedGameId !== undefined}
                                    onMount={this.handleMount}
                                />
                            </div>
                        </div>
                        {games_selector}
                    </div>
                    <div>
                        <Editor
                            value={
                                "function inputs(state) {\n    return {};\n}"
                            }
                            onLoad={this.handleLoad}
                            onUnload={this.handleUnload}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

PlayerSection.propTypes = {};

export default connector(PlayerSection);
