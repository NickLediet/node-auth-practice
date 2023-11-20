import Logger from '../lib/Logger.js'

export const sql = (strings, ...expr) =>
  strings
    .map((str, index) => str + (expr.length > index ? String(expr[index]) : ''))
    .join('');

export class DatabaseDebugger {
    /** @param { import('sqlite').Database } db*/
    constructor(db) {
        this.db = db
    }
    /** @param { import('sqlite').Database } db*/
    async getTables() {
        return (await this.db.all(sql`
            SELECT name from sqlite_master
            WHERE type='table'
        `)).map(({ name }) => name)
    }

    async logTables() {
        const tablesData = await this.getTables()
        Logger.log(tablesData)
    }
}
