function Activity(activity_name){
    this.id = localStorage.activity_id_generator ;
    this.name = activity_name ;

}

Activity.prototype.create = function(){
    localStorage.current_activity = localStorage.activity_id_generator ;
    localStorage.activity_id_generator = String(Number(this.id)+1) ;
    var activities = JSON.parse(localStorage.activities) ;
    activities.push(this) ;
    localStorage.activities = JSON.stringify(activities) ;
}