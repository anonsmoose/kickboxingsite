import { Fighter } from 'lib/db'
import fs from 'fs'
import os from 'os'


export default async function saveDatabaseLocally()
{
    const fighters = await Fighter.find({},"_id name nationality wins losses history")
    const fighterTable = {}
    for (const fighter of fighters)
    {
        fighterTable[fighter.name] = fighter
    }
    fs.writeFileSync(os.tmpdir() + '/fighters.json', JSON.stringify(fighterTable))
}
