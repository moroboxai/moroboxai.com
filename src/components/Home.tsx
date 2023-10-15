import React from "react";
import PlayerSection from "./PlayerSection";
import type { GameMetadata } from "./PlayerSection";

const HOME_AGENT_URL = process.env.NEXT_PUBLIC_HOME_AGENT_URL;

type HomeProps = {
    className?: string;
    game: GameMetadata;
};

class Home extends React.Component<HomeProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        console.log(this.props.game);
        return (
            <PlayerSection
                className="top-section"
                game={this.props.game}
                agentUrl={HOME_AGENT_URL}
            />
        );
    }
}

Home.propTypes = {};

export default Home;
