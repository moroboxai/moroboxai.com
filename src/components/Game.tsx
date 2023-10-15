import React from "react";
import ReactMarkdown from "react-markdown";
import PlayerSection from "@/components/PlayerSection";
import type { GameMetadata } from "@/components/PlayerSection";
import styles from "./Game.module.scss";

const RANDOM_AGENT_URL = process.env.NEXT_PUBLIC_RANDOM_AGENT_URL;

type GameProps = {
    className?: string;
    game: GameMetadata;
    readme: string;
};

class Game extends React.Component<GameProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        const { game, readme } = this.props;

        return (
            <>
                <PlayerSection
                    className="top-section"
                    game={game}
                    agentUrl={RANDOM_AGENT_URL}
                />
                <div className={styles.readme}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <ReactMarkdown>{readme}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Game.propTypes = {};

export default Game;
