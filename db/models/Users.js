import { sql } from '../helpers.js'
/**
 * Users Table
 * uid: PK
*/
export default class UserModel {
    tableName = 'users'

    /** @param { import('sqlite').Database } db*/
    constructor(db) {
        super(db)
    }

    async init() {
        return await this.db.exec(sql`
            DROP TABLE IF EXISTS ${this.tableName};
            CREATE TABLE ${this.tableName}(
                uid INTEGER PRIMARY KEY AUTOINCREMENT
            );
        `)
    }
}