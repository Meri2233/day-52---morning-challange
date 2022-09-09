const express = require("express");
const router = express.Router();
const placeModel = require("../model/places.model");

router.post('/addplace', async(req, res) => {
    const { name, slug, city, state } = req.body;
    if(!name || !slug || !city || !state){
        return res.status(400).send("All fields are required")
    }
    const existingPlace = await placeModel.findOne({name:name});
    
    if(existingPlace !== null){
        return res.status(400).send("Place Already Added");
    }

    const newPlace = new placeModel({
        name:name,
        slug:slug,
        city:city,
        state:state
    })
    try{
        const savedUser = await newPlace.save();
        res.status(200).send("Place Added");
    }
    catch(e){
        console.log(e.message);
        res.status(501).send(e.message);
    }
})

router.get('/detail',async(req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).send("Please Enter Place Name");
    }
    const place = await placeModel.findOne({name:name});
    res.status(200).send(place);
})

router.get('/listplaces',async(req,res)=>{
    const {city} = req.body;
    if(!city){
        return res.status(400).send("Please Enter the place name");
    }
    const places = await placeModel.find({city:city});
    res.status(200).send(places);
})

module.exports = router;