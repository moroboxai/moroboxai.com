import React from "react";
import type { Language } from "moroboxai-editor-sdk";
import { LOAD_AGENT, UNLOAD_AGENT } from "./EmbedPlayer";

type IFramePlayerProps = {
    className?: string;
    gameUrl?: string;
    gameId?: string;
    autoPlay?: boolean;
    width?: string | number;
    height?: string | number;
    aspectRatio?: string;
};

type IFramePlayerState = {};

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

        this.state = {};

        this._refIFrame = React.createRef<HTMLIFrameElement>();
    }

    loadAgent(language: Language, value: string): void {
        this._refIFrame.current?.contentWindow?.postMessage({
            action: LOAD_AGENT,
            language,
            code: value
        });
    }

    unloadAgent(): void {
        this._refIFrame.current?.contentWindow?.postMessage({
            action: UNLOAD_AGENT
        });
    }

    render() {
        return (
            <iframe
                ref={this._refIFrame}
                src={`/embed/player`}
                data-game-url={this.props.gameUrl}
                data-game-id={this.props.gameId}
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
