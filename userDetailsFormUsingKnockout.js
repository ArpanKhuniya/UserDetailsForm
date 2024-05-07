function viewModel() {
  var self = this;
  var numberRegex = /^\d+$/;
  var charRegex = /^[a-zA-Z]+$/;


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
    if (self.whenUpdate()) { return true };
    return (
      !self.ValidateState() && self.state() &&
      self.address() &&
      !self.ValidateCity() && self.city() &&
      !self.ValidateCountry() && self.country()
    );
  });

  // Enable next buttons.
  self.EnableNextButtonOfSection1 = ko.computed(function () {
    if (self.whenUpdate()) { return true }
    return !self.ValidateFirstName() && !self.ValidateLastName() && !self.ValidatePhoneNumber() && !self.ValidateEmail()
      && self.firstName() && self.lastName() && self.phoneNumber() && self.email();

  });

  self.EnableNextButtonOfSection2 = ko.computed(function () {
    if (self.whenUpdate()) { return true }
    return !self.ValidateAge() && self.age();
  });

  // To clear all fields after form is submitted.
  self.ClearAllFields = function () {
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

  self.indexOfUserRecordToDelete = ko.observable(-1);

  self.confirmDeletion = ko.observable(false);

  self.getIndexOfUserRecordToDelete = function (user) {
    self.indexOfUserRecordToDelete(self.userDB.indexOf(user));
    self.confirmDeletion(true);
  }

  self.RemoveUser = function () {
    self.userDB.splice(self.indexOfUserRecordToDelete(), 1);
    self.LoadSection1();
    self.confirmDeletion(false);
  };

  self.hideConfirmDiv = function () {
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

  //Languages Translation

  self.getLanguageCode = function (languageName) {
    if (languageName == "English") {
      self.ChangeTextAsPerLanguage(0);
    }
    if (languageName == "French") {
      self.ChangeTextAsPerLanguage(1);
    }
    if (languageName == "Marathi") {
      self.ChangeTextAsPerLanguage(2);
    }
    if(languageName=="German"){
      self.ChangeTextAsPerLanguage(3);
    }
    if(languageName=="Kannada"){
      self.ChangeTextAsPerLanguage(4);
    }

  }

  // Headers
  self.sectionHeaderForPersonalDetails = ko.observable("Personal Details");
  self.sectionHeaderForAddressDetails = ko.observable("Address Details");
  self.sectionHeaderListOfUsers = ko.observable("List Of Users");

  // Fields
  self.langFirstName = ko.observable("First Name");
  self.langLastName = ko.observable("Last Name");
  self.langPhoneNumber = ko.observable("Phone Number");
  self.langEmail = ko.observable("Email");
  self.langAge = ko.observable("Age");
  self.langDisability = ko.observable("Disability");
  self.langMaritalStatus = ko.observable("Marital-Status");
  self.langGender = ko.observable("Gender");
  self.langAddress = ko.observable("Address");
  self.langCity = ko.observable("City");
  self.langState = ko.observable("State");
  self.langCountry = ko.observable("Country");

  // Errors
  self.firstNameError = ko.observable("First Name should have only alphabets.");
  self.lastNameError = ko.observable("Last Name should have only alphabets.");
  self.phoneNumberError = ko.observable("Please enter 10 digit phone number.");
  self.emailError = ko.observable("Email should have @ and .");
  self.ageError = ko.observable("Age should be greater than 0 and less than 150");
  self.cityError = ko.observable("City Name should have only alphabets.");
  self.stateError = ko.observable("State Name should have only alphabets.");
  self.countryError = ko.observable("Country Name should have only alphabets.");
  self.allError = ko.observable("Please fill all fields.");

  // Button and other text.
  self.nextMsg = ko.observable("Next");
  self.previousMsg = ko.observable("Previous");
  self.submitMsg = ko.observable("Your details have been recorded.");
  self.updateMsg = ko.observable("Your details have been updated.");
  self.viewMsg = ko.observable("View users list");
  self.male = ko.observable("Male");
  self.female = ko.observable("Female");
  self.submitBtn = ko.observable("Submit");
  self.updateBtn = ko.observable("Update");
  self.deleteConfirmationMsg = ko.observable("Do you want to delete the details?");
  self.yes = ko.observable("Yes");
  self.no = ko.observable("No");
  self.CRUDOperations = ko.observable("CRUD Operations");
  self.ok = ko.observable("Ok")

  // Theme
  self.theme = ko.observable("Themes");
  self.light = ko.observable("Light");
  self.dark = ko.observable("Dark");
  self.nature = ko.observable("Nature");
  self.colorful = ko.observable("Colorful");
  self.vintage = ko.observable("Vintage");

  // Languages
  self.language = ko.observable("Languages")
  self.english = ko.observable("English");
  self.french = ko.observable("French");
  self.marathi = ko.observable("Marathi");
  self.german=ko.observable("German");
  self.kannada=ko.observable("Kannada");

  self.ChangeTextAsPerLanguage = function (selectedOption) {
    self.langFirstName(self.languages[selectedOption].l_firstName);
    self.langLastName(self.languages[selectedOption].l_lastName);
    self.langPhoneNumber(self.languages[selectedOption].l_phoneNumber);
    self.langEmail(self.languages[selectedOption].l_email);
    self.langAge(self.languages[selectedOption].l_age);
    self.langLastName(self.languages[selectedOption].l_lastName);
    self.langDisability(self.languages[selectedOption].l_disability);
    self.langMaritalStatus(self.languages[selectedOption].l_maritalStatus);
    self.langGender(self.languages[selectedOption].l_gender);
    self.langAddress(self.languages[selectedOption].l_address);
    self.langState(self.languages[selectedOption].l_state);
    self.langCity(self.languages[selectedOption].l_city);
    self.langCountry(self.languages[selectedOption].l_country);
    self.sectionHeaderForPersonalDetails(self.languages[selectedOption].l_formSection1Header);
    self.sectionHeaderListOfUsers(self.languages[selectedOption].l_formSection3Header);
    self.firstNameError(self.languages[selectedOption].l_firstNameError);
    self.lastNameError(self.languages[selectedOption].l_lastNameError);
    self.phoneNumberError(self.languages[selectedOption].l_phoneNumberError);
    self.emailError(self.languages[selectedOption].l_emailError);
    self.ageError(self.languages[selectedOption].l_ageError);
    self.cityError(self.languages[selectedOption].l_cityError);
    self.stateError(self.languages[selectedOption].l_stateError);
    self.countryError(self.languages[selectedOption].l_countryError);
    self.allError(self.languages[selectedOption].l_allFieldsError);
    self.theme(self.languages[selectedOption].l_theme);
    self.light(self.languages[selectedOption].l_light);
    self.dark(self.languages[selectedOption].l_dark);
    self.nature(self.languages[selectedOption].l_nature);
    self.colorful(self.languages[selectedOption].l_colorful);
    self.vintage(self.languages[selectedOption].l_vintage);
    self.nextMsg(self.languages[selectedOption].l_next);
    self.previousMsg(self.languages[selectedOption].l_previous);
    self.submitMsg(self.languages[selectedOption].l_submitMessage);
    self.updateMsg(self.languages[selectedOption].l_updateMessage);
    self.viewMsg(self.languages[selectedOption].l_viewUserDetails);
    self.male(self.languages[selectedOption].l_male);
    self.female(self.languages[selectedOption].l_female);
    self.submitBtn(self.languages[selectedOption].l_submit);
    self.updateBtn(self.languages[selectedOption].l_update);
    self.deleteConfirmationMsg(self.languages[selectedOption].l_deleteConfirmationMessage);
    self.yes(self.languages[selectedOption].l_yes);
    self.no(self.languages[selectedOption].l_no);
    self.CRUDOperations(self.languages[selectedOption].l_crudOperations);
    self.ok(self.languages[selectedOption].l_ok);
  }

  self.languages = [{
    l_formSection1Header: "Personal Details",
    l_formSection2Header: "Personal Details",
    l_formSection3Header: "Address Details",
    l_div2Header: "List Of Users",
    l_firstName: "First Name",
    l_lastName: "Last Name",
    l_phoneNumber: "PhoneNumber",
    l_email: "Email",
    l_age: "Age",
    l_disability: "Disability",
    l_maritalStatus: "Marital-Status",
    l_gender: "Gender",
    l_address: "Address",
    l_city: "City",
    l_state: "State",
    l_country: "Country",
    l_theme: "Theme",
    l_light: "Light",
    l_dark: "Dark",
    l_nature: "Nature",
    l_colorful: "Colorful",
    l_vintage: "Vintage",
    l_submitMessage: "Your details have been recorded.",
    l_viewUserDetails: "View users list",
    l_updateMessage: "Your details have been updated.",
    l_firstNameError: "First Name should have only alphabets.",
    l_lastNameError: "Last Name should have only alphabets.",
    l_phoneNumberError: "Please enter 10 digit phone number.",
    l_emailError: "Email should have @ and .",
    l_ageError: "Age should be greater than 0 and less than 150",
    l_countryError: "Country Name should have only alphabets.",
    l_male: "Male",
    l_female: "Female",
    l_next: "Next",
    l_previous: "Previous",
    l_cityError: "City name should have only alphabets.",
    l_stateError: "State name should have only alphabets.",
    l_allFieldsError: "Please fill all fields.",
    l_submit: "Submit",
    l_update: "Update",
    l_crudOperations: "CRUD Operations",
    l_deleteConfirmationMessage: "Do you want to delete the details?",
    l_yes: "Yes",
    l_no: "No",
    l_ok: "Ok"
  }, {
    l_formSection1Header: "Détails personnels",
    l_formSection2Header: "Détails personnels",
    l_formSection3Header: "Détails de l'adresse",
    l_div2Header: "Liste des utilisateurs",
    l_firstName: "Prénom",
    l_lastName: "Nom de famille",
    l_phoneNumber: "Numéro de téléphone",
    l_email: "E-mail",
    l_age: "Âge",
    l_disability: "Invalidité",
    l_maritalStatus: "État civil",
    l_gender: "Genre",
    l_address: "Adresse",
    l_city: "Ville",
    l_state: "État",
    l_country: "Pays",
    l_theme: "Thème",
    l_light: "Lumière",
    l_dark: "Sombre",
    l_nature: "Nature",
    l_colorful: "Colorée",
    l_vintage: "Ancienne",
    l_submitMessage: "Vos coordonnées ont été enregistrées.",
    l_viewUserDetails: "Afficher la liste des utilisateurs",
    l_updateMessage: "Vos détails ont été mis à jour.",
    l_firstNameError: "Le prénom ne doit contenir que des alphabets.",
    l_lastNameError: "Le nom de famille ne doit contenir que des alphabets.",
    l_phoneNumberError: "Veuillez saisir un numéro de téléphone à 10 chiffres.",
    l_emailError: "L'e-mail doit contenir @ et .",
    l_ageError: "L'âge doit être supérieur à 0 et inférieur à 150",
    l_countryError: "Le nom du pays ne doit contenir que des alphabets.",
    l_male: "Mâle",
    l_female: "Femelle",
    l_next: "Suivant",
    l_previous: "Précédent",
    l_cityError: "Le nom de la ville ne doit contenir que des alphabets.",
    l_stateError: "Le nom de l'État ne doit contenir que des alphabets.",
    l_allFieldsError: "Merci de compléter tous les champs.",
    l_submit: "Soumettre",
    l_update: "Mise à jour",
    l_crudOperations: "Opérations CRUD",
    l_deleteConfirmationMessage: "Voulez-vous supprimer les détails ?",
    l_yes: "Oui",
    l_no: "Non",
    l_ok: "d'accord"
  },
  {
    l_formSection1Header: "वैयक्तिक माहिती",
    l_formSection2Header: "वैयक्तिक माहिती",
    l_formSection3Header: "पत्ता तपशील",
    l_div2Header: "वापरकर्त्यांची यादी",
    l_firstName: "पहिले नाव",
    l_lastName: "आडनाव",
    l_phoneNumber: "फोन नंबर",
    l_email: "ई-मेल",
    l_age: "वय",
    l_disability: "दिव्यांग",
    l_maritalStatus: "वैवाहिक स्थिती",
    l_gender: "लिंग",
    l_address: "पत्ता",
    l_city: "शहर",
    l_state: "राज्य",
    l_country: "देश",
    l_theme: "थीम",
    l_light: "प्रकाश",
    l_dark: "गडद",
    l_nature: "निसर्ग",
    l_colorful: "रंगीत",
    l_vintage: "प्राचीन",
    l_submitMessage: "तुमचे तपशील जतन केले गेले आहेत.",
    l_viewUserDetails: "वापरकर्ता सूची दर्शवा",
    l_updateMessage: "तुमचे तपशील अपडेट केले गेले आहेत.",
    l_firstNameError: "पहिल्या नावात फक्त अक्षरे असणे आवश्यक आहे.",
    l_lastNameError: "आडनावात फक्त अक्षरे असावीत.",
    l_phoneNumberError: "कृपया 10-अंकी फोन नंबर प्रविष्ट करा.",
    l_emailError: "ईमेलमध्ये @ आणि .",
    l_ageError: "वय 0 पेक्षा जास्त आणि 150 पेक्षा कमी असणे आवश्यक आहे",
    l_countryError: "देशाच्या नावात फक्त अक्षरे असावीत.",
    l_male: "पुरुष",
    l_female: "स्त्री",
    l_next: "खालील",
    l_previous: "मागील",
    l_cityError: "शहराच्या नावात फक्त अक्षरे असावीत.",
    l_stateError: "राज्याच्या नावात फक्त अक्षरे असावीत.",
    l_allFieldsError: "कृपया सर्व फील्ड पूर्ण करा.",
    l_submit: "प्रस्तुत करणे",
    l_update: "अपडेट",
    l_crudOperations: "सीआरयूडी ऑपरेशन्स",
    l_deleteConfirmationMessage: "तुम्हाला तपशील काढायचा आहे का?",
    l_yes: "हो",
    l_no: "नाही",
    l_ok: "ठीक आहे"
  },{
    l_formSection1Header: "Persönliche Daten",
    l_formSection2Header: "Persönliche Daten",
    l_formSection3Header: "Adressen Details",
    l_div2Header: "Liste der Benutzer",
    l_firstName: "Vorname",
    l_lastName: "Familienname",
    l_phoneNumber: "Telefonnummer",
    l_email: "Email",
    l_age: "Age",
    l_disability: "Behinderung",
    l_maritalStatus: "Familienstand",
    l_gender: "Geschlecht",
    l_address: "Adresse",
    l_city: "Stadt",
    l_state: "Zustand",
    l_country: "Land",
    l_theme: "Thema",
    l_light: "Licht",
    l_dark: "Dunkel",
    l_nature: "Natur",
    l_colorful: "Bunt",
    l_vintage: "Jahrgang",
    l_submitMessage: "Ihre Daten wurden erfasst.",
    l_viewUserDetails: "Benutzerliste anzeigen",
    l_updateMessage: "Deine Details wurden aktualisiert.",
    l_firstNameError: "Der Vorname sollte nur aus Buchstaben bestehen.",
    l_lastNameError: "Der Nachname sollte nur aus Buchstaben bestehen.",
    l_phoneNumberError: "Bitte geben Sie eine 10-stellige Telefonnummer ein.",
    l_emailError: "E-Mail sollte @ und enthalten.",
    l_ageError: "Das Alter sollte größer als 0 und kleiner als 150 sein",
    l_countryError: "Der Ländername sollte nur aus Buchstaben bestehen.",
    l_male: "Männlich",
    l_female: "Weiblich",
    l_next: "Nächste",
    l_previous: "Vorherige",
    l_cityError: "Der Städtename sollte nur aus Buchstaben bestehen.",
    l_stateError: "Der Staatsname sollte nur aus Buchstaben bestehen.",
    l_allFieldsError: "Bitte alle Felder ausfüllen.",
    l_submit: "Einreichen",
    l_update: "Aktualisieren",
    l_crudOperations: "CRUD-Operationen",
    l_deleteConfirmationMessage: "Möchten Sie die Details löschen?",
    l_yes: "Ja",
    l_no: "NEIN",
    l_ok: "OK"
  },{
    l_formSection1Header: "ವೈಯಕ್ತಿಕ ವಿವರಗಳು",
    l_formSection2Header: "ವೈಯಕ್ತಿಕ ವಿವರಗಳು",
    l_formSection3Header: "ವಿಳಾಸ ವಿವರಗಳು",
    l_div2Header: "ಬಳಕೆದಾರರ ಪಟ್ಟಿ",
    l_firstName: "ಮೊದಲ ಹೆಸರು",
    l_lastName: "ಕೊನೆಯ ಹೆಸರು",
    l_phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    l_email: "ಇಮೇಲ್",
    l_age: "ವಯಸ್ಸು",
    l_disability: "ಅಂಗವೈಕಲ್ಯ",
    l_maritalStatus: "ವೈವಾಹಿಕ-ಸ್ಥಿತಿ",
    l_gender: "ಲಿಂಗ",
    l_address: "ವಿಳಾಸ",
    l_city: "ನಗರ",
    l_state: "ರಾಜ್ಯ",
    l_country: "ದೇಶ",
    l_theme: "ಥೀಮ್",
    l_light: "ಬೆಳಕು",
    l_dark: "ಕತ್ತಲು",
    l_nature: "ಪ್ರಕೃತಿ",
    l_colorful: "ವರ್ಣಮಯ",
    l_vintage: "ವಿಂಟೇಜ್",
    l_submitMessage: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ.",
    l_viewUserDetails: "ಬಳಕೆದಾರರ ಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ",
    l_updateMessage: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ.",
    l_firstNameError: "ಮೊದಲ ಹೆಸರು ಅಕ್ಷರಮಾಲೆಗಳನ್ನು ಮಾತ್ರ ಹೊಂದಿರಬೇಕು.",
    l_lastNameError: "ಕೊನೆಯ ಹೆಸರು ಕೇವಲ ವರ್ಣಮಾಲೆಗಳನ್ನು ಹೊಂದಿರಬೇಕು.",
    l_phoneNumberError: "ದಯವಿಟ್ಟು 10 ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    l_emailError: "ಇಮೇಲ್ @ ಮತ್ತು ಹೊಂದಿರಬೇಕು.",
    l_ageError: "ವಯಸ್ಸು 0 ಕ್ಕಿಂತ ಹೆಚ್ಚಿರಬೇಕು ಮತ್ತು 150 ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು",
    l_countryError: "ದೇಶದ ಹೆಸರು ಕೇವಲ ವರ್ಣಮಾಲೆಗಳನ್ನು ಹೊಂದಿರಬೇಕು.",
    l_male: "ಪುರುಷ",
    l_female: "ಹೆಣ್ಣು",
    l_next: "ಮುಂದೆ",
    l_previous: "ಹಿಂದಿನ",
    l_cityError: "ನಗರದ ಹೆಸರು ಅಕ್ಷರಮಾಲೆಗಳನ್ನು ಮಾತ್ರ ಹೊಂದಿರಬೇಕು.",
    l_stateError: "ರಾಜ್ಯದ ಹೆಸರು ಕೇವಲ ವರ್ಣಮಾಲೆಗಳನ್ನು ಹೊಂದಿರಬೇಕು.",
    l_allFieldsError: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
    l_submit: "ಸಲ್ಲಿಸು",
    l_update: "ನವೀಕರಿಸಿ",
    l_crudOperations: "CRUD ಕಾರ್ಯಾಚರಣೆಗಳು",
    l_deleteConfirmationMessage: "ನೀವು ವಿವರಗಳನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?",
    l_yes: "ಹೌದು",
    l_no: "ಇಲ್ಲ",
    l_ok: "ಸರಿ"
  }]


}
ko.applyBindings(new viewModel());

