function message_check(message){
    var message_front = (message.messages[0].message).substring(0,2).toLocaleUpperCase();
    if(message_front == "JJ")bid_sign_up(message)
}

function activity_sign_up(message){
    if(localStorage.is_signing_up == "true"){
        return sign_up_check(message) ;
    }
}

function bid_sign_up(message){
    if(localStorage.is_bidding == "true")activity_sign_up_check(message)
}

function sign_up_check(message){
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

function activity_sign_up_check(message){
    var phone = message["messages"][0]["phone"]
    var activity_find = Activity.find_activity(localStorage.current_activity)
    var phone_number_checked = _.some(activity_find.sign_ups,function(ob){return ob.phone == phone});
    if(phone_number_checked == true){
        var name = (_.findWhere(activity_find.sign_ups,{"phone":phone})).name
        return bid_already_check(message,phone,activity_find,name)
    }
}

function bid_already_check(message,phone,activity,name){
    var bid_info = _.findWhere(activity.bids,{"name":localStorage.current_bid})
    var bid_already_check = _.some(bid_info.biddings,function(ob){return ob.phone == phone});
    if(bid_already_check == false){
        var bidding_new = new bidding(name,message["messages"][0]["phone"],(message["messages"][0]["message"]).substring(2))
        bid_info.biddings.push(bidding_new);
        var new_activity_bids = _.map(activity.bids,function(ob){if(ob.name == localStorage.current_bid){ob = bid_info;return ob;}else{return ob}}) ;
        activity.bids = new_activity_bids ;
        var new_activities = _.map(JSON.parse(localStorage.activities),function(ob){if(ob.name == activity.name){ob = activity;return ob;}else{return ob}}) ;
        localStorage.activities = JSON.stringify(new_activities);
    }
}