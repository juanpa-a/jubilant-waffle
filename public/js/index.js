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

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
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

  if (!newEntry.parentId) {
    alert("Missing parent id");
    return;
  }

  if (!newEntry.leaf) {
    newEntry.leaf = true;
  }

  if (!newEntry.title) {
    alert("Missing title");
    return;
  }

  if (!newEntry.body) {
    alert("Missing body");
    return;
  }

  if (!newEntry.question) {
    alert("Missing question");
    return;
  }

  API.add(newEntry).then(function() {
    location.reload();
  });

  restartValues();
}

//Resets input values
function restartValues() {
  $ref.parentId.val("");
  $ref.leaf.val("");
  $ref.title.val("");
  $ref.body.val("");
  $ref.question.val("");
}

// Add event listeners to the submit button
$ref.button.on("click", addEntry);
