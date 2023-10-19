import React from "react";
import type { Language } from "moroboxai-editor-sdk";
import Editor from "moroboxai-editor-react";
import { LOAD_AGENT, UNLOAD_AGENT } from "./EmbedPlayer";
import * as styles from "./EmbedEditor.module.scss";

type EmbedEditorProps = {
    className?: string;
};

type EmbedEditorState = {};

class EmbedEditor extends React.Component<EmbedEditorProps, EmbedEditorState> {
    static propTypes: any;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleLoad = this.handleLoad.bind(this);
        this.handleUnload = this.handleUnload.bind(this);
    }

    componentDidMount(): void {
        // Change the theme of the page for correct CSS
        document
            .getElementsByTagName("html")[0]
            .setAttribute("data-theme", "embed");
    }

    handleLoad(language: Language, value: string) {
        window.parent.postMessage({
            action: LOAD_AGENT,
            language,
            code: value
        });
    }

    handleUnload() {
        window.parent.postMessage({
            action: UNLOAD_AGENT
        });
    }

    render() {
        // Get attributes from iframe
        const frameElement = window.frameElement;
        const url = frameElement?.getAttribute("data-agent-url") ?? undefined;

        return (
            <Editor
                className={styles.editor}
                url={url}
                width="100%"
                height="100%"
                onLoad={this.handleLoad}
                onUnload={this.handleUnload}
            />
        );
    }
}

EmbedEditor.propTypes = {};

export default EmbedEditor;
