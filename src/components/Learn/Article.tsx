import React from "react";
import ReactMarkdown from "react-markdown";
import type { Structure } from "./TOC";
import styles from "./Article.module.scss";

type ArticleProps = {
    className?: string;
    structure: Structure;
    category?: string;
    article?: string;
};

class Article extends React.Component<ArticleProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        let content = "";

        if (
            this.props.category === undefined ||
            this.props.article === undefined
        ) {
            content = this.props.structure.rootContent;
        } else {
            content = this.props.structure.categories
                .find((category) => category.id === this.props.category)!
                .articles.find(
                    (article) => article.id === this.props.article
                )!.content;
        }

        return (
            <div className={styles.article}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        );
    }
}

Article.propTypes = {};

export default Article;
