# Nats Service

![version](https://img.shields.io/badge/version-1.0.1-blue.svg)

A light weight package for instantiating a NATS service and functionality for connecting, subscribing and publishing nats topics.

## nats server
You must have your NATS server running. The default host is localhost:4222. You can provide your own host and port number during ``` natsConnection ``` initiation

## 📦 Installation

```bash
npm install nats-service
```
## 🚀 Usage

```js
import { natsService, natsConnection } from 'nats-serivce';


const natsService=()=> {
    const NATS_SERVER = localhost // default localhost, if not provided
    const NATS_PORT = 4222 // default 4222, if not provided

    natsConnection(NATS_SERVER, NATS_PORT).then(()=>{
        console.log('NATS connected...')
    }).catch(error=>{
        console.error(error)
    })
}

// register a topic with callback
// registered callback with be called once the message arrives for the subscribed topic
natsService.subscribe('product.created', (payload)=>{
    console.log('Event received with payload')
    console.log(payload)
});


// publish a nats topic with a payload.
// the payload should always be a json
natsService.publish('product.created', {id:123, name:'A new product'});
```

