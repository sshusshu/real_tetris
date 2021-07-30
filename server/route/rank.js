import fs from 'fs';
import { resolve } from 'path';
const basePath = resolve();
const filename = {
    rank : resolve(basePath,'../server/db.json')
}

export const getRank = () => {
    try {
        return JSON.parse(fs.readFileSync(filename.rank, 'utf-8'))
    } catch (err) {
        console.error(err)
    }
}

export const setRank = (data) => {
    try {
        return fs.writeFileSync(filename.rank, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

export const rankRoute = [
    {
      // GET RANK
      method: 'get',
      route: '/rank',
      handler: (req, res) => {
        const ranks = getRank()
        res.send(ranks)
      },
    },
    {
      // CREATE RANKS
      method: 'post',
      route: '/rank',
      handler: ({ body }, res) => {
        const ranks = getRank()
        const newRank =   {
            id: "wonny",
            score: 200,
            timestamp: "2021.6.24"
          }
        ranks.unshift(newRank)
        setRank(ranks)
        res.send(newRank)
      },
    },
  ]

