import React from "react";
import PlayerSection from "@/components/PlayerSection";
import ReactMarkdown from "react-markdown";
import { MDXRemote } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
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
        /**
         * 
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    remarkPlugins={[remarkGfm]}
                >
                    {content}
                </MDXRemote>
         */

        return (
            <div className={styles.article}>
                <MDXRemote
                    {...this.props.structure.mdxSource!}
                    components={{ PlayerSection }}
                />
            </div>
        );
    }
}

Article.propTypes = {};

export default Article;
