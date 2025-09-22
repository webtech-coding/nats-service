import { StringCodec } from 'nats';
import natsConnection from './init.js';

class NatsService{
    constructor(connection){
        this.connection = connection
        this.registerCallbacks = new Map();
        this.coder = StringCodec();
    }

    static async init(){
        const con = await natsConnection();
        return new NatsService(con)
    }

    subscribe(topic, callback){
        if(!callback){
            throw Error('A call back is required for the subscription')
        }
        const subscription = this.connection.subscribe(topic)
        const topicExists = this.registerCallbacks.get(topic)
        if(!topicExists){
            this.registerCallbacks.set(topic, callback)
        }
        this.handleIncommingMessage(subscription);
    }

    publish(topic, payload){
        if(!topic || !payload){
            throw Error('Topic and payload required to publish an event')
        }
        this.connection.publish(topic, JSON.stringify(payload))
    }
    handleIncommingMessage=async (subscription)=>{      
        
        for await (const m of subscription) {
            
            const natsTopic =  m.subject
            const payload = JSON.parse(this.coder.decode(m.data))
            const eventCallback = this.registerCallbacks.get(natsTopic)
            eventCallback(payload);
        }
    }
}

let instance;
const natsServcice = async ()=>{
    if(instance)return

    instance = await NatsService.init();
    return instance
}

export default natsServcice
