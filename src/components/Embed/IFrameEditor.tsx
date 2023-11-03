import React from "react";
import { EAction } from "./EmbedEditor";
import type { OnRunOptions } from "moroboxai-editor-sdk";
import { v4 as uuidv4 } from "uuid";

type IFrameEditorProps = {
    className?: string;
    title?: string;
    url?: string;
    width?: string | number;
    height?: string | number;
    onRun?: (options: OnRunOptions) => void;
    onStop?: () => void;
};

type IFrameEditorState = {
    uuid: string;
};

/**
 * IFrame embedding a player.
 */
class IFrameEditor extends React.Component<
    IFrameEditorProps,
    IFrameEditorState
> {
    static propTypes: any;
    private _refIFrame: React.RefObject<HTMLIFrameElement>;

    constructor(props: any) {
        super(props);

        this.state = { uuid: uuidv4() };

        this.handleMessage = this.handleMessage.bind(this);

        this._refIFrame = React.createRef<HTMLIFrameElement>();
    }

    componentDidMount(): void {
        window.addEventListener("message", this.handleMessage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.handleMessage);
    }

    handleMessage(ev: MessageEvent) {
        if (ev.data.action === undefined || ev.data.uuid !== this.state.uuid) {
            return;
        }

        switch (ev.data.action) {
            case EAction.RUN:
                if (
                    this.props.onRun !== undefined &&
                    ev.data.script !== undefined
                ) {
                    this.props.onRun({
                        language: ev.data.language,
                        script: ev.data.script
                    });
                }
                break;
            case EAction.STOP:
                if (this.props.onStop !== undefined) {
                    this.props.onStop();
                }
                break;
        }
    }

    render() {
        return (
            <iframe
                ref={this._refIFrame}
                src={`/embed/editor`}
                title={this.props.title ?? "editor"}
                data-agent-url={this.props.url}
                data-uuid={this.state.uuid}
                width={this.props.width}
                height={this.props.height}
                loading="lazy"
            />
        );
    }
}

IFrameEditor.propTypes = {};

export default IFrameEditor;
