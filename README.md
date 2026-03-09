# NJS TAQ Font Creator

Este projeto é uma ferramenta para criar uma fonte de taquigrafia baseada no método Maron, com um frontend em React para visualização.

## Como funciona

O projeto é dividido em duas partes principais:

### Backend (Node.js)
-   Localizado na pasta `backend/`.
-   Utiliza a biblioteca `opentype.js` para gerar programaticamente um arquivo de fonte OpenType (`.otf`).
-   A criação dos glifos é modularizada, com cada forma de letra definida em seu próprio arquivo dentro do diretório `backend/glyph-components/`.
-   `server.js`: Inicia um servidor que gera a fonte no início, a disponibiliza através de um endpoint de API e serve os arquivos estáticos do frontend.

### Frontend (HTML + React via CDN)
-   Localizado na pasta `frontend/`.
-   Uma página HTML (`index.html`) que carrega o React via CDN e exibe um texto de exemplo usando a fonte customizada.

## Como usar

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Inicie o servidor:**
    ```bash
    npm start
    ```
    Este comando executará o `index.js` na raiz do projeto, que por sua vez inicia o servidor do backend. O `nodemon` reiniciará o servidor automaticamente ao detectar alterações nos arquivos.
 
3.  **Abra seu navegador** e acesse `http://localhost:3000`.

A fonte será gerada no diretório `fonts/` com o nome `font_taq_maron.otf`.