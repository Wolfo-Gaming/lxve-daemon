const { axios, extractAxiosError } = require('../../../../..')
const { connect } = require('../../../../../lib/sftp')
const fs = require('fs')


/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    axios.get('/1.0/instances/' + req.params.name).then(response => {
        connect(req.params.name).then(result => {
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
            var file = req.file;
            console.log(file)
            if (file) {
                var file_path = base_dir + req.query.path + "/" + file.originalname;
                fs.copyFileSync(file.path, file_path);
                res.send({
                    "type": "sync",
                    "status": "Success",
                    "status_code": 200,
                    "error": "",
                    "metadata": {
                        "file_path": file_path
                    }
                })
                result.child_process.kill()
            } else return res.status(400).send({
                "type": "sync",
                "status": "Error",
                "status_code": 400,
                "error": "File not present",
                "metadata": {}
            })
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
