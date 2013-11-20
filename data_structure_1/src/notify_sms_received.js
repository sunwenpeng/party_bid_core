function notify_sms_received(message){
    var message_front = (message.messages[0].message).substring(0,2).toLocaleUpperCase();
    if(message_front == "BM"){
        return sign_up.activity_sign_up(message)
    }
    if(message_front == "JJ")bid.bid_sign_up(message)
}

