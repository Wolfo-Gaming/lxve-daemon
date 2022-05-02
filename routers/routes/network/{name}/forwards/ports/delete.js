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
        console.log(req.query)
        if (req.query.ports && req.query.target_address && req.query.protocol) {
            console.log(meta.ports)
            meta.ports = meta.ports.filter(port => {
                console.log({ isProtocol: port.protocol != req.query.protocol, isPort: port.listen_port != req.query.ports, isTarget: port.target_address != req.query.target_address })
                return port.protocol != req.query.protocol || port.listen_port != req.query.ports || port.target_address != req.query.target_address
            })
            console.log(meta.ports)
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
                "error": "Invalid request query. must contain 'ports', 'target_address' and 'protocol'",
                "metadata": {}
            })
        }



    }).catch(err => {
        var error = extractAxiosError(err)
        res.status(error.status).send(error.data)
    })

}