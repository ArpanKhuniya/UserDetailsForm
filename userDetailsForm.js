function updateUserDetailsTable() {
  // The preventDefault does not reload the page and the data wont be lost.
  event.preventDefault();

  // Values entered by user in the form
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;

  // Storing already present content in the table in userDetialsTableContent.
  let userDetialsTableContent =
    document.getElementById("userDetailsTable").innerHTML;

  userDetialsTableContent += `<tr> 
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${phoneNumber}</td>
          </tr>`;

  // Updating the table content.
  document.getElementById("userDetailsTable").innerHTML =
    userDetialsTableContent;
}
