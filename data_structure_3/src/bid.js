function bid(name,activity_id){
    this.name = name ;
    this.activity_id = activity_id ;
    this.biddings = [] ;

}

function create_new_bid(id){
    if(localStorage.is_bidding != "")return
    var related_activity_bids = render_bids(id)
    var new_bid = new bid("竞价"+String(related_activity_bids.length+1),id)
    var bids = JSON.parse(localStorage.bids)  ;
    bids.push(new_bid) ;
    localStorage.bids = JSON.stringify(bids) ;
}


