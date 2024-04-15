export const validateRegister = ({firstname,lastname,gender,email,phonenumber}) =>{
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]+$/;

    if (!firstname) {
        errors.firstname = 'This Field is Required'
    }
    if (!lastname) {
        errors.lastname = 'This Field is Required'
    }
    if (!gender) {
        errors.gender = 'This Field is Required'
    }
    if (!email) {
        errors.email = 'This Field is Required'
    }
    else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!phonenumber) {
        errors.phonenumber = 'This Field is Required'
    }
    else if (!numberRegex.test(phonenumber)) {
        errors.phonenumber = 'Invalid Number format';
    }
    else if(phonenumber.length !== 10){
        errors.phonenumber = 'Provide 10 numbers'
    }
    
    return errors;
}


export const validateLogin = ({username,password}) =>{
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username) {
        errors.username = 'This Field is Required'
    }
    else if (username.indexOf('@') >= 0) {
        if (!emailRegex.test(username)) {
            errors.username = 'Invalid email format';
        }
    }
    if (!password) {
        errors.password = 'Wrong Password'
    }
    
    return errors;
}


export const validateAddressForm = ({firstname,lastname,adressline1,city,state,post,country,Phonenumber,Email}) =>{
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]+$/;
    if (!firstname) {
        errors.firstname = 'This Field is Required'
    }
    else if (numberRegex.test(firstname)) {
        errors.firstname = 'Invalid Name format';
    }
    if (!lastname) {
        errors.lastname = 'This Field is Required'
    }
    else if (numberRegex.test(lastname)) {
        errors.lastname = 'Invalid Name format';
    }
    if (!adressline1) {
        errors.adressline1 = 'This Field is Required'
    }
    if (!city) {
        errors.city = 'This Field is Required'
    }
    if (!post) {
        errors.post = 'This Field is Required'
    }
    if (!country) {
        errors.country = 'This Field is Required'
    }
    if (!Phonenumber) {
        errors.Phonenumber = 'This Field is Required'
    }
    else if (!numberRegex.test(Phonenumber)) {
        errors.Phonenumber = 'Invalid Number format';
    }
    if (!Email) {
        errors.Email = 'This Field is Required'
    }
    if (!state) {
        errors.state = 'This Field is Required'
    }
    return errors;
}
