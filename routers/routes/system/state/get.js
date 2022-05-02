const { axios, extractAxiosError } = require('../../../..')
var os = require('os-utils');
var si = require('systeminformation');
const oss = require('os');
/** @param {import('express').Request} req  @param {import('express').Response} res */
module.exports = (req, res) => {
    os.cpuUsage(async function (cpu_usage){
        var cpu = await si.cpu()
        var mem = await si.mem()
        var cores = cpu.cores;
        var cpu_model = oss.cpus()[0].model.replace('  ', ' ').replace('  ', ' ').replace('  ', ' ');
        var total_mem = mem.total;
        var used_mem = mem.used;
        var free_mem = mem.free;
        var net = await si.networkStats()
        var interfaces = net;
        var disk = await si.diskLayout()
        var disks = disk;
        res.send({
            cpu_usage: cpu_usage,
            cpu_model: cpu_model,
            total_mem: total_mem,
            used_mem: used_mem,
            free_mem: free_mem,
            interfaces: interfaces,
            disks: disks,
            cores: cores
        })
    });
}