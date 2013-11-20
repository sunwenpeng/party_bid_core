function sign_up(name,phone) {
    this.name = name;
    this.phone = phone;
}

sign_up.activity_sign_up = function(message) {
    if(localStorage.is_signing_up == "true"){
        sign_up.sign_up_already_check(message)
    }
}

sign_up.sign_up_already_check = function(message){
    var phone_number_checked = _.some(sign_up.render_current_sign_ups(),function(ob){return ob.phone == message.phone});
    if(phone_number_checked == true)return ;
    var sign_up_new = new sign_up(message.content.substring(2).trim(),message.phone);
    var activity = Activity.render_current_activity() ;
    activity.sign_ups.push(sign_up_new) ;
    Activity.instead(activity) ;
}

sign_up.bid_sign_up_check = function(message){
    var phone_number_checked = _.some(sign_up.render_current_sign_ups(),function(ob){return ob.phone == message.phone});
    if(phone_number_checked == false)return
    bidding.bid_already_check(message)

}

sign_up.render_sign_ups = function(activity_name){
    var activity_find =Activity.render_activity(activity_name)
    return activity_find.sign_ups
}

sign_up.render_current_sign_ups = function(){
    return JSON.parse(localStorage.activities)[localStorage.current_activity_id].sign_ups
}