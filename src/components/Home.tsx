import React from "react";
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
        return (
            <PlayerSection ref={this._refPlayerSection} />
        )
    }
}

Home.propTypes = {};

export default Home;