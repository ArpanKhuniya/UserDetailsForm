function viewModel() {
  var self = this;
  var numberRegex = /^\d+$/;
  var charRegex = /^[a-zA-Z]+$/;
  self.sectionHeaderForPersonalDetails = ko.observable("Personal Details");
  self.sectionHeaderForAddressDetails = ko.observable("Address Details");

  self.whenSubmit = ko.observable(true);
  self.whenUpdate = ko.observable(false);

  // Successful Message.
  self.successfulMessage = ko.observable(false);

  self.DisplaySuccessfulMessage = function () {
    self.successfulMessage(true);
    self.RemoveAllSections();
  };

  self.HideSuccessfulMessage = function () {
    self.successfulMessage(false);
    self.LoadSection1();
  };

  self.HideAllSections = ko.observable(false);

  // Form
  self.firstName = ko.observable();
  self.lastName = ko.observable();
  self.phoneNumber = ko.observable();
  self.email = ko.observable();
  self.age = ko.observable();
  self.disability = ko.observable();
  self.maritalStatus = ko.observable();
  self.gender = ko.observable("Male");
  self.address = ko.observable();
  self.city = ko.observable();
  self.country = ko.observable();
  self.state = ko.observable();

  self.disabilityOptions = ko.observableArray(["Yes", "No"]);
  self.maritalStatusOptions = ko.observableArray([
    "Single",
    "Married",
    "Do not mention",
  ]);

  self.section1 = ko.observable(true);
  self.section2 = ko.observable(false);
  self.section3 = ko.observable(false);

  self.LoadSection2 = function () {
    self.section1(false);
    self.section2(true);
    self.section3(false);
  };

  self.LoadSection3 = function () {
    self.section1(false);
    self.section2(false);
    self.section3(true);
  };

  self.LoadSection1 = function () {
    self.section1(true);
    self.section2(false);
    self.section3(false);
  };

  self.RemoveAllSections = function () {
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "none";
    document.getElementById("section3").style.display = "none";
  };

  // Validations of fields.

  self.ValidateFirstName = ko.computed(function () {
    if (self.firstName()) {
      return !charRegex.test(self.firstName());
    }
  });

  self.ValidateLastName = ko.computed(function () {
    if (self.lastName()) {
      return !charRegex.test(self.lastName());
    }
  });

  self.ValidatePhoneNumber = ko.computed(function () {
    if (self.phoneNumber()) {
      return (
        !numberRegex.test(self.phoneNumber()) || self.phoneNumber().length != 10
      );
    }
  });

  self.ValidateEmail = ko.computed(function () {
    if (self.email()) {
      return !self.email().includes("@") || !self.email().includes(".");
    }
  });

  self.ValidateAge = ko.computed(function () {
    if (self.age()) {
      return self.age() < 0 || self.age() > 150;
    }
  });

  self.ValidateCity = ko.computed(function () {
    if (self.city()) {
      return !charRegex.test(self.city());
    }
  });

  self.ValidateState = ko.computed(function () {
    if (self.state()) {
      return !charRegex.test(self.state());
    }
  });

  self.ValidateCountry = ko.computed(function () {
    if (self.country()) {
      return !charRegex.test(self.country());
    }
  });

  self.CheckValidtiyOfAllFields = ko.computed(function () {
    if(self.whenUpdate()){return true};
    return (
      !self.ValidateState() && self.state() &&
      self.address() && 
      !self.ValidateCity() && self.city() &&
      !self.ValidateCountry() && self.country()
    );
  });

  // Enable next buttons.
  self.EnableNextButtonOfSection1 = ko.computed(function () {
    if(self.whenUpdate()){return true}
    return !self.ValidateFirstName() && !self.ValidateLastName() && !self.ValidatePhoneNumber() && !self.ValidateEmail() 
    && self.firstName() && self.lastName() && self.phoneNumber() && self.email();

  });

  self.EnableNextButtonOfSection2 = ko.computed(function () {
    if(self.whenUpdate()){return true}
    return !self.ValidateAge() && self.age();
  });

  // To clear all fields after form is submitted.
  self.ClearAllFields = function(){
    self.firstName("");
    self.lastName("");
    self.phoneNumber("");
    self.email("");
    self.age("");
    self.disability("");
    self.maritalStatus("");
    self.address("");
    self.city("");
    self.country("");
    self.state("");
  }


  // After submitting the form
  self.userDB = ko.observableArray([]);
  self.OnSubmit = function () {
    self.userDB.push({
      firstName: self.firstName(),
      lastName: self.lastName(),
      phoneNumber: self.phoneNumber(),
      email: self.email(),
      age: self.age(),
      disability: self.disability(),
      maritalStatus: self.maritalStatus(),
      gender: self.gender(),
      address: self.address(),
      city: self.city(),
      state: self.state(),
      country: self.country(),
    });
    document.getElementById("userDetailsForm").reset();
    self.DisplaySuccessfulMessage();
    self.ClearAllFields();
  };

  // Remove user

  self.indexOfUserRecordToDelete=ko.observable(-1);

  self.confirmDeletion=ko.observable(false);

  self.getIndexOfUserRecordToDelete=function(user){
    self.indexOfUserRecordToDelete(self.userDB.indexOf(user));
    self.confirmDeletion(true);
  }

  self.RemoveUser = function () {
    self.userDB.splice(self.indexOfUserRecordToDelete(),1);
    self.LoadSection1();
    self.confirmDeletion(false);
  };

  self.hideConfirmDiv=function(){
    self.confirmDeletion(false);
  };

  // Update user Details

  self.updatedMessage = ko.observable(false);

  self.showUpdatedMessage = function () {
    self.updatedMessage(true);
    self.RemoveAllSections();
  }

  self.HideUpdatedMessage = function () {
    self.updatedMessage(false);
    self.LoadSection1();
  }

  self.indexOfElementToUpdate = ko.observable(-1);

 

  self.PopulateFormWithValues = function (user) {
    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("phoneNumber").value = user.phoneNumber;
    document.getElementById("email").value = user.email;
    document.getElementById("age").value = user.age;
    document.getElementById("disability").value = user.disability;
    document.getElementById("marital-status").value = user.maritalStatus;
    document.getElementById("gender").value = user.gender;
    document.getElementById("address").value = user.address;
    document.getElementById("city").value = user.city;
    document.getElementById("state").value = user.state;
    document.getElementById("country").value = user.country;
  };

  self.UpdateUserDetails = function (user) {
    self.PopulateFormWithValues(user);
    self.whenUpdate(true);
    self.whenSubmit(false);
    self.indexOfElementToUpdate(self.userDB.indexOf(user));
    self.HideUpdatedMessage();
    self.HideSuccessfulMessage();
    self.LoadSection1();
  };

  self.UpdateUserDetailsFormButton = function () {
    self.userDB.splice(self.indexOfElementToUpdate(), 1, {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value,
      disability: document.getElementById("disability").value,
      maritalStatus: document.getElementById("marital-status").value,
      gender: document.getElementById("gender").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      country: document.getElementById("country").value
    });
    document.getElementById("userDetailsForm").reset();
    self.showUpdatedMessage();
    self.whenUpdate(false);
    self.whenSubmit(true);
  };



  // Sorting
  self.sortInAscendingOrder = ko.observable(true);

  self.sortTable = function (fieldName) {
    if (self.sortInAscendingOrder) {
      self.sortInAscendingOrder(false);
      self.userDB.sort(function (a, b) {
        if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) {
          return -1;
        }
        if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      self.userDB.sort(function (a, b) {
        if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) {
          return -1;
        }
        if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) {
          return 1;
        }
        return 0;
      });
      self.userDB.reverse();
      self.sortInAscendingOrder(true);
    }
  };
}
ko.applyBindings(new viewModel());

