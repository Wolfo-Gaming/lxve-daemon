const { axios, extractAxiosError } = require('../../../../..')

/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    axios.get("/1.0/instances/" + req.params.name + "/state").then(response => {
        var start_time = Date.now()
        var state = response.data
        if (state.metadata.status == "Running") {
            var os = require('os')
            axios.get('/1.0/instances/' + req.params.name).then(async response => {
                var instance_cpulimit = response.data.metadata.config["limits.cpu"];
                var host_cores = os.cpus().length;
                var cpu_count = instance_cpulimit ? instance_cpulimit : host_cores;
                var cores_multiplier = 100000 / cpu_count
                var usage1 = state.metadata.cpu.usage / 1000000000
                var usage2 = (await axios.get("/1.0/instances/" + req.params.name + "/state")).data.metadata.cpu.usage / 1000000000
                var cpu_usage = ((usage2 - usage1) / (Date.now() - start_time)) * cores_multiplier
                if (cpu_usage > 100) {
                    cpu_usage = 100;
                }
                if (response.data.metadata.config["limits.memory"]) {
                    var memory_limit = response.data.metadata.config["limits.memory"];
                    var parsed_memory_unit = memory_limit.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
                    var parsed_memory_value = parseFloat(memory_limit, 10)
                    switch (parsed_memory_unit) {
                        case 'B':
                            var memory_multiplier = 1
                            break;
                        case 'kB':
                            var memory_multiplier = 1000
                            break;
                        case 'MB':
                            var memory_multiplier = 1000000
                            break;
                        case 'GB':
                            var memory_multiplier = 1000000000
                            break;
                        case 'TB':
                            var memory_multiplier = 1000000000000
                            break;
                        default:
                            var memory_multiplier = 1
                            break;
                    }
                    var memory_bytes_limit = parsed_memory_value * memory_multiplier
                } else {
                    var memory_bytes_limit = os.totalmem()
                }
                console.log(memory_bytes_limit)
                res.send({
                    state: state.metadata.status,
                    cpu: {
                        percent: cpu_usage,
                        cores: cpu_count,
                    },
                    swap: {
                        usage: (state.metadata.memory.swap_usage * 0.00000095367432)
                    },
                    memory: {
                        limit: memory_bytes_limit,
                        usage: (state.metadata.memory.usage),
                        percent: (state.metadata.memory.usage / memory_bytes_limit) * 100
                    },
                    disk: {
                        root: {
                            usage: state.metadata.disk ? state.metadata.disk.root ? state.metadata.disk.root.usage : 0 : 0
                        }
                    }
                })
            })
        } else {
            res.send({
                state: state.metadata.status,
                cpu: 0,
                swap: {
                    usage: 0
                },
                memory: {
                    usage: 0,
                    percent: 0
                },
                disk: {
                    usage: state.metadata.disk ? state.metadata.disk.root ? state.metadata.disk.root.usage : 0 : 0
                }
            })
        }
    })

}
