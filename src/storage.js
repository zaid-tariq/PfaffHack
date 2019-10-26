class Storage {
    
    constructor(){

    }

    store_information(eventBroker, data_dict){ 

       eventBroker.request('PersistDataCommand', 
         {
          "force": false,
          "storageObject": {
           "metadata": {
            "tags":["A-Team"]
           },
           "data":data_dict
          }
         }
        ).then((res)=>{
            console.log(res);
           // this.find_second_user(res["payload"]["userId"], user2_name, message);
        }).catch((err)=>console.log(err))
    } 

    get_information(eventBroker, data_dict, result_limit){
      eventBroker.request('RetrieveDataByExampleCommand', 
          {
              "limit": result_limit,
              "sort": {
                  "metadata.createdAt": -1
              },
              "projection": {
                  "id": 1,
                  "metadata.createdAt": 1,
                  "data": 1
              },
              "example": {
                  "data": username
              }
          }
        ).then((res)=>{
            console.log(res["payload"]["event"]["result"]);
           // this.find_second_user(res["payload"]["userId"], user2_name, message);
        }).catch((err)=>console.log(err))
    }
}

// eventBroker = require('../js/eventBrokerConnector')({
//     brokerHost: '194.94.239.125',
//     brokerPort: '9000',
//     appName: 'test-app',
//     appHost: '192.168.137.1',
//     appPort: '8080'
// });
// app = eventBroker.app;
// eventBroker.listen();
// var storage = new Storage();
//storage.store_information(eventBroker, {"username":"Joker", "date":"12-05-95"});
//storage.get_information(eventBroker, {"date":"12-05-95"}, 4);
module.exports = Storage;