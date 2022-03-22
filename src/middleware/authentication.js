const { APIKEY } = require("../configurations/config")

const auth = (req, res, next) =>{
    const pollapikey = req.headers['poll-api-key']

    if(pollapikey !== APIKEY){
        res.status(401).send('Wrong API Key!')
        return
    }

    next()
}

module.exports = auth