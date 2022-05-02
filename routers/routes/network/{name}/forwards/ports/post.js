const { axios, extractAxiosError } = require('../../../../../..')
/* Body:
[
    {
        "description": "",
        "protocol": "tcp",
        "listen_port": "81",
        "target_port": "81",
        "target_address": "10.63.16.84"
    }
]
 */
/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    axios.get('/1.0/networks/' + req.params.name + '/forwards/' + req.params.ip).then(({ data }) => {
        var meta = data.metadata
        var add_ports = req.body;
        console.log({ add_ports, meta })
        if (add_ports instanceof Array) {
            meta.ports = meta.ports.concat(add_ports)
            axios.put('/1.0/networks/' + req.params.name + '/forwards/' + req.params.ip, meta).then(response => {

                res.send(response.data)
            }).catch(err => {
                var error = extractAxiosError(err)
                res.status(error.status).send(error.data)
            })
        } else {
            return res.status(400).send({
                "type": "sync",
                "status": "Error",
                "status_code": 400,
                "error": "Invalid request body",
                "metadata": {}
            })
        }

    }).catch(err => {
        var error = extractAxiosError(err)
        res.status(error.status).send(error.data)
    })

}