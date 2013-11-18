function render_sign_ups(activity_name){
    var activity_find =render_activity(activity_name)
    return activity_find.sign_ups
}

function render_activity(activity_name){
    return  _.findWhere(JSON.parse( localStorage.activities),{"name":activity_name})
}