import React from "react";
import styles from "./Article.module.scss";

type ArticleProps = {
    className?: string;
};

class Article extends React.Component<ArticleProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return <></>;
    }
}

Article.propTypes = {};

export default Article;
