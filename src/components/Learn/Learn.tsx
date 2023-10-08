import React from "react";
import TOC from "./TOC";
import Article from "./Article";
import styles from "./Learn.module.scss";

type LearnProps = {
    className?: string;
    articles: string[];
};

class Learn extends React.Component<LearnProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <>
                <TOC articles={this.props.articles} />
                <Article />
            </>
        );
    }
}

Learn.propTypes = {};

export default Learn;
