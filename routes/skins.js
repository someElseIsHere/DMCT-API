const express = require('express');
const router = express.Router();
const {collection} = require('../index');

//Getting One
router.get('/:id', async (req, res) => {
    await res.json(collection.findOne({id: req.params.id}));
});

//Creating One
router.post('/', async (req, res) => {
    const skin = {
        id: req.body.id,
        texture: req.body.texture,
        lightMap: req.body.lightMap,
        model: req.body.model,
        doorModel: req.body.doorModel,
    };

    await collection.insertOne(skin);
    await res.json(skin);
});

//Updating One
router.patch('/:id', async (req, res) => {
    if(req.body.id != null)
        await collection.updateOne({id: req.params.id}, {$set: {id: req.body.id}});

    if(req.body.texture != null)
        await collection.updateOne({id: req.params.id}, {$set: {texture: req.body.texture}});
    
    if(req.body.lightMap != null)
        await collection.updateOne({id: req.params.id}, {$set: {lightMap: req.body.lightMap}});

    if(req.body.model != null)
        await collection.updateOne({id: req.params.id}, {$set: {model: req.body.model}});
    
    if(req.body.doorModel != null)
        await collection.updateOne({id: req.params.id}, {$set: {doorModel: req.body.doorModel}});
    
    const skin = await collection.findOne({id: req.params.id});
    await res.json(skin);
});

//Deleting One
router.delete('/:id', async (req, res) => {
    await collection.deleteOne({id: req.params.id});
    await res.json({message: 'Deleted Skin'});
});

module.exports = router;