

function updateUserDetailsTable() {

  // Html form field names.
  let fieldNames=["firstName","lastName","phoneNumber","email","age","city","state","country","gender","disability","marital-status","aadharNumber"];

  // Creating an object of all fields with their values.
  let fieldNamesWithValue={};
  fieldNames.forEach(field => {
    fieldNamesWithValue[field]=document.getElementById(field).value.trim();
  });
  
  //Validations
  let executionStatus = ValidateNullInputs(fieldNamesWithValue) && ValidatePhoneNumber(fieldNamesWithValue) && ValidateAgeGreaterThanZero(fieldNamesWithValue)
  && ValidateEmail(fieldNamesWithValue);
  if(executionStatus!=true){
    return alert(executionStatus);
  }
  
  // To reset form input fields.
  document.getElementById('userDetailsForm').reset();

  // Storing already present content in the table in userDetialsTableContent.
  let userDetialsTableContent =
    document.getElementById("userDetailsTable").innerHTML + "<tr>";

  for (let field in fieldNamesWithValue){
    userDetialsTableContent+=`<td>${fieldNamesWithValue[field]}</td>`  
  }
  userDetialsTableContent+="</td>";

  // Updating the table content.
  document.getElementById("userDetailsTable").innerHTML = userDetialsTableContent;
}

// Validations

// Validation Messages

let nullTextInput = "Please enter a value at ";
let phoneNumberIsNotEqualToStandardSize = "Phone number should be of 10 digits";
let ageLessThanZero = "Age cannot be less than zero";
let emailError="Email should contain @";


function ValidateNullInputs(fieldNamesWithValueObject){
  for (let field in fieldNamesWithValueObject){
    if(fieldNamesWithValueObject[field].length === 0){
        return (nullTextInput+field);
    }
  }
  return true;
}

function ValidatePhoneNumber(fieldNamesWithValue){
  if(fieldNamesWithValue["phoneNumber"].toString().length != 10){
    return phoneNumberIsNotEqualToStandardSize;
  }
  return true;
}

function ValidateAgeGreaterThanZero(fieldNamesWithValue){
  if(fieldNamesWithValue["age"]<=0){
    return ageLessThanZero;
  }
  return true;
}

function ValidateEmail(fieldNamesWithValue){
  if(fieldNamesWithValue["email"].includes("@") == false){
    return emailError;
  }
  return true;
}
