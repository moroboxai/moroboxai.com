import React from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import type { Language } from "moroboxai-editor-sdk";
import Player from "moroboxai-player-react";
import Editor from "moroboxai-editor-react";
import * as Moroxel8AI from "moroxel8ai";
import * as PixiMoroxel8AI from "piximoroxel8ai";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Actions } from "../redux/actions/types";
import styles from "./PlayerSection.module.scss";

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
    gameUrl: string;
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

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleMount = this.handleMount.bind(this);
        this.handleUnmount = this.handleUnmount.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleUnload = this.handleUnload.bind(this);
    }

    componentDidMount(): void {
        // Hook PixiMoroxel8AI and Moroxel8AI
        (window as any).PixiMoroxel8AI = PixiMoroxel8AI;
        (window as any).Moroxel8AI = Moroxel8AI;
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
        const { className, gameUrl, agentUrl } = this.props;

        return (
            <div className={[styles.section, className, "vertical"].join(" ")}>
                <div className="horizontal">
                    <div className={styles.player}>
                        <div>
                            <Player
                                url={gameUrl}
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
                            url={agentUrl}
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
