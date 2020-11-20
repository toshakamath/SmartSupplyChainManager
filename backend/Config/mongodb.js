const {MongoClient} = require('mongodb');

async function setupMongoDbConnection(){
    const uri = "mongodb+srv://root:root@cluster0.uymh0.mongodb.net/smartsupplychain_db?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = {setupMongoDbConnection}
