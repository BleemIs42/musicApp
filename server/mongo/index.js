import mongoose from 'mongoose'

const URI = 'mongodb://localhost:27017/local'

export default async () => {
    try {
        // const db = await mongoose.createConnection(URI, {
        const db = await mongoose.connect(URI, {
            useMongoClient: true,
            promiseLibrary: global.Promise
        })
        console.log(`\n👉 SUCCESS to connect mongoose ${URI}\n`)
        return db
    } catch (err) {
        console.log(err)
        console.log(`\n✘ FAILED to connect mongoose ${URI}\n`)
    }
}
