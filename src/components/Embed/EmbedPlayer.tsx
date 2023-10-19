import React from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import Player from "moroboxai-player-react";
import * as Moroxel8AI from "moroxel8ai";
import * as PixiMoroxel8AI from "piximoroxel8ai";

const GAMES_URL = process.env.NEXT_PUBLIC_GAMES_URL;

export const LOAD_AGENT = "LOAD_AGENT";
export const UNLOAD_AGENT = "UNLOAD_AGENT";

type EmbedPlayerProps = {
    className?: string;
};

type EmbedPlayerState = {
    // Instance of the raw player
    player?: IPlayer;
};

class EmbedPlayer extends React.Component<EmbedPlayerProps, EmbedPlayerState> {
    static propTypes: any;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleMessage = this.handleMessage.bind(this);
        this.handleMount = this.handleMount.bind(this);
        this.handleUnmount = this.handleUnmount.bind(this);
    }

    componentDidMount(): void {
        // Hook PixiMoroxel8AI and Moroxel8AI
        (window as any).PixiMoroxel8AI = PixiMoroxel8AI;
        (window as any).Moroxel8AI = Moroxel8AI;

        // Listen to messages
        window.addEventListener("message", this.handleMessage);

        // Change the theme of the page for correct CSS
        document
            .getElementsByTagName("html")[0]
            .setAttribute("data-theme", "embed");
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.handleMessage);
    }

    handleMessage(ev: MessageEvent) {
        if (ev.data.action === undefined || this.state.player === undefined) {
            return;
        }

        switch (ev.data.action) {
            case LOAD_AGENT:
                if (ev.data.code !== undefined) {
                    this.state.player?.getController(0)?.loadAgent({
                        language: ev.data.language ?? "javascript",
                        code: ev.data.code
                    });
                }
                break;
            case UNLOAD_AGENT:
                this.state.player?.getController(0)?.unloadAgent();
                break;
        }
    }

    handleMount(player: IPlayer) {
        this.setState({ player });
    }

    handleUnmount() {
        this.setState({ player: undefined });
    }

    render() {
        // Get attributes from iframe
        const frameElement = window.frameElement;
        const allow = (frameElement?.getAttribute("allow") ?? "")
            .split(";")
            .map((value) => value.trim());

        const gameId = frameElement?.getAttribute("data-game-id");
        const url =
            gameId !== undefined
                ? `${GAMES_URL}/${gameId}`
                : frameElement?.getAttribute("data-game-url") ?? "";

        return (
            <Player
                url={url}
                autoPlay={allow.includes("autoplay")}
                onMount={this.handleMount}
                onUnmount={this.handleUnmount}
            />
        );
    }
}

EmbedPlayer.propTypes = {};

export default EmbedPlayer;
