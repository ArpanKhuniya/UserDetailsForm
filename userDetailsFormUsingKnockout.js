function viewModel() {
  var self = this;
  var numberRegex = /^\d+$/;
  var charRegex = /^[a-zA-Z]+$/;
  self.sectionHeaderForPersonalDetails = ko.observable("Personal Details");
  self.sectionHeaderForAddressDetails = ko.observable("Address Details");

  // Successful Message.
  self.successfulMessage = ko.observable(false);

  self.DisplaySuccessfulMessage = function () {
    self.successfulMessage(true);
    self.RemoveAllSections();
  }

  self.HideSuccessfulMessage = function () {
    self.successfulMessage(false);
    self.LoadSection1();
    // self.userRecord("");
  }

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
  }

  self.LoadSection3 = function () {
    self.section1(false);
    self.section2(false);
    self.section3(true);
  }

  self.LoadSection1 = function () {
    self.section1(true);
    self.section2(false);
    self.section3(false);
  }

  self.RemoveAllSections = function () {
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "none";
    document.getElementById("section3").style.display = "none";
  };

  // Validations of fields.

  self.ValidateFirstName = ko.computed(function () {
    if (self.firstName()) { return !charRegex.test(self.firstName()); }
  })

  self.ValidateLastName = ko.computed(function () {
    if (self.lastName()) { return !charRegex.test(self.lastName()); }
  })

  self.ValidatePhoneNumber = ko.computed(function () {
    if (self.phoneNumber()) {
      return !numberRegex.test(self.phoneNumber()) || self.phoneNumber().length != 10;
    }
  })

  self.ValidateEmail = ko.computed(function () {
    if (self.email()) {
      return !self.email().includes('@') || !self.email().includes('.');
    }
  })

  self.ValidateAge = ko.computed(function () {
    if (self.age()) {
      return self.age() < 0 || self.age() > 150;
    }
  })

  self.ValidateCity = ko.computed(function () {
    if (self.city()) { return !charRegex.test(self.city()); }
  })

  self.ValidateState = ko.computed(function () {
    if (self.state()) { return !charRegex.test(self.state()); }
  })

  self.ValidateCountry = ko.computed(function () {
    if (self.country()) { return !charRegex.test(self.country()); }
  })

  self.ValidateNullFields = ko.computed(function () {
    return self.firstName() && self.lastName() && self.phoneNumber() && self.email() && self.age() && self.state() && self.address() && self.city() && self.country();
  })

  // Enable next buttons.
  self.EnableNextButtonOfSection1 = ko.computed(function () {
    return self.firstName() && self.lastName() && self.phoneNumber() && self.email();
  })

  self.EnableNextButtonOfSection2 = ko.computed(function () {
    return self.age();
  })

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
      country: self.country()
    });
    document.getElementById("userDetailsForm").reset();
    self.DisplaySuccessfulMessage();
  }

  // Sorting

  self.sortInAscendingOrder = ko.observable(true);
  self.sortTable = function (fieldName) {
    if (self.sortInAscendingOrder) {
      self.userDB.sort(function (a, b) {
        if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) {
          return -1;
        }
        if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) {
          return 1;
        }
        return 0;
      })
      self.sortInAscendingOrder(false);
    }else{
      self.userDB.sort(function (a, b) {
        if (a[fieldName] < b[fieldName]) {
          return -1;
        }
        if (a[fieldName] > b[fieldName]) {
          return 1;
        }
        return 0;
      })
      self.userDB.reverse();
    };
  }


}
ko.applyBindings(new viewModel());

