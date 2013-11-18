function Activity(activity_name){
//   this.id = localStorage.activity_id_generator
     this.name = activity_name
     this.sign_ups = []
     this.bids = []
     this.biddings = {}
}

Activity.prototype.create = function(){
    var new_activities = JSON.parse(localStorage.activities) ;
    var index = localStorage.activity_id_generator
    new_activities[index] = this
    localStorage.current_activity =  index
    localStorage.activities = JSON.stringify(new_activities)
    var ids = JSON.parse( localStorage.activity_ids )
    ids.push(index)
    localStorage.activity_ids = JSON.stringify( ids )
    localStorage.activity_id_generator = JSON.stringify(parseInt(index) + 1) ;
}

Activity.instead = function(activity){
    var activities =JSON.parse( localStorage.activities );
    var index = _.indexOf(_.pluck(_.values(activities),"name"),activity.name)
    activities[index] = activity ;
    localStorage.activities = JSON.stringify(activities)
}