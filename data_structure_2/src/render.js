function render_sign_ups(activity){
    var activity_find = _.findWhere(JSON.parse( localStorage.activities),{"name":activity})
    return activity_find.sign_ups
}