import React from "react";
import PlayerEditor from "@/components/Embed/PlayerEditor";
import { MDXRemote } from "next-mdx-remote";
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
                    components={{ PlayerEditor }}
                />
            </div>
        );
    }
}

Article.propTypes = {};

export default Article;
