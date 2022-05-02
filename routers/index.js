const express = require('express')
const router = express.Router()
//require('express-ws')(router)
router.get('/api/v1/info', (req, res) => {
    res.send({
        app_version: process.env.APP_VERSION,
        status: "OK"
    })
})
router.get('/api/v1/system/state', require('./routes/system/state/get'))
router.ws('/api/v1/events', require('./routes/events/ws'))
// instance endpoints
router.get('/api/v1/instance', require('./routes/instance/get'))
router.get('/api/v1/instance/:name', require('./routes/instance/{name}/get'))
router.patch('/api/v1/instance/:name', require('./routes/instance/{name}/patch'))
router.get('/api/v1/instance/:name/state', require('./routes/instance/{name}/state/get'))
router.post('/api/v1/instance/:name/console', require('./routes/instance/{name}/console/post'))
router.ws('/api/v1/instance/:name/console', require('./routes/instance/{name}/console/ws'))
// network endpoints
router.get('/api/v1/network', require('./routes/network/get'))
router.get('/api/v1/network/:name', require('./routes/network/{name}/get'))
router.get('/api/v1/network/:name/state', require('./routes/network/{name}/state/get'))
router.get('/api/v1/network/:name/leases', require('./routes/network/{name}/leases/get'))
router.patch('/api/v1/network/:name', require('./routes/network/{name}/patch'))
router.post('/api/v1/network/:name/forwards', require('./routes/network/{name}/forwards/post'))
router.get('/api/v1/network/:name/forwards', require('./routes/network/{name}/forwards/get'))
router.post('/api/v1/network/:name/forwards/:ip/ports', require('./routes/network/{name}/forwards/ports/post'))
router.get('/api/v1/network/:name/forwards/:ip/ports', require('./routes/network/{name}/forwards/ports/get'))
router.delete('/api/v1/network/:name/forwards/:ip/ports', require('./routes/network/{name}/forwards/ports/delete'))
// storage endpoints
router.get('/api/v1/storage', require('./routes/storage/get'))
router.get('/api/v1/storage/:name/volumes', require('./routes/storage/{name}/volumes/get'))
router.get('/api/v1/storage/:name/resources', require('./routes/storage/{name}/resources/get'))
router.patch('/api/v1/storage/:name', require('./routes/storage/{name}/patch'))
router.get('/api/v1/storage/:name', require('./routes/storage/{name}/get'))
module.exports = router