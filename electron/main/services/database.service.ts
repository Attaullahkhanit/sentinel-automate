import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { app } from 'electron'
import path from 'node:path'

// Get the path to the SQLite file in userData
const dbPath = path.join(app.getPath('userData'), 'sentinel.db')

// In Prisma 7, the adapter takes a config object with the URL directly
const adapter = new PrismaBetterSqlite3({ 
  url: dbPath 
})

// Initialize Prisma Client with the adapter
export const prisma = new PrismaClient({ adapter })

export default prisma
