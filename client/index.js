import * as monaco from 'monaco-editor';

import { cssEditor, htmlEditor, status, iframe }  from './live-editor';
import createSocketClient from './code-box-client.js';

const filePath = document.location.pathname.replace('index.html','');

createSocketClient(8080,filePath,htmlEditor,status);
createSocketClient(9090,filePath,cssEditor,status);

console.log(iframe.src);

