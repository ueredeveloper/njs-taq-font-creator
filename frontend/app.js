'use strict';

const e = React.createElement;

function App() {
  const [text, setText] = React.useState('d da g ga p pa b ba');

  return e(
    'div',
    null,
    e(
      'div',
      { className: 'display-area' },
      text || ' ' // Exibe um espaço para manter a altura se o texto estiver vazio
    ),
    e(
      'input',
      {
        className: 'text-input',
        type: 'text',
        value: text,
        onChange: (event) => setText(event.target.value),
        placeholder: 'Digite aqui para testar a fonte...'
      }
    )
  );
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));