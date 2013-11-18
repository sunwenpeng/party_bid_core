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
       console.log(activity)
       Activity.instead(activity)
   }
}