import React from "react";
import Player from "moroboxai-player-react";
import jsyaml from "js-yaml";
import PlayerSection from "./PlayerSection";

type HomeProps = {
    className?: string;
};

class Home extends React.Component<HomeProps> {
    static propTypes: any;
    private _refPlayerSection: React.RefObject<typeof PlayerSection>;

    constructor(props: any) {
        super(props);

        this._refPlayerSection = React.createRef<typeof PlayerSection>();
    }

    render() {
        const { className, ...props } = this.props;

        return (
            <PlayerSection ref={this._refPlayerSection} />
        )
    }
}

Home.propTypes = {};

export default Home;