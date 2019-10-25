class Chat {
    

create_chat(useriD: string, user_2iD: string){

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
        success:,
        fail:
    })
}



send_message()


}