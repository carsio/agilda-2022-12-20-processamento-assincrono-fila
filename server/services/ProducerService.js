

const amqp = require('amqplib/callback_api');

class ProducerService  {
    constructor(){
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                throw error1;
                }
                const exchange = 'ex_youtube';
                const queue = 'queue_youtube';
    
                channel.assertExchange(exchange, 'topic', {durable: true})
    
                channel.assertQueue(queue, {
                durable: false
                })
                
                ;

            });
            });
    }

    publishMessageQueue(data){

        amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
            throw error1;
            }
            const exchange = 'ex_youtube';
            const queue = 'queue_youtube';

            channel.assertExchange(exchange, 'topic', {durable: true})

            channel.assertQueue(queue, {
            durable: false
            })
            
            ;
            channel.bindQueue(queue, exchange, '');

            channel.publish(exchange,'', Buffer.from(JSON.stringify(data)));
            console.log(" [x] Sent %s", data);
        });
        });
    

    }
}
module.exports = ProducerService