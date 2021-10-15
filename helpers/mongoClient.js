const { MongoClient } = require('mongodb');

let client;

function isConnected() {
    return !!client && !!client.topology && client.topology.isConnected()
}

const checkClient = async () => {
    const createClient = async () => {
        const uri = 'mongodb+srv://revanth:I_build_apps_97@cluster0.krgqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

        console.log('Creating mongodb client');
        try {
            client = await MongoClient.connect(uri);
            // client = await MongoClient.connect(process.env.MONGO_URL ||mongo.url, mongo.options);
        } catch (err) {
            console.error('Mongo Db connection creation failed');
            console.error(err);
        } finally {
            if (client && isConnected) {
                console.log('Connection created successfully');
            }
        }
    }
    if (client) {
        console.log('Client Exists');
        try {
            if (isConnected()) {
                return;
            }
        } catch (err) {
            console.error(err);
            await createClient();
        }
    } else {
        await createClient();
    }
}

module.exports = {
    async insertOne(dbname, collection, doc, options) {
        await checkClient();
        console.log("Insert doc",doc,options)
        return await client.db(dbname).collection(collection).insertOne(doc, options);
    },
    async insertMany(dbname, collection, doc, options) {
        await checkClient();
        return await client.db(dbname).collection(collection).insertMany(doc, options);
    },
    async getClient() {
        await checkClient();
        return client;
    },  
    async findOne(dbname, collection, queryObj) {
        await checkClient();
        const result = await client.db(dbname).collection(collection).findOne(queryObj || {});
        return result;
    }
}