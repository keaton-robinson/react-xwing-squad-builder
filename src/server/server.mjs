import express from 'express';
// import React from 'react';    not using server side rendering anymore for now...
// import ReactDOMServer from 'react-dom/server';
// import App from '../components/App';

const server = express();
server.use(express.static('dist'));

server.get('/', (req, res) => {
  // started off using server side rendering because my initial tutorials suggested it...but got rid of it when custom dropdown components broke
  // const initialMarkup = ReactDOMServer.renderToString(<App />);   custom dropdown component broke in SSR due to depending on window object
  // doing server side rendering may be required in the real world...but for now, I have other things to master before worrying about getting good at solutions to 
  // the whole "window is not defined" problem for server side rendering. Using server side rendering for this project seems fairly silly anyway.
  // having to learn static site generation for real world seems fairly likely as well 
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