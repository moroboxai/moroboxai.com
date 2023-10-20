import React from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import type { OnRunOptions } from "moroboxai-editor-sdk";
import IFramePlayer from "@/components/Embed/IFramePlayer";
import IFrameEditor from "@/components/Embed/IFrameEditor";
import styles from "./PlayerEditor.module.scss";

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

export interface PlayerOptions {
    className?: string;
    gameId: string;
    width: number;
    height: number;
    scale?: number;
}

export interface EditorOptions {
    className?: string;
    agentUrl: string;
    height?: string;
}

type PlayerEditorProps = {
    className?: string;
    homePage?: boolean;
    playerOptions: PlayerOptions;
    editorOptions: EditorOptions;
};

type PlayerEditorState = {
    player?: IPlayer;
};

class PlayerEditor extends React.Component<
    PlayerEditorProps,
    PlayerEditorState
> {
    static propTypes: any;
    private _refPlayer: React.RefObject<IFramePlayer>;
    private _refEditor: React.RefObject<IFrameEditor>;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleMount = this.handleMount.bind(this);
        this.handleUnmount = this.handleUnmount.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.handleStop = this.handleStop.bind(this);

        this._refPlayer = React.createRef<IFramePlayer>();
        this._refEditor = React.createRef<IFrameEditor>();
    }

    handleMount(player: IPlayer) {
        console.log("player mounted");
        this.setState({ player });
    }

    handleUnmount(_: IPlayer) {
        console.log("player unmounted");
        this.setState({ player: undefined });
    }

    handleRun(options: OnRunOptions): void {
        this._refPlayer.current?.loadAgent(options);
    }

    handleStop(): void {
        this._refPlayer.current?.unloadAgent();
    }

    render() {
        const { className, playerOptions, editorOptions, homePage } =
            this.props;

        return (
            <div className={[className, "container"].join(" ")}>
                <div className="row justify-content-center align-items-center gy-4 m-auto">
                    <div className="col-12 col-sm-auto">
                        <div
                            className={[
                                styles.player,
                                playerOptions.className
                            ].join(" ")}
                        >
                            <div>
                                <IFramePlayer
                                    ref={this._refPlayer}
                                    gameId={playerOptions.gameId}
                                    autoPlay={true}
                                    width={
                                        playerOptions.width /
                                        (playerOptions.scale ?? 1)
                                    }
                                    aspectRatio={`${playerOptions.width}/${playerOptions.height}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={[
                            "col-12",
                            homePage === true ? "col-xl-7" : "col-xl"
                        ].join(" ")}
                    >
                        <IFrameEditor
                            ref={this._refEditor}
                            className={editorOptions.className}
                            url={editorOptions.agentUrl}
                            width="100%"
                            height={editorOptions.height ?? "500px"}
                            onRun={this.handleRun}
                            onStop={this.handleStop}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

PlayerEditor.propTypes = {};

export default PlayerEditor;
