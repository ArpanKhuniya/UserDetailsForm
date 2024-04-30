function viewModel() {
  var self = this;
  var numberRegex = /^\d+$/;
  var charRegex = /^[a-zA-Z]+$/;
  var data = [];
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
    self.userRecord("");
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

  // Validations.
  
  self.ValidateFirstName = ko.computed(function () {
    return !charRegex.test(self.firstName());
  })

  self.ValidateLastName = ko.computed(function () {
    return !charRegex.test(self.lastName());
  })

  self.ValidatePhoneNumber = ko.computed(function () {
    if (self.phoneNumber()) {
      return !numberRegex.test(self.phoneNumber()) || self.phoneNumber().length != 10;
    }
  })

  self.ValidateEmail = ko.computed(function () {
    if (self.email()) {
      return !self.email().includes('@') && !self.email().includes('.');
    }
  })

  self.ValidateAge = ko.computed(function () {
    if (self.age()) {
      return self.age() < 0 || self.age() > 150;
    }
  })

  self.ValidateAddress = ko.computed(function () {
    if (self.address()) {
      return (self.address().length == 0);
    }
  })

  self.ValidateCity = ko.computed(function () {
    return !charRegex.test(self.city());
  })

  self.ValidateState = ko.computed(function () {
    return !charRegex.test(self.state());
  })

  self.ValidateCountry = ko.computed(function () {
    return !charRegex.test(self.country());
  })

  self.ValidateNullFields = ko.computed(function () {
    return self.firstName() && self.lastName() && self.phoneNumber() && self.email() && self.age() && self.state() && self.address() && self.city() && self.country();
  })

  // After submitting the form 
  self.UserDB=ko.observableArray();
  self.userRecord = ko.observable();
  self.OnSubmit = function () {
    self.userRecord({
      firstName: self.firstName(),
      lastName: self.lastName(), 
      phoneNumber: self.phoneNumber(), 
      email: self.email(), 
      age: self.age(),
      disability:self.disability(), 
      maritalStatus:self.maritalStatus(),
      gender:self.gender(),
      address: self.address(),
      city:self.city(),
      state: self.state(),
      country: self.country()
    });
    self.UserDB.push(self.userRecord());
    // data.push(self.userRecord);
    document.getElementById("userDetailsForm").reset();
    self.DisplaySuccessfulMessage();
  }
}
ko.applyBindings(new viewModel());

