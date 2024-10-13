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
htmlEditorContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

// BOX SHADOW will influence the behavior of grid layout, if the width is 100%
htmlEditorContainer.style.overflow = 'hidden';
cssEditorContainer.style.overflow = 'hidden';

cssEditorContainer.style.width = '50%';
cssEditorContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

const toolbox = document.createElement('div');
toolbox.style.position = 'fixed';
toolbox.style.top = '0';
toolbox.style.right = '0';
toolbox.style.zIndex = '1000';
toolbox.style.display = 'flex';
toolbox.style.flexDirection = 'column';

const status = document.createElement('div');
status.id = 'status';
status.style.textAlign = 'center';
status.innerText = 'Connecting...';

const iframe = document.createElement('iframe'); 

iframe.src = `http://localhost:3000${filePath}`;

iframe.style.width = '100%';
iframe.style.minHeight = '100vh';

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

let hold = false;

htmlEditorContainer.onclick = () => {
    if (hold) return;
    htmlEditorContainer.style.width = '90%';
    cssEditorContainer.style.width = '10%';
}

cssEditorContainer.onclick = () => {
    if (hold) return;
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


const gridContainer = document.createElement('div');
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = '1fr 1fr';
gridContainer.style.gridTemplateRows = '1fr 1fr';
gridContainer.style.gap = '10px';
gridContainer.style.width = '100%';
gridContainer.style.height = '100vh';
gridContainer.style.gridTemplateAreas = `
    'html preview'
    'css preview'
`;  

htmlEditorContainer.style.gridArea = 'html';
cssEditorContainer.style.gridArea = 'css';

const gridIframe = iframe.cloneNode();
gridIframe.style.gridArea = 'preview';


const holdButton = document.createElement('button');
const scrollButton = document.createElement('button');
const toVertical = document.createElement('button');
toVertical.innerText = 'To Vertical';

let toPreview = true;

scrollButton.innerText = 'To Preview';
holdButton.innerText = 'LOCK';
toolbox.appendChild(holdButton);
toolbox.appendChild(scrollButton);
toolbox.appendChild(toVertical);

const reloadButton = document.createElement('button');
reloadButton.innerText = 'Reload';

const reload = () => {
    iframe.src = iframe?.src ;
    gridIframe.src = gridIframe?.src;
}

reloadButton.onclick = () => {
    reload();
}

toolbox.appendChild(reloadButton);

let isVertical = false;

toVertical.onclick = () => {
 
    isVertical ? toVertical.innerText = 'To Vertical' : toVertical.innerText = 'To Horizontal'; 

    if (!isVertical) {
        hold = true;
        document.body.removeChild(status);
        document.body.removeChild(iframe);
        document.body.removeChild(editorContainer);
        
        holdButton.disabled = true;
        scrollButton.disabled = true;

        document.body.appendChild(gridContainer);
        gridContainer.appendChild(htmlEditorContainer);
        gridContainer.appendChild(cssEditorContainer);
        gridContainer.appendChild(gridIframe);
        htmlEditorContainer.style.width = '100%';


        htmlEditorContainer.style.height = '50vh';
        cssEditorContainer.style.width = '100%';
        cssEditorContainer.style.height = '50vh';
        
     
    }else{
        document.body.removeChild(gridContainer);
        
        document.body.appendChild(editorContainer);
        editorContainer.appendChild(htmlEditorContainer);
        editorContainer.appendChild(cssEditorContainer);

        document.body.appendChild(status);
        document.body.appendChild(iframe);

        holdButton.disabled = false;
        scrollButton.disabled = false;

        htmlEditorContainer.style.width = '50%';
        htmlEditorContainer.style.height = '100%';
        cssEditorContainer.style.width = '50%';
        cssEditorContainer.style.height = '100%';
        iframe.style.display = 'block';
        editorContainer.style.display = 'flex';
    }
    isVertical = !isVertical;
}


scrollButton.onclick = () => {
    scrollDown();
}

holdButton.onclick = () => {
    hold = !hold;
    holdButton.innerText = hold ? 'UNLOCK' : 'LOCK';
    htmlEditorContainer.style.width = '50%';
    cssEditorContainer.style.width = '50%';
}

document.body.appendChild(toolbox);

editorContainer.appendChild(htmlEditorContainer);
editorContainer.appendChild(cssEditorContainer);

export {htmlEditor,cssEditor, status, reload };