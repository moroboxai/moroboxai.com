import React from "react";
import ReactMarkdown from "react-markdown";
import PlayerSection from "@/components/PlayerSection";
import styles from "./Game.module.scss";

const RANDOM_AGENT_URL = process.env.NEXT_PUBLIC_RANDOM_AGENT_URL;

export interface GameMetadata {
    id: string;
    title: string;
    href: string;
    url: string;
    preview: string;
    date: Date;
}

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
                    gameUrl={game.url}
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
