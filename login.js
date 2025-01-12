
const login_user = document.querySelector('#login_user');
const login_password = document.querySelector('#login_password');

const list_error = document.querySelector('ul');
const div_error = document.querySelector('.error');

const user_errors = [];
const password_errors = [];

const submit_button = document.querySelector('button');



login_user.addEventListener('input', checkUserErrors);
submit_button.addEventListener('click', login);


function checkUserErrors(){
    //Clears user errors
    user_errors.forEach((value) =>{
        user_errors.splice(user_errors.indexOf(value), 1);
    });

    //possible errors related to the login user
    if(login_user.value.includes(' ')){
        user_errors.push("Username can't contain spaces");
    }


    //sets the color red as the outline of the field
    if(user_errors.length == 0){
        login_user.classList.remove('error_field');
    }else{
        login_user.classList.add('error_field');
    }
    buildErrorList();
}


function buildErrorList(){
    list_error.innerHTML = '';
    user_errors.forEach(element => {
        list_error.innerHTML += '<li>' + element + '</li>';
    });

    password_errors.forEach(element =>{
        list_error.innerHTML += '<li>' + element + "</li>";
    });

    if(list_error.innerHTML != ''){
        div_error.classList.remove('hide');
    }else{
        div_error.classList.add('hide');
    }
}



function login(event){

    //checks user errors and adds 
    checkUserErrors();
    if(login_user.value === ''){
        user_errors.push("Username is required")
    }


    if(login_password.value.length < 8){
        password_errors.push("Password must be longer than 8 characters");
    }
    buildErrorList();

    if(password_errors.length != 0 || user_errors.length != 0){
        event.preventDefault();
    }

    
    user_errors.forEach((value) =>{
        user_errors.splice(user_errors.indexOf(value), 1);
    });
    password_errors.forEach((value) =>{
        password_errors.splice(user_errors.indexOf(value), 1);
    });
}


console.log(submit_button)

