import { sql, DatabaseDebugger } from './helpers'

describe('db/helpers.js', () => {
    describe('sql()', () => {
        it('returns the string completely unmodified', () => {
            expect(
                sql`SELECT * FROM users;`
            ).toEqual('SELECT * FROM users;')
        })
    })

    describe('DatabaseDebugger', () => {
        function createDatabaseDebugger(...params) {
            return new DatabaseDebugger(...params)
        }

        it('should have a constructor', () => {
            const databaseDebugger = createDatabaseDebugger({})
            expect(databaseDebugger.db).toEqual({})
        })

        describe('> getTables()', () => {
            it('maps to an array of table names', async () => {
                const mockQueryResult = [{ name: 'users' }, { name: 'sqlite_sequence' }]
                const databaseDebugger = createDatabaseDebugger({
                    all: jest.fn(async () => mockQueryResult )
                })

                expect(await databaseDebugger.getTables()).toEqual([
                    'users', 'sqlite_sequence'
                ])
            })

            it('returns an empty array if there are no tables', async () => {
                const databaseDebugger = createDatabaseDebugger({
                    all: jest.fn(async () => [])
                })

                expect(await databaseDebugger.getTables()).toEqual([])
            })
        })
    })
})