import { cssEditor, htmlEditor, status, reload  }  from './live-editor.js';
import createSocketClient from './code-box-client.js';

const filePath = document.location.pathname.replace('index.html','');

createSocketClient(8080,filePath,htmlEditor,status,reload);
createSocketClient(9090,filePath,cssEditor,status,reload);


reload();



