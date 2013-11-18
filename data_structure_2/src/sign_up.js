function sign_up(name,phone) {
    this.name = name;
    this.phone = phone;
}

sign_up.activity_sign_up = function(message) {
    if(localStorage.is_signing_up == "true"){
        sign_up.sign_up_aleady_check(message)
    }
}

sign_up.sign_up_aleady_check = function(message){
    var phone_number_checked = _.some(render_current_sign_ups(),function(ob){return ob.phone == message.phone});
    if(phone_number_checked == true)return ;
    var sign_up_new = new sign_up(message.content.substring(2).trim(),message.phone);
    var activity = render_current_activity() ;
    activity.sign_ups.push(sign_up_new) ;
    Activity.instead(activity) ;
}