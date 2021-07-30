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


