function render_bids(id){
    return _.where(JSON.parse(localStorage.bids),{"activity_id":id})   ;
}

function render_sign_ups(activity_id){
    return _.where(JSON.parse(localStorage.sign_ups),{"activity_id":activity_id})
}

function render_activity_bids(activity_id,bid_name){
    var bids = _.findWhere(JSON.parse(localStorage.bids),{"name":bid_name,"activity_id":activity_id})
    return bids ;
}

function render_biddings(id,bid_name){
    var bids = render_bids(id) ;
    var bidding_array = _.findWhere(bids,{"name":bid_name}).biddings  ;
    var bid_success_price = bidding.BidPriceResult(bidding_array) ;
    var bid_success_info = _.findWhere(bidding_array,{"price":bid_success_price}) ;
    bid_success_info.name = _.findWhere(render_sign_ups(id),{"phone":bid_success_info.phone}).name
    return [bid_success_info];
}

function render_activity_sign_up_name(phone,activity_id){
    return _.findWhere(JSON.parse(localStorage.sign_ups),{"phone":phone,"activity_id":activity_id}).name
}