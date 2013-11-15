function notify_sms_received(message){
    var message_front = (message.messages[0].message).substring(0,2).toLocaleUpperCase();
    if(message_front == "BM"){
        return activity_sign_up(message)
    }
    message_check(message)
}

