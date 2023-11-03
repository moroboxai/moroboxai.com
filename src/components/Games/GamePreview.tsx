import React from "react";
import Link from "next/link";
import type { GameMetadata } from "@/components/PlayerSection";
import styles from "./GamePreview.module.scss";

type GamePreviewProps = {
    className?: string;
    game: GameMetadata;
};

class GamePreview extends React.Component<GamePreviewProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        const { game } = this.props;

        return (
            <Link href={game.href} className={styles.game}>
                <div>
                    <img
                        src={game.previewUrl}
                        alt={`preview of ${game.id} game`}
                        loading="lazy"
                    ></img>
                    <div className={styles.title}>{game.title}</div>
                </div>
            </Link>
        );
    }
}

GamePreview.propTypes = {};

export default GamePreview;
