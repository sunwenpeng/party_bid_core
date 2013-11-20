function bid (name,biddings){
    this.name = name
    this.biddings = biddings
}

bid.create_new_bid = function(activity){
    var activity_find = Activity.find_activity(activity);
    var index = Activity.find_activity(activity).bids.length;
    var new_bid = new bid("竞价"+(index+1).toString(),[]);
    activity_find.bids.push(new_bid);
    var new_activities = _.map(JSON.parse(localStorage.activities),function(ob){if(ob.name == activity_find.name){ob = activity_find;return ob;}else{return ob}}) ;
    localStorage.activities = JSON.stringify(new_activities);
};



bid.get_result_array = function (bidings){
    var success_price = bid.BidPriceResult (bidings) ;
    return [_.findWhere(bidings,{"price":success_price})]
}

bid.BidPriceClassify = function (bid_info_array) {
    var bid_price_array_new = _.chain(bid_info_array)
        .pluck("price")
        .value()
    bid_price_array_new = _.countBy(bid_price_array_new)
    bid_price_array_new = _.pairs(bid_price_array_new)
    bid_price_array_new = _.map(bid_price_array_new, function (array) {
        return _.object(["price", "number"], array)
    })
    return bid_price_array_new;
}

bid.BidPriceResult = function (bid_price_array) {
    var classified_bid_price_array = bid.BidPriceClassify(bid_price_array);
    var bid_success_price = _.chain(classified_bid_price_array)
        .where({"number": 1})
        .min(function (ob) {
            return ob.price
        })
        .value()
    return bid_success_price.price
}

bid.bid_sign_up = function(message){
    if(localStorage.is_bidding == "true")sign_up.activity_sign_up_check(message)
}

bid.bid_already_check = function(message,phone,activity,name){
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
