import React from "react";
import Player from "moroboxai-player-react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from 'react-redux';
import { IGamesDb } from '../redux/actions';
import { dispatchGamesDbLoaded } from "../redux/dispatchers";
import { getGames } from "../redux/selectors";
import { Actions } from '../redux/actions/types';
import jsyaml from "js-yaml";
import "./PlayerSection.css"

const { REACT_APP_URL_GAMES_YML } = process.env;

const mapStateToProps = (state: any) => ({
    games: getGames(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
    return {
        gamesDbLoaded: dispatchGamesDbLoaded(dispatch)
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true });

type ReduxProps = ConnectedProps<typeof connector>

type PlayerSectionProps = ReduxProps & {
    className?: string;
};

class PlayerSection extends React.Component<PlayerSectionProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        if (REACT_APP_URL_GAMES_YML === undefined) {
            console.error("REACT_APP_URL_GAMES_YML undefined");
            return
        }

        fetch(REACT_APP_URL_GAMES_YML)
            .then((response) => response.text())
            .then((data) => jsyaml.load(data)).then((data) => {
                if (data === null || typeof data !== "object") {
                    throw "Invalid data"
                }

                console.log("Games db loaded", data);
                this.props.gamesDbLoaded(data as IGamesDb);
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { className, ...props } = this.props;

        const games_selector = (
            <select>
                {Object.keys(this.props.games).map((x: string) => <option key={x}>{x}</option>)}
            </select>
        )

        return (
            <div className="mai-player-section h100">
                <Player width={256} height={256} />
                {games_selector}
            </div>
        )
    }
}

PlayerSection.propTypes = {};

export default connector(PlayerSection);