import React from "react";
import styles from "./Games.module.scss";

type GamesProps = {
    className?: string;
};

class Games extends React.Component<GamesProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return <></>;
    }
}

Games.propTypes = {};

export default Games;
