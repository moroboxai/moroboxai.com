import React from "react";
import type { OnRunOptions } from "moroboxai-editor-sdk";
import Editor from "moroboxai-editor-react";
import styles from "./EmbedEditor.module.scss";

export enum EAction {
    RUN = "RUN",
    STOP = "STOP"
}

type EmbedEditorProps = {
    className?: string;
};

type EmbedEditorState = {};

/**
 * Editor embedded into an iframe.
 */
class EmbedEditor extends React.Component<EmbedEditorProps, EmbedEditorState> {
    static propTypes: any;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleRun = this.handleRun.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    componentDidMount(): void {
        // Change the theme of the page for correct CSS
        document
            .getElementsByTagName("html")[0]
            .setAttribute("data-theme", "embed");
    }

    handleRun(options: OnRunOptions) {
        this.postMessage({
            action: EAction.RUN,
            language: options.language,
            script: options.script
        });
    }

    handleStop() {
        this.postMessage({
            action: EAction.STOP
        });
    }

    postMessage(payload: any) {
        window.parent.postMessage({
            ...payload,
            uuid: window.frameElement?.getAttribute("data-uuid")
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
                onRun={this.handleRun}
                onStop={this.handleStop}
            />
        );
    }
}

EmbedEditor.propTypes = {};

export default EmbedEditor;
