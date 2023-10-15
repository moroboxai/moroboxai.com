import React from "react";
import GamePreview from "./GamePreview";
import type { GameMetadata } from "@/components/PlayerSection";
import styles from "./Games.module.scss";

type GamesProps = {
    className?: string;
    games: GameMetadata[];
};

class Games extends React.Component<GamesProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={[styles.section, "top-section"].join(" ")}>
                <div className="container">
                    <div className="row gy-4">
                        {this.props.games.map((game) => (
                            <div
                                className="col-12 col-sm-6 col-md-4 col-lg-3"
                                key={game.id}
                            >
                                <GamePreview game={game}></GamePreview>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

Games.propTypes = {};

export default Games;
