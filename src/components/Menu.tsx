import React from "react";
import Link from "next/link";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { dispatchToggleMenu } from "../redux/dispatchers";
import { getMenu } from "../redux/selectors";
import { Actions } from "../redux/actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Menu.module.scss";

const mapStateToProps = (state: any) => ({
    menu: getMenu(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
    return {
        toggleMenu: dispatchToggleMenu(dispatch)
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
});

type ReduxProps = ConnectedProps<typeof connector>;

type MenuProps = ReduxProps & {
    className?: string;
};

type MenuState = {};

class Menu extends React.Component<MenuProps, MenuState> {
    static propTypes: any;

    constructor(props: any) {
        super(props);

        this._handleToggle = this._handleToggle.bind(this);
    }

    _handleToggle() {
        this.props.toggleMenu(!this.props.menu.toggled);
    }

    render() {
        const { className } = this.props;

        return (
            <nav className={styles.menu + " " + (className || "")}>
                <div className={styles.home}>
                    <a href="/" aria-label="Back to the homepage">
                        <FontAwesomeIcon className="mai-fab" icon={faHome} />
                    </a>
                </div>
                <div
                    className={
                        styles.items +
                        " " +
                        (this.props.menu.toggled === true ? "mai-active" : "")
                    }
                >
                    <ul>
                        <li>
                            <Link
                                href="/games"
                                aria-label="Go to the list of games"
                            >
                                Games
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/learn"
                                aria-label="Learn more on MoroboxAI"
                            >
                                Learn
                            </Link>
                        </li>
                    </ul>
                </div>
                <button className={styles.toggle} onClick={this._handleToggle}>
                    <FontAwesomeIcon
                        className="mai-fab"
                        icon={
                            this.props.menu.toggled === true ? faXmark : faBars
                        }
                    />
                </button>
            </nav>
        );
    }
}

Menu.propTypes = {};

export default connector(Menu);
