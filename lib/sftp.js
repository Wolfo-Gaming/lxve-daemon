var tcpPortUsed = require('tcp-port-used');
const childprocess = require('child_process');
function makeid(length) {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
const { existsSync } = require('fs');
/**
 * 
 * @param {string} instance 
 * @returns {Promise<{dir:string, child_process: childprocess.ChildProcessWithoutNullStreams}>}
 */
module.exports.connect = function connect(instance) {
    return new Promise(async (resolve, reject) => {
        var port = parseInt(makeid(4))
        if (await tcpPortUsed.check(port) == true) {
            port = parseInt(makeid(4))
            if (await tcpPortUsed.check(port) == true) {
                port = parseInt(makeid(4))
            }
        }
        const fs = require('fs')
        if (!existsSync(__dirname + "/../mount/" + instance)) fs.mkdirSync(__dirname + "/../mount/" + instance)
        console.log('/snap/bin/lxd.lxc', ['file', 'mount', instance, __dirname + "/../mount/" + instance].join(' '))
        const lxcmount = childprocess.spawn('/snap/bin/lxd.lxc', ['file', 'mount', instance + '/', __dirname + "/../mount/" + instance]);
        lxcmount.stderr.on('data', (d) => {
            //console.log(d.toString())
            reject(d.toString())
        })
        lxcmount.on('error', (d) => {
            //console.log(d.toString())
            reject(d.toString())
        })
        lxcmount.stdout.on('data', (d) => {
            if (d.toString().includes('Press ctrl+c to finish')) {
                setTimeout(() => {
                    resolve({dir:__dirname + "/../mount/" + instance,child_process: lxcmount})
                }, 500)

            }
            //console.log(d.toString())
        })

    })

}
