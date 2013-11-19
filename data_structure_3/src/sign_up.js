function sign_up (name,phone,activity_id){
     this.name = name;
    this.phone = phone;
    this.activity_id = activity_id;
}

sign_up.activity_sign_up = function(message) {
    if(localStorage.is_signing_up == "true"){
        sign_up.sign_up_already_check(message)
    }
}

sign_up.sign_up_already_check = function(message){
    var phone_number_checked = _.some(render_sign_ups(localStorage.current_activity),function(ob){return ob.phone == message.phone});
    if(phone_number_checked == true)return ;
    var sign_up_new = new sign_up(message.content.substring(2).trim(),message.phone,localStorage.current_activity);
    var new_sign_ups = JSON.parse(localStorage.sign_ups) ;
    new_sign_ups.push(sign_up_new) ;
    localStorage.sign_ups = JSON.stringify(new_sign_ups) ;
}

sign_up.bid_sign_up_check =function(message){
    var phone_number_checked = _.some(render_sign_ups(localStorage.current_activity),function(ob){return ob.phone == message.phone});
    if(phone_number_checked == false)return
    bidding.bid_already_check(message)
}
