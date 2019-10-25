class Chat {
    
    create_chat(useriD: string, user_2iD: string, message:string){

        payload_ = {
            "type": 'create-chat-global',
            "sender": "A-Team",
            "payload": {
                "participants": [
                   useriD, user2_iD
                ],
                "type": 'global'
            },
            "tags": [
                "chat", "chatroom"
            ]
        }

        # send the payload to service
        $.ajax({
            type:"POST",
            url:"https://194.94.239.125:9000",
            data:payload_,
            success:success_(response){
                packet_ = {
                "type": "send-chat-message",
                "sender": "A-Team",
                "payload": {
                    "roomId": response["payload"]["room"]["roomId"],
                    "sender": useriD,
                    "message": {
                        // message object as shown above
                        "content": message,
                        "sender": useriD,
                        "<your service name>" : "<any data you want to add for your service>"
                    }
                },
                "tags": [
                    "chat", "chatroom", "message",
                ]
                }

                $.ajax({
                    type:"POST",
                    url:"https://194.94.239.125:9000",
                    data:packet_,
                    success:print_message_sent
                })
            }
        })
    }

    print_message_sent(response:var){
        console.info('Message sent')
    }

    send_message(useriD:string, user_2iD:string, message:string){

        // sends message from userId to user_2iD 

        // get the chat room or create new chat room
        create_chat(useriD, user_2iD, message)
    }
}