send_message(user1_name, user2_name, message,eventBroker){
  eventBroker.request('get-user', {
    "username": user1_name
  }
  ).then((res)=>{
    console.log(res);
    this.find_second_user(res["payload"]["userId"], user2_name, message);
  }).catch((err)=>console.log(err))
}

find_second_user(user1_id, user_2name, message){
  console.log(user1_id);
  this.eventBroker.request('get-user', {
    "username": user_2name
    }
    ).then((res)=>{
    console.log(res);
    this.find_chat_room(user1_id, res["payload"]["userId"],
    message);
  }).catch((err)=>console.log(err))
}

find_chat_room(user1_id, user2_id, message){
  //   {
  // type: 'create-chat-global',
  // sender: '<your service name>',
  // payload: {
  //     participants: [
  //        // array of userId strings of users that should be in the room
  //     ],
  //     type: 'global'
  // },
  // tags: [
  //     'chat', 'chatroom', ...
  // ]
  // }
  console.log('in find chat room ' + user2_id);
  //this.eventBroker.subscribe('create-chat-global', (event, topic) => console.log(event) /* do something when this event occurs */)
  this.eventBroker.request('create-chat-global', {
            "participants": [ user1_id
             ,user2_id]
        },
  ).then((res)=>{
      console.log(res);
      this.send_message_(user1_id, user2_id, res["payload"]["room"]["roomId"], message);
  }).catch((err)=>console.log(err))      
}

send_message_(user1_id, user2_id, roomId, message){
  
  console.log(roomId);
  //this.eventBroker.subscribe('send-chat-message', (event, topic) => console.log(event) /* do something when this event occurs */)
   
  this.eventBroker.request('send-chat-message', {
            "roomId":roomId,
            "sender":user1_id,
            "participants":[user1_id, user2_id],
            "message":
              {
                  "content": message,
                  "sender": user1_id
              }
        }
    ).then((res)=>{
        console.log(res);
    }).catch((err)=>console.log(err))      
}

// var chat = new Chat();
