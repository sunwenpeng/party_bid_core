function bidding(phone, price) {
    this.phone = phone;
    this.price = price;
}

function create_new_bid(id){
   if(localStorage.is_bidding == ""){
       var activity = JSON.parse(localStorage.activities)[id]  ;
       var length = activity.bids.length
       activity.bids[length] = "竞价"+String(length+1)
       activity.biddings["竞价"+String(length+1)] = []
       Activity.instead(activity)
   }
}

function transform_bids_to_view_model(id){
    return JSON.parse( localStorage.activities)[id].bids
}

function transform_biddings_to_view_model(id,bid_name){
    var biddings = JSON.parse( localStorage.activities)[id].biddings[bid_name];
    var bid_success_price = bidding.BidPriceResult(biddings) ;
    var bid_result = _.findWhere(biddings,{"price":bid_success_price})
    var bid_result_name = _.findWhere(JSON.parse( localStorage.activities)[id].sign_ups,{"phone":bid_result.phone}).name
    bid_result.name = bid_result_name ;
    return [bid_result]
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
    var bid_info = render_current_bid_info() ;
    var bid_already_check = _.some(bid_info,function(ob){return ob.phone == message.phone});
    if(bid_already_check == true)return;
    var bid_new = new bidding(message.phone,message.content.substring(2).trim()) ;
    var activity_new = render_current_activity();
    bid_info.push(bid_new) ;
    console.log(bid_info)
    activity_new.biddings[localStorage.current_bid] = bid_info ;
    Activity.instead(activity_new) ;
}
