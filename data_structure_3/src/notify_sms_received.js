function notify_sms_received(received_message) {
    var message = new receive_message(received_message.messages[0].message, received_message.messages[0].phone) ;
    var message_front = message.content.substring(0,2).toLocaleUpperCase() ;
    if(message_front == "BM"){
        return sign_up.activity_sign_up(message)
    }
    if(message_front == "JJ")bidding.bid_sign_up(message)
}