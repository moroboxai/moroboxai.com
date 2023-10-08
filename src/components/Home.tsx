import React from "react";
import PlayerSection from "./PlayerSection";
import styles from "./Home.module.scss";

type HomeProps = {
    className?: string;
};

class Home extends React.Component<HomeProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return <PlayerSection />;
    }
}

Home.propTypes = {};

export default Home;
