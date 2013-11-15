function sign_up (name,phone){
    this.name = name
    this.phone = phone
}

function render_sign_ups(activity){
    return Activity.find_activity(activity).sign_ups
}