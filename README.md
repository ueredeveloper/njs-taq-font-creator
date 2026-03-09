# NJS TAQ Font Creator

Este projeto é uma ferramenta para criar uma fonte de taquigrafia baseada no método Maron.

## Como funciona

O projeto utiliza a biblioteca `opentype.js` para gerar programaticamente um arquivo de fonte OpenType (`.otf`).

-   `server.js`: Inicia um servidor web simples que serve uma página HTML para visualizar a fonte gerada.

## Como usar

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor:
    ```bash
    npm start
    ```
3.  Abra seu navegador e acesse `http://localhost:3000`.

A fonte será gerada no diretório `fonts/` com o nome `fonte_aeou.otf`.