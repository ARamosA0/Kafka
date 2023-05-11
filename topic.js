const {Kafka} = require("kafkajs")

run();
async function run(){
    try
    {
        // Se crea una coneccion admin
        // Se establece una coneccion TCP
         const kafka = new Kafka({
            //   ID del cliente
              "clientId": "myapp",
            //   Puede tener varios brokers en un array
              "brokers" :["localhost:29092"]
         })

        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
        // Creacion de un Topic
        await admin.createTopics({
            "topics": [{
                // Pueden ser varios en un array
                "topic" : "Users",
                // Numer de particiones en el topic A-M, N-Z
                "numPartitions": 2
            }]
        })
        console.log("Created Successfully!")
        await admin.disconnect();
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }


}