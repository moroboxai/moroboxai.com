import React from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import type { Language } from "moroboxai-editor-sdk";
import Editor from "moroboxai-editor-react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Actions } from "@/redux/actions/types";
import { LOAD_AGENT, UNLOAD_AGENT } from "@/components/Embed/Game";
import styles from "./PlayerSection.module.scss";

export interface GameMetadata {
    id: string;
    title: string;
    href: string;
    url: string;
    previewUrl: string;
    width: number;
    height: number;
    scale: number;
    date: Date;
}

const mapStateToProps = (_: any) => ({});

const mapDispatchToProps = (_: Dispatch<Actions>) => {
    return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
});

type ReduxProps = ConnectedProps<typeof connector>;

type PlayerSectionProps = ReduxProps & {
    className?: string;
    game: GameMetadata;
    agentUrl: string;
};

type PlayerSectionState = {
    player?: IPlayer;
};

class PlayerSection extends React.Component<
    PlayerSectionProps,
    PlayerSectionState
> {
    static propTypes: any;
    private _refIframe: React.RefObject<HTMLIFrameElement>;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleMount = this.handleMount.bind(this);
        this.handleUnmount = this.handleUnmount.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleUnload = this.handleUnload.bind(this);

        this._refIframe = React.createRef<HTMLIFrameElement>();
    }

    handleMount(player: IPlayer) {
        console.log("player mounted");
        this.setState({ player });
    }

    handleUnmount(_: IPlayer) {
        console.log("player unmounted");
        this.setState({ player: undefined });
    }

    handleLoad(language: Language, value: string): void {
        this._refIframe.current?.contentWindow?.postMessage({
            action: LOAD_AGENT,
            language,
            code: value
        });
    }

    handleUnload(): void {
        this._refIframe.current?.contentWindow?.postMessage({
            action: UNLOAD_AGENT
        });
    }

    render() {
        const { className, game, agentUrl } = this.props;

        return (
            <div className={[styles.section, className, "vertical"].join(" ")}>
                <div className="container">
                    <div className="row justify-content-center align-items-center gy-4">
                        <div className="col-12 col-sm-auto">
                            <div className={styles.player}>
                                <div>
                                    <iframe
                                        ref={this._refIframe}
                                        src={`/embed/game/${game.id}`}
                                        width={game.width / game.scale}
                                        style={{
                                            aspectRatio: `${game.width}/${game.height}`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <Editor
                                className={styles.editor}
                                url={agentUrl}
                                width="100%"
                                height="500px"
                                onLoad={this.handleLoad}
                                onUnload={this.handleUnload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PlayerSection.propTypes = {};

export default connector(PlayerSection);
