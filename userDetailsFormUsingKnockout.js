function viewModel(){
    var self = this;
    self.sectionHeader = ko.observable("Personal Details");
}

ko.applyBindings(viewModel());