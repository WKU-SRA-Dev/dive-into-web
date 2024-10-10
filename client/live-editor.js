import * as monaco from 'monaco-editor';
const filePath = document.location.pathname.replace('index.html','');

if(window.location.hostname.includes('wkusci')) {
    alert('Ops, you have to deploy me on your local machine through /n https://github.com/WKU-SRA-Dev/dive-into-web');
}

const editorContainer = document.createElement('div');
editorContainer.id = 'editor-container';
editorContainer.style.width = '100%';
editorContainer.style.border = '1px solid #000';
editorContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
editorContainer.style.margin = 'auto';
editorContainer.style.height = '100vh';
editorContainer.style.display = 'flex';


document.body.appendChild(editorContainer);

const htmlEditorContainer = document.createElement('div');
const cssEditorContainer = document.createElement('div');
htmlEditorContainer.style.width = '50%';
cssEditorContainer.style.width = '50%';

const toolbox = document.createElement('div');
toolbox.style.position = 'fixed';
toolbox.style.top = '0';
toolbox.style.right = '0';
toolbox.style.zIndex = '1000';
toolbox.style.display = 'flex';
toolbox.style.flexDirection = 'column';

const holdButton = document.createElement('button');
const scrollButton = document.createElement('button');

scrollButton.innerText = 'To Preview';
holdButton.innerText = 'LOCK';
toolbox.appendChild(holdButton);
toolbox.appendChild(scrollButton);



scrollButton.onclick = () => {
    scrollDown();
}

let holed = false;

holdButton.onclick = () => {
    holed = !holed;
    holdButton.innerText = holed ? 'UNLOCK' : 'LOCK';
    htmlEditorContainer.style.width = '50%';
    cssEditorContainer.style.width = '50%';
}

document.body.appendChild(toolbox);

editorContainer.appendChild(htmlEditorContainer);
editorContainer.appendChild(cssEditorContainer);

const htmlEditor = monaco.editor.create(htmlEditorContainer, {
    value: '',
    language: 'html',
    theme: 'vs-light',
    automaticLayout: true,
    quickSuggestions: true,  
    suggestOnTriggerCharacters: true,  
    parameterHints: { enabled: true }, 
    wordBasedSuggestions: false,  
});

htmlEditorContainer.onclick = () => {
    if (holed) return;
    htmlEditorContainer.style.width = '90%';
    cssEditorContainer.style.width = '10%';
}

cssEditorContainer.onclick = () => {
    if (holed) return;
    cssEditorContainer.style.width = '90%';
    htmlEditorContainer.style.width = '10%';
}

monaco.languages.html.htmlDefaults.setOptions({
    suggest: {
        html5: true,
        angular1: true,
        ionic: true
    }
});

const cssEditor = monaco.editor.create(cssEditorContainer, {
    value: '',
    language: 'css',
    theme: 'vs-light',
    automaticLayout: true,
    quickSuggestions: true,
    suggestOnTriggerCharacters: true,
    parameterHints: { enabled: true },
    wordBasedSuggestions: false,
});

monaco.languages.css.cssDefaults.setOptions({
    validate: true,
    lint: {
        compatibleVendorPrefixes: 'ignore',
        vendorPrefix: 'warning',
        duplicateProperties: 'warning',
        emptyRules: 'warning',
        importStatement: 'ignore',
        boxModel: 'ignore',
        universalSelector: 'ignore',
        zeroUnits: 'ignore'
    }
});

const status = document.createElement('div');
status.id = 'status';
status.style.textAlign = 'center';
status.innerText = 'Connecting...';

const iframe = document.createElement('iframe'); 

iframe.src = `http://localhost:3000${filePath}`;

iframe.style.width = '100%';
iframe.style.minHeight = '100vh';

let toPreview = true;

function scrollDown() {
    if(toPreview) {
        toPreview = false;
        window.scrollTo(0,editorContainer.scrollHeight);
        scrollButton.innerText = 'To Editor';
    }else {
        toPreview = true;
        window.scrollTo(0,0);
        scrollButton.innerText = 'To Preview';
    }    
}
    

editorContainer.insertAdjacentElement('afterend', status);
status.insertAdjacentElement('afterend', iframe);


export {htmlEditor,cssEditor, status,iframe };