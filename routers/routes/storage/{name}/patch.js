const { axios, extractAxiosError } = require('../../../..')

/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    axios.patch('/1.0/storage-pools/' + req.params.name, req.body).then(response => {
        res.send(response.data)
    }).catch(err => {
        var error = extractAxiosError(err)
        res.status(error.status).send(error.data)
    })
}