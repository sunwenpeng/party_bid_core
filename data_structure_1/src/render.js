function transform_biddings_to_view_model(activity_name,bid_name){
    var bids = transform_bids_to_view_model(activity_name);
    var bid_find = _.findWhere(bids,{"name":bid_name})
    return bid.get_result_array(bid_find.biddings)
}

function transform_bids_to_view_model(activity){
    var activity_find = Activity.find_activity(activity);
    return activity_find.bids
}



