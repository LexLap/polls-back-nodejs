const express = require('express');
const auth = require('../middleware/authentication');
const logToFile = require('../middleware/logger');
const Poll = require('../models/pollModel');
const router = new express.Router();

router.get('/api/polls?', async (req, res) =>{
    
    const docsCounter = await Poll.countDocuments()
    const pollsPerPage = 3
    const page = req.query.page
    const complete = docsCounter <= page * pollsPerPage

    try {
        const result = await Poll.find({}).skip((page - 1) * pollsPerPage).limit(pollsPerPage)

        res.status(201).send({
            "data": [...result],
            complete,
            page
        })

    } catch(error){
        res.status(500).send({
            message: error.message
        })
    }

})


router.patch('/api/poll/:poll/vote/:option', logToFile, async (req, res) =>{

    const { 
        poll,
        option
    } = req.params

    try {
        const result = await Poll.findOne({ _id: poll })
        await result.incVotes(option)

        res.status(201).send('ok')
    } catch (error) {
        if(error.name=="CastError") res.status(404).send("Poll does not exist!")
        else 
            res.status(500).send({
                message: error.message
            })
    }
})

router.post('/api/poll/add-poll', auth, async (req, res) =>{
    
    const title = { title: req.body.title }

    if(await Poll.findOne(title)){
        res.status(401).send("Such poll already exists!")
    } else

        try{
            const poll = new Poll({
                title: req.body.title,
                options: req.body.options
            })
            await poll.save()

            res.status(201).send('ok')
        } catch(error){
            res.status(500).send({
                message: error.message
            })
        }
})


module.exports = router 