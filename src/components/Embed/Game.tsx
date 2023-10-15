import React from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import Player from "moroboxai-player-react";
import * as Moroxel8AI from "moroxel8ai";
import * as PixiMoroxel8AI from "piximoroxel8ai";
//import styles from "./Game.module.scss";

type GameProps = {
    className?: string;
    url: string;
    autoPlay: boolean;
};

type GameState = {
    player?: IPlayer;
};

class Game extends React.Component<GameProps, GameState> {
    static propTypes: any;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleMount = this.handleMount.bind(this);
        this.handleUnmount = this.handleUnmount.bind(this);
    }

    componentDidMount(): void {
        // Hook PixiMoroxel8AI and Moroxel8AI
        (window as any).PixiMoroxel8AI = PixiMoroxel8AI;
        (window as any).Moroxel8AI = Moroxel8AI;
        document
            .getElementsByTagName("html")[0]
            .setAttribute("data-theme", "embed");
    }

    handleMount(player: IPlayer) {
        console.log("player mounted");
        this.setState({ player });
    }

    handleUnmount(_: IPlayer) {
        console.log("player unmounted");
        this.setState({ player: undefined });
    }

    render() {
        return (
            <Player
                url={this.props.url}
                autoPlay={this.props.autoPlay}
                onMount={this.handleMount}
                onUnmount={this.handleUnmount}
            />
        );
    }
}

Game.propTypes = {};

export default Game;
