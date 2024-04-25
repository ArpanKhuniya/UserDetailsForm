var data = [];
var count = 0;
var allFieldsAllNotNull = false;

// Html form field names.
let fieldNames = [
  "firstName",
  "lastName",
  "phoneNumber",
  "email",
  "age",
  "city",
  "state",
  "country",
  "gender",
  "disability",
  "marital-status",
  "address",
];

function updateUserDetailsTable() {
  
  // Creating an object of all fields with their values.
  let fieldNamesWithValue = {};
  fieldNames.forEach((field) => {
    if (document.getElementById(field).value.trim() != "") {
      let valueToAddToData = document
        .getElementById(field)
        .value.trim()
        .toLowerCase();
      fieldNamesWithValue[field] =
        valueToAddToData[0].toUpperCase() +
        valueToAddToData.substr(1, valueToAddToData.length - 1);
    } else {
      fieldNamesWithValue[field] = document.getElementById(field).value.trim();
    }
  });
  data.push(fieldNamesWithValue);

  //Validations
  let executionStatus =
    ValidateNullInputs(fieldNamesWithValue) &&
    ValidatePhoneNumber() &&
    ValidateAgeGreaterThanZero() &&
    ValidateEmail();
  if (executionStatus == true) {
    // Storing already present content in the table in userDetialsTableContent.
    let userDetialsTableContent =
      document.getElementById("userListGrid").innerHTML;

    for (let field in fieldNamesWithValue) {
      userDetialsTableContent += `<div class="userListDivData"><h5 class="userListData">${fieldNamesWithValue[field]}</h5></div>`;
    }

    // Updating the table content.
    document.getElementById("userListGrid").innerHTML = userDetialsTableContent;
    
    // Successful message.
    document.getElementById("submitSuccessful").style.display = "block";
    

    // To reset form input fields.
    document.getElementById("userDetailsForm").reset();
    RemoveAllSections();
    
    return;
  } else {
    RemoveErrorMessageAge();
    RemoveErrorMessageEmail();
    RemoveErrorMessagePhoneNumber();
    data.pop();
    return;
  }
}

// Sorting Functionality on first name
function SortListOfUsers(fieldName) {
  let sortedUserData = data.sort(function (a, b) {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
    return 0;
  });

  let userDetialsTableContent =
    document.getElementById("userListGrid").innerHTML;
  userDetialsTableContent = `<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('firstName')">First Name</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('lastName')">Last Name</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('phoneNumber')">Phone Number</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('email')">Email</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('age')">Age</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('city')">City</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('state')">State</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('country')">Country</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('gender')">Gender</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('disability')">Disability</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('marital-status')">Marital-Status</a>
</div>
<div class="userListDiv">
  <a class="userListHead" onclick="SortListOfUsers('address')">Address</a>
</div>`;

  sortedUserData.forEach((userObject) => {
    for (let fieldValue in userObject) {
      userDetialsTableContent += `<div class="userListDivData"><h5 class="userListData">${userObject[fieldValue]}</h5></div>`;
    }
  });

  document.getElementById("userListGrid").innerHTML = userDetialsTableContent;
  LoadSection1();
}

// Validations

// Validation Messages

function ValidateNullInputs(fieldNamesWithValueObject) {
  let count = 0;
  for (let field in fieldNamesWithValueObject) {
    if (fieldNamesWithValueObject[field].length === 0) {
      count += 1;
      let errorName = `error${field}`;
      document.getElementById(errorName).style.display = "block";
      document.getElementById(errorName).style.color = "red";
    }
  }
  if (count > 0) {
    return false;
  }
  document.getElementById("button-next2").disabled = false;
  return true;
}

function ValidateInputForField(field) {
  let charRegex = /^[a-zA-Z]+$/;
  if (field === "firstName" || field === "lastName") {
    let nameVal = document.getElementById(field).value;
    if (charRegex.test(nameVal) == false) {
      document.getElementById(`error${field}`).innerHTML =
        "Name should contain only alphabets.";
      document.getElementById(`error${field}`).style.display = "block";
      document.getElementById(`error${field}`).style.color = "red";
      LoadSection1();
      return false;
    }
  }
  if (field === "city" || field === "state" || field === "country") {
    if (charRegex.test(document.getElementById(field).value) == false) {
      document.getElementById(
        `error${field}`
      ).innerHTML = `${field} should contain only alphabets.`;
      document.getElementById(`error${field}`).style.display = "block";
      document.getElementById(`error${field}`).style.color = "red";
      LoadSection3();
      return false;
    }
  }
}

function ValidatePhoneNumber() {
  if (document.getElementById("phoneNumber").value.toString().length === 10) {
    RemoveErrorMessagePhoneNumber();
    return true;
  } else {
    document.getElementById("errorPhoneNumber").style.display = "block";
    document.getElementById("errorPhoneNumber").style.color = "red";
    LoadSection1();
  }
}

function ValidateAgeGreaterThanZero() {
  if (
    document.getElementById("age").value <= 0 ||
    document.getElementById("age").value > 150
  ) {
    document.getElementById("errorAge").style.display = "block";
    document.getElementById("errorAge").style.color = "red";
    LoadSection2();
  } else {
    RemoveErrorMessageAge();
    return true;
  }
}

function ValidateEmail() {
  if (
    document.getElementById("email").value.includes("@") == false ||
    document.getElementById("email").value.includes(".") == false
  ) {
    document.getElementById("errorEmail").style.display = "block";
    document.getElementById("errorEmail").style.color = "red";
    LoadSection1();
  } else {
    RemoveErrorMessageEmail();
    return true;
  }
}

function CheckAllFieldAndReturnTrue(){
  let result = ValidateEmail() && ValidateAgeGreaterThanZero() && ValidatePhoneNumber();

  for (let field in fieldNames){
    result = result && ValidateInputForField(field);
  }

  if (result==true){
    document.getElementById("submit").disabled=false;
  }
}

// Removing error messages

function RemoveAllErrorMessages(fieldNamesWithValue) {
  for (let field in fieldNamesWithValue) {
    if (field !== "disability" && field !== "marital-status") {
      let lengthOfWord = document.getElementById(field).value;
      if (lengthOfWord.length > 0) {
        let errorName = `error${field}`;
        document.getElementById(errorName).style.display = "none";
      }
    }
  }
}

function RemoveErrorMessagePhoneNumber() {
  let phValue = document.getElementById("phoneNumber").value;
  if (phValue.toString().length == 10) {
    document.getElementById("errorPhoneNumber").style.display = "none";
  }
}

function RemoveErrorMessageAge() {
  let ageValue = document.getElementById("age").value;
  if (ageValue > 0) {
    document.getElementById("errorAge").style.display = "none";
  }
}

function RemoveErrorMessageEmail() {
  let emailValue = document.getElementById("email").value;
  if (emailValue.includes("@") == true) {
    document.getElementById("errorEmail").style.display = "none";
  }
}

function RemoveErrorMessageOnTyping(fieldname) {
  document.getElementById(fieldname).style.display = "none";
}


function LoadSection1() {
  document.getElementById("section1").style.display = "block";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section3").style.display = "none";
}

function LoadSection2() {
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "block";
  document.getElementById("section3").style.display = "none";
}

function LoadSection3() {
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section3").style.display = "block";
}

function RemoveAllSections(){
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section3").style.display = "none";
  document.getElementById("section4").style.display = "block";
}

function RemoveOkButton(){
  document.getElementById("submitSuccessful").style.display='none';
}