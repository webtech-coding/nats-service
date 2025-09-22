const {connect} = require('nats');

const natsConnection = async ()=>{
    const NATS_HOST = process.env.NATS_HOST || 'localhost';
    const url = `http://${NATS_HOST}:4222`
    return await connect({servers:url});
}

export default natsConnection