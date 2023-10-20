import React from "react";
import type { IPlayer } from "moroboxai-player-sdk";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Actions } from "@/redux/actions/types";
import PlayerEditor from "@/components/Embed/PlayerEditor";
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
    editorHeight?: string;
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
    }

    render() {
        const { className, game, agentUrl } = this.props;

        return (
            <div className={[styles.section, className, "vertical"].join(" ")}>
                <PlayerEditor
                    playerOptions={{
                        className: styles.player,
                        gameId: game.id,
                        width: game.width,
                        height: game.height,
                        scale: game.scale
                    }}
                    editorOptions={{
                        className: styles.editor,
                        agentUrl
                    }}
                    homePage={true}
                />
            </div>
        );
    }
}

PlayerSection.propTypes = {};

export default connector(PlayerSection);
