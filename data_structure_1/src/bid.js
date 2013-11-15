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