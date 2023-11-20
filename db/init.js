#!/usr/bin/env node
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { writeFile, readFile, rm } from 'node:fs/promises'
import Logger from '../lib/Logger.js'
import { sql, DatabaseDebugger } from './helpers.js'
import UserModel from './models/Users.js'

const DB_NAME = 'node-auth-practice'
const DB_FILE_NAME = `./${DB_NAME}.db`

;(async () => {
    try {
        await readFile(DB_FILE_NAME)
        await rm(DB_FILE_NAME)
        Logger.log(`Overwriting "${DB_FILE_NAME}"...\n`)
    } catch(err) {
        Logger.log(`File "${DB_FILE_NAME}" does not exist!\n`)
        Logger.log(`Creating file "${DB_FILE_NAME}...\n"`);
    } finally {
        await writeFile(DB_FILE_NAME, '')
    }

    /** @type {import('sqlite').Database} */
    const db = await open({
        filename: DB_FILE_NAME,
        driver: sqlite3.Database
    })
    const databaseDebugger = new DatabaseDebugger(db)

    // TODO: Dynamically Load and initialize all models
    await (new UserModel(db)).init()
    
    await databaseDebugger.logTables()

    db.close()
})()
