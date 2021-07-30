import express from 'express';
import cors from 'cors';
import {getRank,setRank,rankRoute} from './route/rank.js';


console.log(rankRoute)

const app = express();
const port = process.env.PORT || 3000;


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(cors());
// app.get('/',(req,res)=> res.send(
//     'Hello World'
// ));


// const rankRoute = [
//     {
//         // GET RANK
//         method: 'get',
//         route: '/rank',
//         handler: (req, res) => {
//             const ranks = getRank()
//             res.send(ranks)
//         },
//     },
//     {
//         // CREATE RANKS
//         method: 'post',
//         route: '/rank',
//         handler: ({ body }, res) => {
//             const ranks = getRank()
//             const newRank =   {
//                 id: "wonny",
//                 score: 200,
//                 timestamp: "2021.6.24"
//             }
//             ranks.unshift(newRank)
//             setRank(ranks)
//             res.send(newRank)
//         },
//     },
// ]

// const routes = [...messagesRoute, ...usersRoute, ...drawingsRoute]
// routes.forEach(({ method, route, handler }) => {
//   app[method](route, handler);
// })


app.get('/rank',((req,res)=>{
    const ranks = getRank();
    res.send(ranks)
}))
app.post('/rank',(body,res)=>{
    const rankObj = getRank();
    console.log(rankObj,body)
    const newRank =  {
        id: "wonny",
        score: 200,
        timestamp: "2021.6.24"
    }
    rankObj.rank.push(newRank)
    setRank(rankObj)
    res.send()
})

app.listen(port, () => {
  console.log('server listening on 3ddd000...')
})
