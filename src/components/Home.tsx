import React from "react";
import PlayerSection from "./PlayerSection";

const HOME_GAME_URL = process.env.NEXT_PUBLIC_HOME_GAME_URL;
const HOME_AGENT_URL = process.env.NEXT_PUBLIC_HOME_AGENT_URL;

type HomeProps = {
    className?: string;
};

class Home extends React.Component<HomeProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <PlayerSection
                className="top-section"
                gameUrl={HOME_GAME_URL}
                agentUrl={HOME_AGENT_URL}
            />
        );
    }
}

Home.propTypes = {};

export default Home;
