const {MongoClient} = require("mongodb");
const dbUrl = "mongodb://localhost:27017";
const dbName = "mern-14";

class MongoDBService{
    db; 
    constructor() {
        try{
            this.connect();
        } catch(err) {
            throw err
        }
    }

    connect = async()=>{
        try {
            const client = await MongoClient.connect(dbUrl);
            this.db = client.db(dbName);
        } catch(error) {
            throw error;
        }
    }
}

module.exports = MongoDBService;