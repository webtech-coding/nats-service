const { connect } = require('nats');

const natsConnection = async (server, port)=>{
    const NATS_SERVER = server || 'localhost'
    const NATS_PORT = port || 4222

    const url = `http://${NATS_SERVER}:${NATS_PORT}`
    return await connect({servers:url});
}

module.exports =  natsConnection