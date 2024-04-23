var data = [];
function updateUserDetailsTable() {
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
    ValidatePhoneNumber(fieldNamesWithValue) &&
    ValidateAgeGreaterThanZero(fieldNamesWithValue) &&
    ValidateEmail(fieldNamesWithValue);
  if (executionStatus == true) {
    // Storing already present content in the table in userDetialsTableContent.
    let userDetialsTableContent =
      document.getElementById("userDetailsTable").innerHTML + "<tr>";

    for (let field in fieldNamesWithValue) {
      userDetialsTableContent += `<td>${fieldNamesWithValue[field]}</td>`;
    }
    userDetialsTableContent += "</td>";

    // Updating the table content.
    document.getElementById("userDetailsTable").innerHTML =
      userDetialsTableContent;

    // Removing error messages
    RemoveErrorMessageAge();
    RemoveErrorMessageEmail();
    RemoveErrorMessagePhoneNumber();

    // Successful message.
    document.getElementById("submitSuccessful").style.display = "block";
    // To reset form input fields.
    document.getElementById("userDetailsForm").reset();
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
    document.getElementById("userDetailsTable").innerHTML;
  userDetialsTableContent = `<table id="userDetailsTable">
    <tr class="tableRow">
      <th>First Name</th>
      <th>Last Name</th>
      <th>Phone Number</th>
      <th>Email</th>
      <th>Age</th>
      <th>City</th>
      <th>State</th>
      <th>Country</th>
      <th>Gender</th>
      <th>Disability</th>
      <th>Marital-Status</th>
      <th>Aadhar Number</th>
    </tr>
    <tr>`;

  sortedUserData.forEach((userObject) => {
    for (let fieldValue in userObject) {
      userDetialsTableContent += `<td>${userObject[fieldValue]}</td>`;
    }
    userDetialsTableContent += `</tr><tr>`;
  });

  document.getElementById("userDetailsTable").innerHTML =
    userDetialsTableContent;
  RemoveSuccessfulMessage();
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
  return true;
}

function ValidatePhoneNumber(fieldNamesWithValue) {
  if (fieldNamesWithValue["phoneNumber"].toString().length != 10) {
    document.getElementById("errorPhoneNumber").style.display = "block";
    document.getElementById("errorPhoneNumber").style.color = "red";
    LoadSection1();
    return false;
  }
  return true;
}

function ValidateAgeGreaterThanZero(fieldNamesWithValue) {
  if (fieldNamesWithValue["age"] <= 0) {
    document.getElementById("errorAge").style.display = "block";
    document.getElementById("errorAge").style.color = "red";
    LoadSection2();
    return false;
  }
  return true;
}

function ValidateEmail(fieldNamesWithValue) {
  if (fieldNamesWithValue["email"].includes("@") == false) {
    document.getElementById("errorEmail").style.display = "block";
    document.getElementById("errorEmail").style.color = "red";
    LoadSection3();
    return false;
  }
  return true;
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

function RemoveSuccessfulMessage() {
  document.getElementById("submitSuccessful").style.display = "none";
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

function ClearForm(fieldNames) {
  for (let field in fieldNames) {
    document.getElementById(field).value = " ";
  }
}
