import express from 'express';
// import React from 'react';    not using server side rendering anymore for now...
// import ReactDOMServer from 'react-dom/server';
// import App from '../components/App';

const server = express();
server.use(express.static('dist'));

server.get('/', (req, res) => {
  // could switch to static file serving, perhaps even with initial react components rendered already and using react's hydrate on the client side
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>X-Wing Squad Builder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="fonts/xwing-miniatures.css">
        <link rel="stylesheet" href="styles/backgrounds.css">
        <link rel="stylesheet" href="styles/styles.css">
        <script src="https://kit.fontawesome.com/e5814cf8ca.js" crossorigin="anonymous"></script>
      </head>
      <body>
        <div id="mountNode"></div>
        <script src="/main.js"></script>
      </body>
    </html>
  `)
});

server.listen(4242, () => console.log('Server is running...'));