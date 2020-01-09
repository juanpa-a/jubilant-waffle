// Get references to page elements
var $ref = {
  button: $("#submit"),
  parentId: $("#parentId"),
  leaf: $("#leaf"),
  title: $("#title"),
  body: $("#body"),
  question: $("#question")
};

// The API object contains methods for each kind of request we'll make
var API = {
  add: function(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/add",
      data: JSON.stringify(data)
    });
  },
  getById: function(id) {
    return $.ajax({
      url: "api/id/" + id,
      type: "GET"
    });
  },
  getByParentId: function(id) {
    return $.ajax({
      url: "api/children/" + id,
      type: "GET"
    });
  }
};

// function to add entry to db, linked to button click or submit
function addEntry(event) {
  event.preventDefault();

  var newEntry = {
    parentId: $ref.parentId.val().trim(),
    leaf: $ref.leaf.val(),
    title: $ref.title.val().trim(),
    body: $ref.body.val().trim(),
    question: $ref.question.val().trim(),
    hidden: false
  };

  if (!newEntry.title) {
    errorModal("Title is required.");
    return;
  } else if (newEntry.title.length < 2 || newEntry.title.length > 40) {
    errorModal("Title has to be between 2 and 40 characters.");
    return;
  }

  if (!newEntry.body) {
    errorModal("Text is required.");
    return;
  } else if (newEntry.body.length < 10 || newEntry.body.length > 600) {
    errorModal("Text has to be between 10 and 600 characters.");
    return;
  }

  if (!newEntry.question) {
    errorModal("Question (or ending) is required.");
    return;
  } else if (newEntry.question.length < 4 || newEntry.question.length > 20) {
    errorModal("Question (or ending) has to be between 4 and 20 characters");
    return;
  }

  if (!newEntry.leaf) {
    newEntry.leaf = true;
  }

  if (!newEntry.parentId) {
    errorModal("Parent id is required.");
    return;
  }

  restartValues();
  API.add(newEntry).then(function() {
    location.reload();
  });
}

//Resets input values
function restartValues() {
  $ref.parentId.val("");
  $ref.leaf.val("");
  $ref.title.val("");
  $ref.body.val("");
  $ref.question.val("");
}

//Show error modal with given information
function errorModal(info) {
  $("#errorModalBody").text(info);
  $("#errorModal").modal("show");
}

// Add event listeners to the submit button
$ref.button.on("click", addEntry);
