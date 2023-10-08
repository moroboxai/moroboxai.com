import React from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import type { Language } from "moroboxai-editor-sdk";
import Player from "moroboxai-player-react";
import Editor from "moroboxai-editor-react";
import * as Moroxel8AI from "moroxel8ai";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { GamesDb } from "../redux/actions";
import {
    dispatchGamesDbLoaded,
    dispatchSelectGame
} from "../redux/dispatchers";
import { getGames, getSelectedGame } from "../redux/selectors";
import { Actions } from "../redux/actions/types";
import jsyaml from "js-yaml";
import styles from "./PlayerSection.module.scss";

const REACT_APP_URL_GAMES_YML = process.env.NEXT_PUBLIC_URL_GAMES_YML;
const HOME_GAME_URL = process.env.NEXT_PUBLIC_HOME_GAME_URL;
const HOME_AGENT_URL = process.env.NEXT_PUBLIC_HOME_AGENT_URL;

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
        this.handleUnmount = this.handleUnmount.bind(this);
        this.handleSelectGame = this.handleSelectGame.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleUnload = this.handleUnload.bind(this);
    }

    componentDidMount(): void {
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
                this.props.gamesDbLoaded(data as GamesDb);
            })
            .catch((error) => console.log(error));
    }

    handleMount(player: IPlayer) {
        console.log("player mounted");
        this.setState({ player });
    }

    handleUnmount(_: IPlayer) {
        console.log("player unmounted");
        this.setState({ player: undefined });
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
        return (
            <div className={styles.section + " vertical"}>
                <div className="horizontal">
                    <div className={styles.player}>
                        <div>
                            <Player
                                url={HOME_GAME_URL ?? ""}
                                boot={Moroxel8AI}
                                width={513}
                                height={384}
                                scale={1.5}
                                autoPlay={true}
                                onMount={this.handleMount}
                                onUnmount={this.handleUnmount}
                            />
                        </div>
                    </div>
                    <div>
                        <Editor
                            className={styles.editor}
                            url={HOME_AGENT_URL}
                            width="500px"
                            height="500px"
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
