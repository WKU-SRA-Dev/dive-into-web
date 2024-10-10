import { io } from 'socket.io-client';
import { throttle } from './utils/throttle';

export default function createSocketClient(port,filePath,editor,status) {

    const socket = io(`http://localhost:${port || 8080}`, {
        query: {
            filePath: encodeURIComponent(filePath),
        },
    });
    
    socket.on('connect', () => {
        status.innerText = 'Connected';
    });
    
    socket.on('fileContent', (data) => {
        if (data.code === 200) {
            const { content } = data;
            const model = editor.getModel();
    
            const currentContent = editor.getValue();
    
            if (currentContent !== content) {
                const position = editor.getPosition();
                const selection = editor.getSelection();
    
                editor.getModel().pushEditOperations(
                    [],
                    [{ range: model.getFullModelRange(), text: content }],
                    () => null
                );
    
                editor.setPosition(position);
                editor.setSelection(selection);
            }
        }
    });
    
    const createContentChangeChecker = () => {
        let previousContent = '';
        return (currentContent) => {
            if (currentContent !== previousContent) {
                previousContent = currentContent;
                return true;
            }
            return false;
        }
    }
    
    const contentChangeChecker = createContentChangeChecker();
    
    const sendThrottledContent = throttle((content) => {
        contentChangeChecker(content) && socket.emit('saveFile', { content });
    }, 500);
    
    
    editor.onDidChangeModelContent(() => {
        const content = editor.getValue();
        sendThrottledContent(content);
    }
    );
    
    socket.on('disconnect', () => {
        status.innerText = 'Disconnected';
    });
    
    socket.on('saveStatus', (data) => {
        if (data.code === 200) {
            status.innerText = 'Going well 😙';
        } else if (data.code === 500) {
            status.innerText = 'Sync failed 😢';
        }
    });
    
}