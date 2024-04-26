function viewModel() {
    var self = this;
    var data = [];
    self.sectionHeaderForPersonalDetails = ko.observable("Personal Details");
    self.sectionHeaderForAddressDetails = ko.observable("Address Details");

    // Successful Message.
    self.successfulMessage = ko.observable(false);
    self.showSuccessfullMessage = function () {
        self.successfulMessage = true
    }
    self.hideSuccessfullMessage = function () {
        self.successfulMessage = false
    }

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

    self.disabilityOptions = ko.observableArray(["Yes", "No"])
    self.maritalStatusOptions = ko.observableArray(["Single", "Married", "Do not mention"])
    // self.userRecord=ko.observableArray([
    //     self.firstName(),
    //     self.lastName,
    //     self.phoneNumber,
    //     self.email,
    //     self.age,
    //     self.city,
    //     self.state,
    //     self.country,
    //     self.gender,
    //     self.disability,
    //     self.maritalStatus,
    //     self.address
    // ])

    // self.pushDataToDataArray=function(){
    //     self.data.push(self.userRecord);
    // }

    self.LoadSection1 = function () {
        document.getElementById("section1").style.display = "block";
        document.getElementById("section2").style.display = "none";
        document.getElementById("section3").style.display = "none";
    }

    self.LoadSection2 = function () {
        document.getElementById("section1").style.display = "none";
        document.getElementById("section2").style.display = "block";
        document.getElementById("section3").style.display = "none";
    }

    self.LoadSection3 = function () {
        document.getElementById("section1").style.display = "none";
        document.getElementById("section2").style.display = "none";
        document.getElementById("section3").style.display = "block";
    }

    self.RemoveAllSections = function () {
        document.getElementById("section1").style.display = "none";
        document.getElementById("section2").style.display = "none";
        document.getElementById("section3").style.display = "none";
        document.getElementById("section4").style.display = "block";
    }
}

ko.applyBindings(new viewModel());