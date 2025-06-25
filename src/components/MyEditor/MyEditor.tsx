
import React, { useEffect, useState } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import _ from 'lodash';

interface MyEditorProps {
    value?: string;
    saveData?: (text: string) => void;
}

function MyEditor({ value = '', saveData = () => {} }: MyEditorProps) {
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(ContentState.createFromText(value)),
    );

    useEffect(() => {
        setEditorState(
            EditorState.createWithContent(ContentState.createFromText(value || '')),
        );
    }, [value]);

    const onBlur = () => {
        const str = editorState.getCurrentContent().getPlainText();
        saveData(str);
    };

    const handleKeyCommand = (command: string) => {
        if (command === 'split-block') {
            onBlur();
            return 'handled';
        }
        return 'not-handled';
    };

    return (
        <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={setEditorState}
            onBlur={onBlur}
        />
    );
}

export default MyEditor;
