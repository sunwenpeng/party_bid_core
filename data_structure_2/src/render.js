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










