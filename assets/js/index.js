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


// serialize the form inmto a query string
let serialize = (form) => {
    // setup our serialized data 
    let serialized = '';
        // Loop through each field in the form
    for (i = 0; i < form.elements.length; i++) {

        let field = form.elements[i];

        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

        // Convert field data to a query string
        if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized += '&' + encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
        }
    }
    
        return serialized;

}; 

// dislay the contact form status
let displayMailChimpStatus = (data) => {
    
   // Get the status message content area
   var mcStatus = document.querySelector('.mc-status');
   if (!mcStatus) return;

   // Update our status message
   mcStatus.innerHTML = data.msg;

   // If error, add error class
   if (data.result === 'error') {
       mcStatus.classList.remove('success-message');
       mcStatus.classList.add('error-message');
       return;
   }

   // Otherwise, add success class
   mcStatus.classList.remove('error-message');
   mcStatus.classList.add('success-message');
};

let submitMailChimpForm =  (form) => {
    // get the submit url 
    let url = form.getAttribute('action');
    url.replace('/post?u=', '/post-json?u=');
    url += serialize(form) + '&c=displayMailChimpStatus'

    // create script with url and callback (if specified)
    let script = window.document.createElement('script');
    script.src = url;

    // inserrt script tag into the DOM (append to <head>)
    let ref = window.document.getElementsByTagName('script')[0];
    ref.parentNode.insertBefore(script, ref);
    


};
document.addEventListener('submit', function (event) {
    successModal = document.getElementById('heading');
    userName = document.getElementById('mce-name').value;
    userEmail = document.getElementById('mce-email').value;

    // Only run on forms flagged for validation
    if (!event.target.classList.contains('validate')) return;

    // Prevent form from submitting
    event.preventDefault();

    submitMailChimpForm(event.target);
    if (userName=="" || userEmail == "") {
        alert("kindly fill in the required fields")
    } else {
        $('#modalAlertUser').modal('show')
        successModal.innerHTML = "Hi " + userName + " Thank you for your message " + " We will reply to your email " + userEmail + " soon! "
        
    }
    
}, false);

