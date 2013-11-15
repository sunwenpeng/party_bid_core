function bidding(name,phone,price){
    this.name = name
    this.phone = phone
    this.price = price
}

function transform_biddings_to_view_model(activity_name,bid_name){
    var bids = transform_bids_to_view_model(activity_name);
    var bid_find = _.findWhere(bids,{"name":bid_name})
    return bid.get_result_array(bid_find.biddings)
}