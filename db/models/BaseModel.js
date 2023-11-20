
export default class BaseModel {
    /** @param { import('sqlite').Database } db*/
    constructor(db) {
        this.db = db
    }

    async dropTable() {
        return await this.db
    }
}