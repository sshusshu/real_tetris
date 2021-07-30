const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/',(req,res)=> res.send('Hello World'));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

const routes = [...messagesRoute, ...usersRoute, ...drawingsRoute]
routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
})



 
app.listen(port, () => {
  console.log('server listening on 3000...')
})
