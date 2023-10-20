import React from "react";
import type { LoadAgentOptions } from "moroboxai-player-sdk";
import { EAction } from "./EmbedPlayer";
import { v4 as uuidv4 } from "uuid";

type IFramePlayerProps = {
    className?: string;
    gameUrl?: string;
    gameId?: string;
    autoPlay?: boolean;
    width?: string | number;
    height?: string | number;
    aspectRatio?: string;
};

type IFramePlayerState = {
    uuid: string;
};

/**
 * IFrame embedding a player.
 */
class IFramePlayer extends React.Component<
    IFramePlayerProps,
    IFramePlayerState
> {
    static propTypes: any;
    private _refIFrame: React.RefObject<HTMLIFrameElement>;

    constructor(props: any) {
        super(props);

        this.state = { uuid: uuidv4() };

        this._refIFrame = React.createRef<HTMLIFrameElement>();
    }

    loadAgent(options: LoadAgentOptions): void {
        this._refIFrame.current?.contentWindow?.postMessage({
            action: EAction.LOAD_AGENT,
            language: options.language,
            script: options.script
        });
    }

    unloadAgent(): void {
        this._refIFrame.current?.contentWindow?.postMessage({
            action: EAction.UNLOAD_AGENT
        });
    }

    render() {
        return (
            <iframe
                ref={this._refIFrame}
                className={this.props.className}
                src={`/embed/player`}
                data-game-url={this.props.gameUrl}
                data-game-id={this.props.gameId}
                data-uuid={this.state.uuid}
                allow={this.props.autoPlay === true ? "autoplay" : ""}
                width={this.props.width}
                height={this.props.height}
                style={{
                    aspectRatio: this.props.aspectRatio
                }}
            />
        );
    }
}

IFramePlayer.propTypes = {};

export default IFramePlayer;
