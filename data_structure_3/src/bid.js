function bid(name,activity_id){
    this.name = name ;
    this.activity_id = activity_id ;
    this.biddings = [] ;

}

bid.create_new_bid = function(id){
    if(localStorage.is_bidding != "")return
    var related_activity_bids = bid.render_bids(id)
    var new_bid = new bid("竞价"+String(related_activity_bids.length+1),id)
    var bids = JSON.parse(localStorage.bids)  ;
    bids.push(new_bid) ;
    localStorage.bids = JSON.stringify(bids) ;
}

bid.render_bids = function(id){
    return _.where(JSON.parse(localStorage.bids),{"activity_id":id})   ;
}

bid.render_activity_bids = function(activity_id,bid_name){
    var bids = _.findWhere(JSON.parse(localStorage.bids),{"name":bid_name,"activity_id":activity_id})
    return bids ;
}

