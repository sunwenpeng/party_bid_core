function Activity(name){
    this.name=name
    this.sign_ups= []
    this.bids= []
}

Activity.prototype.create = function (){
    var activity_array = JSON.parse(localStorage.activities) ;
    activity_array.push(this);
    localStorage.activities =JSON.stringify(activity_array) ;
}

Activity.prototype.active = function(){
    localStorage.current_activity = this.name
}

Activity.find_activity = function(activity){
    return _.findWhere(JSON.parse(localStorage.activities),{"name":activity})
}

