$(document).ready(()=>{
    $("#design-image").click(()=>{
      $("#design-image").slideDown('1500').hide('1000');
      $("#design").show('1500');
    });
    $("#design").click(()=>{
      $("#design").slideUp('1500');
      $("#design-image").slideDown('1500');
    });
    $("#dev-image").click(()=>{
        $("#dev-image").slideDown('1500').hide('1000');
        $("#dev").show('1500');
      });
      $("#dev").click(()=>{
        $("#dev").slideUp('1500');
        $("#dev-image").slideDown('1500');
      });
      $("#product-image").click(()=>{
        $("#product-image").slideDown('1500').hide('1000');
        $("#product").show('1500');
      });
      $("#product").click(()=>{
        $("#product").slideUp('1500');
        $("#product-image").slideDown('1500');
      });
});
// https://us6.list-manage.com/contact-form?u=c3c1e899b01d29a7ea6bfdcca&form_id=06144818b6786a568aa6f44aee2d38cf
let validateForm = () => {
    let name = document.getElementById('name');
    if (name == "") {
        document.querySelector('.status').innerHTML = "Name cannot be empty";
        return false;
    }
    let email = document.getElementById('email');
    if (email == "") {
        document.querySelector('.status').innerHTML = "email cannot be empty";
        return false;
    }else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            document.querySelector('.status').innerHTML = "Email format invalid";
            return false;
        }
    }
    let subject = document.getElementById('subject');
    if (subject == "") {
        document.querySelector('.status').innerHTML = "subject cannot be empty";
        return false;
    }
}
let submitMailChimpForm =  (form) => {
    // get the submit url 
    let url = form.getAttribute('action');
    url.replace('/post?u=', '/post-json?u=');

}

// serialize the form inmto a query string
let serialize = (form) => {

}
document.addEventListener('submit', function (event) {

    // Only run on forms flagged for validation
    if (!event.target.classList.contains('validate')) return;

    // Prevent form from submitting
    event.preventDefault();

    submitMailChimpForm(event.target);
}, false);