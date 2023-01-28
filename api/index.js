import httpServer from './lib/httpServer.js'
import * as dotenv from 'dotenv'
dotenv.config()
const { PORT } = process.env

httpServer.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
