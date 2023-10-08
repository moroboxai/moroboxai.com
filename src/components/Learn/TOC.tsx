import React from "react";
import styles from "./TOC.module.scss";

type TOCProps = {
    className?: string;
    articles: string[];
};

class TOC extends React.Component<TOCProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        console.log("articles", this.props.articles);
        const articles = this.props.articles ? (
            this.props.articles.map((article) => <span>{article}</span>)
        ) : (
            <></>
        );

        return <div className="mai-toc h100">{articles}</div>;
    }
}

TOC.propTypes = {};

export default TOC;
