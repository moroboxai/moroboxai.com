import React, { Suspense, lazy } from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import styles from "./EmbedPlayer.module.scss";

const Player = lazy(() => import("moroboxai-player-react"));

const GAMES_URL = process.env.NEXT_PUBLIC_GAMES_URL;

export enum EAction {
    LOAD_AGENT = "LOAD_AGENT",
    UNLOAD_AGENT = "UNLOAD_AGENT"
}

type EmbedPlayerProps = {
    className?: string;
};

type EmbedPlayerState = {
    // Instance of the raw player
    player?: IPlayer;
};

/**
 * Player embedded into an iframe.
 */
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
            case EAction.LOAD_AGENT:
                if (ev.data.script !== undefined) {
                    this.state.player?.loadAgent(0, {
                        language: ev.data.language,
                        script: ev.data.script
                    });
                }
                break;
            case EAction.UNLOAD_AGENT:
                this.state.player?.unloadAgent(0);
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
            <Suspense fallback={<div className={styles.placeholder}></div>}>
                <Player
                    url={url}
                    autoPlay={allow.includes("autoplay")}
                    onMount={this.handleMount}
                    onUnmount={this.handleUnmount}
                />
            </Suspense>
        );
    }
}

EmbedPlayer.propTypes = {};

export default EmbedPlayer;
