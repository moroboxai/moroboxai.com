import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.scss";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "#";
const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL ?? "#";

type FooterProps = {
    className?: string;
};

type FooterState = {};

class Footer extends React.Component<FooterProps, FooterState> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        const { className } = this.props;

        return (
            <footer
                className={[
                    styles.footer,
                    "text-center",
                    "text-white",
                    className
                ].join(" ")}
            >
                <div className="container p-4 pb-0">
                    <section className="row justify-content-center mb-4">
                        <div className="col-auto">
                            <Link
                                className="btn btn-outline-light btn-floating m-1"
                                href={GITHUB_URL}
                                role="button"
                                aria-label="Contribute on GitHub"
                            >
                                <FontAwesomeIcon
                                    className="mai-fab"
                                    icon={faGithub}
                                />
                            </Link>

                            <Link
                                className="btn btn-outline-light btn-floating m-1"
                                href={DISCORD_URL}
                                role="button"
                                aria-label="Join the Discord server"
                            >
                                <FontAwesomeIcon
                                    className="mai-fab"
                                    icon={faDiscord}
                                />
                            </Link>
                        </div>
                    </section>
                </div>

                <div
                    className={[
                        "row",
                        "justify-content-center",
                        styles.copyright
                    ].join(" ")}
                >
                    <div className="col-auto p-3">© 2023 MoroboxAI</div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {};

export default Footer;
