const { axios, extractAxiosError } = require('../../../../../..')
const { connect } = require('../../../../../../lib/sftp')
const fs = require('fs')
const path = require('path')
const { isText } = require('istextorbinary')
/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    axios.get('/1.0/instances/'+req.params.name).then(response => {
        connect(req.params.name).then(async result => {
                var base_dir = result.dir;
                if (!req.query.path) return res.status(400).send({
                    "type": "sync",
                    "status": "Error",
                    "status_code": 400,
                    "error": "Path query not present",
                    "metadata": {}
                })
                if (req.query.path.includes('../') || req.query.path.includes('/..')) return res.status(400).send({
                    "type": "sync",
                    "status": "Error",
                    "status_code": 400,
                    "error": "using '..' is not allowed",
                    "metadata": {}
                })
                if (fs.statSync(base_dir + req.query.path).isFile()) {
                    var is_text = await isText(base_dir + req.query.path)
                    res.send({type: "file",is_text})
                    result.child_process.kill()
                } else if (fs.statSync(base_dir + req.query.path).isDirectory()) {
                    res.send({type: 'dir'})
                    result.child_process.kill()
                } else {
                    result.child_process.kill()
                    return res.status(400).send({
                        "type": "sync",
                        "status": "Error",
                        "status_code": 400,
                        "error": "Not allowed to access non file / directory",
                        "metadata": {}
                    })
                }
        }).catch(err => {
            return res.status(400).send({
                "type": "sync",
                "status": "Error",
                "status_code": 400,
                "error": "Error while initializing SFTP: " + err,
                "metadata": {}
            })
        })
    }).catch(err => {
        var error = extractAxiosError(err)
        res.status(error.status).send(error.data)
    })
}
