function bid (name,biddings){
    this.name = name
    this.biddings = biddings
}

function create_new_bid(activity){
    var activity_find = Activity.find_activity(activity);
    var index = Activity.find_activity(activity).bids.length;
    var new_bid = new bid("竞价"+(index+1).toString(),[]);
    activity_find.bids.push(new_bid);
    var new_activities = _.map(JSON.parse(localStorage.activities),function(ob){if(ob.name == activity_find.name){ob = activity_find;return ob;}else{return ob}}) ;
    localStorage.activities = JSON.stringify(new_activities);
};

function transform_bids_to_view_model(activity){
    var activity_find = Activity.find_activity(activity);
    return activity_find.bids
}

bid.get_result_array = function (bidings){
    var success_price = bid.BidPriceResult (bidings) ;
    console.log(success_price)
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
