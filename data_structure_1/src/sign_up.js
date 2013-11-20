function sign_up (name,phone){
    this.name = name
    this.phone = phone
}

sign_up.render_sign_ups = function(activity){
    return Activity.find_activity(activity).sign_ups
}

sign_up.activity_sign_up = function(message){
    if(localStorage.is_signing_up == "true"){
        return sign_up.sign_up_check(message) ;
    }
}

sign_up.sign_up_check = function(message){
    var phone = message["messages"][0]["phone"]
    var activity_find = Activity.find_activity(localStorage.current_activity)
    var phone_number_checked = _.some(activity_find.sign_ups,function(ob){return ob.phone == phone});
    if(phone_number_checked == false){
        var sign_up_info = new sign_up((message["messages"][0]["message"]).substring(2),phone);
        activity_find.sign_ups.push(sign_up_info)
        var new_activities = _.map(JSON.parse(localStorage.activities),function(ob){if(ob.name == activity_find.name){ob = activity_find;return ob;}else{return ob}}) ;
        localStorage.activities = JSON.stringify(new_activities);
    }
}

sign_up.activity_sign_up_check = function(message){
    var phone = message["messages"][0]["phone"]
    var activity_find = Activity.find_activity(localStorage.current_activity)
    var phone_number_checked = _.some(activity_find.sign_ups,function(ob){return ob.phone == phone});
    if(phone_number_checked == true){
        var name = (_.findWhere(activity_find.sign_ups,{"phone":phone})).name
        return bid.bid_already_check(message,phone,activity_find,name)
    }
}