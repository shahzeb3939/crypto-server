import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

const mongoDB = "mongodb+srv://admin:admin@cluster0.409squt.mongodb.net/dbOne";
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

try {
    const db = mongoose.connection;
    console.log("MongoDB connection established")
} catch (e) {
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

const Schema = mongoose.Schema;

const DataSchema = new Schema({
    logo: String,
    title: String,
    rate: String,
    hcsc: String,
    tags: String,
    liq: String,
    start: String,
    desc: String
  });

  const DataModel = mongoose.model("DataModel", DataSchema, "collectionOne");

const app = express();

app.use(express.json());


app.get('/all_tokens', async (req, res) => {
    
    try{
        const data = await DataModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

app.post('/create_token', async (req, res) => {

    const newInstance = new DataModel({ 
        logo: req.body.logo,
        title: req.body.title,
        rate: req.body.rate,
        hcsc: req.body.hcsc,
        tags: req.body.tags,
        liq: req.body.liq,
        start: req.body.start,
        desc: req.body.desc
     });

     try {
        const dataToSave = await newInstance.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));


    //      { 
    //         "logo": "img1",
    //         "title": "Crypto Heros",
    //         "rate": "50,000 CHT",
    //         "hcsc": "50 BNB - 100 BNB",
    //         "tags": "Upcoming",
    //         "liq": "60%",
    //         "start": "Dec 5, 14:00 UTC",
    //         "desc": "Hello this is a good project"
    //      }