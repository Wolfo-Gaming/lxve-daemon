const { axios, extractAxiosError, websockets } = require('../../../../../')

/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    var token = req.query.wstoken
    websockets.revoke(token)
    axios.put('/1.0/instances/' + req.params.name + '/state', {
        "action": req.query.action,
        "timeout": 30
    }).then(response => {
         res.send(response.data)
    }).catch(err => {
        var error = extractAxiosError(err)
        res.status(error.status).send(error.data)
    })
}