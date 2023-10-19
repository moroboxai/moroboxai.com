import React from "react";
import Link from "next/link";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import styles from "./TOC.module.scss";

export interface Section {
    id: string;
    title: string;
}

export interface Article {
    id: string;
    path: string;
    title: string;
    sections: Section[];
}

export interface Category {
    id: string;
    path: string;
    title: string;
    articles: Article[];
}

export interface Structure {
    // All categories
    categories: Category[];
    // Current category
    category?: Category;
    // Current article
    article?: Article;
    // Content of the article
    mdxSource?: MDXRemoteSerializeResult;
}
type TOCProps = {
    className?: string;
    baseUrl: string;
    structure: Structure;
};

class TOC extends React.Component<TOCProps> {
    static propTypes: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        const toc = (
            <ul>
                {this.props.structure.categories.map((category) => (
                    <li key={category.id}>
                        <span className={styles.category}>
                            {category.title}
                        </span>
                        <ul>
                            {category.articles.map((article) => (
                                <li key={article.id}>
                                    <Link
                                        className={styles.article}
                                        href={`${this.props.baseUrl}/${category.id}/${article.id}`}
                                    >
                                        {article.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );

        return <div className={styles.toc}>{toc}</div>;
    }
}

TOC.propTypes = {};

export default TOC;
