function bidding(phone,price){
    this.phone = phone ;
    this.price = price ;
}

bidding.BidPriceClassify = function (bid_info_array) {
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

bidding.BidPriceResult = function (bid_price_array) {
    var classified_bid_price_array = bidding.BidPriceClassify(bid_price_array);
    var bid_success_price = _.chain(classified_bid_price_array)
        .where({"number": 1})
        .min(function (ob) {
            return ob.price
        })
        .value()
    return bid_success_price.price
}

bidding.bid_sign_up = function(message){
    if(localStorage.is_bidding == "true"){
        sign_up.bid_sign_up_check(message)
    }
}

bidding.bid_already_check = function(message){
    var bid_info = bid.render_activity_bids(localStorage.current_activity,localStorage.current_bid).biddings ;
    var bid_already_check = _.some(bid_info,function(ob){return ob.phone == message.phone});
    if(bid_already_check == true)return;
    var bid_new = new bidding(message.phone,message.content.substring(2).trim()) ;
    bid_info.push(bid_new) ;
    var new_bid = bid.render_activity_bids(localStorage.current_activity,localStorage.current_bid) ;
    new_bid.biddings = bid_info ;
    var new_bids = JSON.parse(localStorage.bids) ;
    new_bids = _.map(new_bids,function(ob){if(ob.name == localStorage.current_bid && ob.activity_id == localStorage.current_activity){ob = new_bid;return ob;}else{return ob}})
    localStorage.bids = JSON.stringify(new_bids)
}

bidding.render_biddings = function(id,bid_name){
    var bids = bid.render_bids(id) ;
    var bidding_array = _.findWhere(bids,{"name":bid_name}).biddings  ;
    var bid_success_price = bidding.BidPriceResult(bidding_array) ;
    var bid_success_info = _.findWhere(bidding_array,{"price":bid_success_price}) ;
    bid_success_info.name = _.findWhere(sign_up.render_sign_ups(id),{"phone":bid_success_info.phone}).name
    return [bid_success_info];
}
