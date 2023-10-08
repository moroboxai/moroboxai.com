import React from "react";
import styles from "./Article.module.scss";

type ArticleProps = {
    className?: string;
    category?: string;
    article?: string;
};

class Article extends React.Component<ArticleProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <>
                Article
                {this.props.category}
                {this.props.article}
            </>
        );
    }
}

Article.propTypes = {};

export default Article;
