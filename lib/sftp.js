const { Client, SFTPWrapper } = require('./ssh2/lib/index');
var tcpPortUsed = require('tcp-port-used');
const childprocess = require('child_process');
const REQUEST = {
    INIT: 1,
    OPEN: 3,
    CLOSE: 4,
    READ: 5,
    WRITE: 6,
    LSTAT: 7,
    FSTAT: 8,
    SETSTAT: 9,
    FSETSTAT: 10,
    OPENDIR: 11,
    READDIR: 12,
    REMOVE: 13,
    MKDIR: 14,
    RMDIR: 15,
    REALPATH: 16,
    STAT: 17,
    RENAME: 18,
    READLINK: 19,
    SYMLINK: 20,
    EXTENDED: 200
};
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
module.exports.EVENT_KEYS = REQUEST
const { Server } = require('./ssh2/lib/index');
const { flagsToString, SFTP } = require('./ssh2/lib/protocol/SFTP');
/**
 * 
 * @param {function(import('ssh2').AuthContext)} authlistener 
 * @param {number} port 
 * @param {Buffer} privateKey 
 * @returns {Promise<void>}
 */
module.exports.launch = function startSFTP(authlistener, port, privateKey) {
    return new Promise((resolve, reject) => {
        //console.log(privateKey)
        /** @type {import('ssh2').Server} */
        var sftpsrv = new Server({
            hostKeys: [privateKey]
        })
        sftpsrv.on('connection', (connection, clientInfo) => {
            /**@type {SFTPWrapper} */
            let p;
            connection.on('authentication', (ctx) => {
                var res = authlistener(ctx)
                Promise.resolve(res).then(async instanceName => {
                    p = launch(instanceName)
                })
            })
            connection.on('ready', () => {
                //console.log('Accepted Authentication')
                connection.on('session', (acceptSession, rejectSession) => {
                    const session = acceptSession();
                    var prefix = "fair-moose"
                    if (!session) {
                        connection.end();
                        return;
                    }

                    //console.log('Session started!');

                    // Specific to an SFTP Connection. Also X11 or shell ... possible.
                    session.on('sftp', async (acceptSftp, rejectSftp) => {
                        //console.log('Client SFTP session');
                        const sftp = acceptSftp();
                        var s = await p;

                        // sftp on any event

                        s.on('error', (err) => {
                            sftp.destroy(err)
                        })
                        sftp.on('error', (err) => {
                            sftp.destroy(err)
                        }).on('CLOSE', (req, handle) => {
                            sftp.status(req, 0)
                        }).on('FSETSTAT', (req, handle, attr) => {
                            s.fsetstat(handle, attr);
                            sftp.status(req, 0)
                        }).on('FSTAT', (req, handle) => {
                            s.fstat(handle, (err, stats) => {
                                //console.log('fstat-stats', stats)
                                if (!stats) stats = {}
                                sftp.attrs(req, stats)
                            })
                        }).on('LSTAT', (req, path) => {
                            s.lstat(path, (err, stats) => {
                                //console.log("AAAAA" +stats)
                                if (!stats) {
                                    return sftp.status(req, 2)
                                }
                                sftp.attrs(req, stats)
                            })
                        }).on('MKDIR', (req, path, attr) => {
                            s.mkdir(path, attr)
                            sftp.status(req, 0)
                        }).on('OPEN', (req, file, flags, attr) => {
                            //console.log(flags)
                            //console.log(":as" + attr == undefined)
                            s.open(file, flagsToString(flags) != null ? flagsToString(flags) : "wx+", attr, (err, handle) => {
                                if (!handle) handle = Buffer.from('');
                                //console.log(handle)
                                sftp.handle(req, handle)
                            })
                        }).on('OPENDIR', (req, path) => {
                            s.opendir(path, (err, handle) => {
                                sftp.handle(req, handle)
                            })
                        }).on('READ', (req, handle, offset, length) => {
                            //pass read to sftp client
                            //console.log(offset, length)
                            //convert offset to buffer
                            if (offset == length) {
                                return sftp.status(req, 1)
                            }
                            var buffer = Buffer.alloc(length)

                            s.read(handle, buffer, offset, length, 0, (err, read, data) => {
                                sftp.data(req, buffer.slice(0, read))
                            })

                            // var fs = require('fs')
                            // var buffer = Buffer.alloc(length);
                            // return fs.read(localHandle.tmpFile, buffer, 0, length, offset, function (err, bytesRead, buffer) {
                            //     return this.sftpStream.data(reqid, buffer.slice(0, bytesRead));
                            // }.bind(this));
                        }).on('READDIR', (req, handle) => {
                            //pass readdir to sftp client
                            s.readdir(handle, (err, files) => {
                                //console.log(files)
                                if (files) {
                                    sftp.name(req, files)
                                } else {
                                    sftp.name(req, [])
                                }

                            }
                            )
                        }).on('READLINK', (req, path) => {
                            s.readlink(path, (err, link) => {
                                if (!link) {
                                    return sftp.status(req, 2)
                                }
                                sftp.name(req, link)
                            }
                            )
                        }).on('REALPATH', (req, path) => {
                            s.realpath(path, (err, resolvedPath) => {

                                sftp.name(req, resolvedPath)
                            }
                            )

                        }).on('REMOVE', (req, path) => {
                            // sftp remove
                            s.unlink(path, (err) => {
                                sftp.status(req, 0)
                            })

                        }).on('RENAME', (req, oldpath, newpath) => {
                            s.rename(oldpath, newpath)
                            sftp.status(req, 0)
                        }).on('RMDIR', (req, path) => {
                            s.rmdir(path)
                            sftp.status(req, 0)
                        }).on('SETSTAT', (req, path, attr) => {
                            s.setstat(path, attr)
                            sftp.status(req, 0)
                        }).on('STAT', (req, path) => {
                            s.stat(path, (err, stats) => {
                                if (!stats) stats = {}
                                sftp.attrs(req, stats)
                            })
                        }).on('SYMLINK', (req, link, target) => {
                            s.symlink(target, link)
                            sftp.status(req, 0)
                        }).on('WRITE', (req, handle, offset, data) => {
                            //sftp write ssh2
                            //s.write
                            // console.log("wrote " + data.length)
                            if (data.length === 0) {
                                sftp.status(req, 0)
                            } else {
                                s.write(handle, data, 0, data.length, offset, (err) => {
                                    //console.log(bytesWritten)
                                    //console.log(err)
                                    // console.log("OK")
                                    sftp.status(req, 0)
                                })
                            }
                            //console.log(req, handle, offset, data, data.byteLength)

                        })

                    });

                });
            })
        })
        sftpsrv.listen(port, () => {
            resolve()
        })
    })

}
/**
 * 
 * @param {string} instance 
 * @returns {Promise<import('ssh2').SFTPWrapper>}
 */
module.exports.listen = function listen(instance) {
    return new Promise(async (resolve, reject) => {
        var port = parseInt(makeid(4))
        if (await tcpPortUsed.check(port) == true) {
            port = parseInt(makeid(4))
            if (await tcpPortUsed.check(port) == true) {
                port = parseInt(makeid(4))
            }
        }
        const lxcmount = childprocess.spawn('/snap/bin/lxd.lxc', ['file', 'mount', instance, '--listen', '0.0.0.0:' + port, '--no-auth']);
        lxcmount.stderr.on('data', (d) => {
            console.log(d.toString())
        })
        lxcmount.on('error', (d) => {
            console.log(d.toString())
        })
        lxcmount.stdout.on('data', data => {
            var msg = data.toString();
            if (msg.includes("client connected")) {
                var [clientip, clientport] = data.toString().split('"')[1].split(':')
                //console.log('client connected to ' + clientip + ':' + clientport);
            }
            if (msg.includes("SFTP listening")) {
                var listenport = parseInt(data.toString().split(':')[3].replace('\n', ''))
                //console.log('SFTP Server is listening on port: ' + listenport);
                const conn = new Client();
                conn.on('error', (err) => {
                    console.log(err)
                })
                conn.on('ready', () => {
                    //console.log('Client :: ready');
                    conn.sftp(async (err, sftp) => {
                        if (err) return reject(err);
                        resolve(sftp)
                    });
                }).connect({
                    host: '127.0.0.1',
                    port: port,
                    username: 'frylock',
                });
            }

        })
    })

}
/**
 * 
 * @param {string} instance 
 * @returns {Promise<SFTPWrapper>}
 */

function launch(instance) {

    return new Promise(async (resolve, reject) => {
        //if (!options.authlistener) return reject(new Error('No auth listener specifed'));
        //if (!options.port) return reject(new Error('No listen port specified'));
        //if (!options.privateKey) return reject(new Error('No privatekey specified'))
        try {

            var port = parseInt(makeid(4))
            if (await tcpPortUsed.check(port) == true) {
                port = parseInt(makeid(4))
                if (await tcpPortUsed.check(port) == true) {
                    port = parseInt(makeid(4))
                }
            }
            const lxcmount = childprocess.spawn('./lxc/lxc', ['file', 'mount', instance, '--listen', '0.0.0.0:' + port]);
            //console.time('sftp');
            lxcmount.on('spawn', () => {

            })
            lxcmount.stdout.on('data', data => {
                var msg = data.toString();
                if (msg.includes("client connected")) {
                    var [clientip, clientport] = data.toString().split('"')[1].split(':')
                    //console.log('client connected to ' + clientip + ':' + clientport);
                }
                if (msg.includes("SFTP listening")) {
                    var listenport = parseInt(data.toString().split(':')[3].replace('\n', ''))
                    //console.log('SFTP Server is listening on port: ' + listenport);
                    const conn = new Client();
                    conn.on('error', (err) => {
                        console.log(err)
                    })
                    conn.on('ready', () => {
                        //console.log('Client :: ready');
                        conn.sftp(async (err, sftp) => {
                            if (err) return reject(err);
                            resolve(sftp)
                        });
                    }).connect({
                        host: '127.0.0.1',
                        port: port,
                        username: 'frylock',
                    });
                }

            })
            lxcmount.stderr.on('data', data => {
                reject(data.toString())
            })
        } catch (error) {
            reject(error);
        }

    })


}
