// Get references to page elements
var $ref = {
  button: $("#new-branch"),
  //leaf: $("#leaf"),
  title: $("#node-title"),
  body: $("#node-description"),
  question: $("#node-question")
};

$(".choice").on("click", function() {
  console.log($(this).text());
});

// The API object contains methods for each kind of request we'll make
var API = {
  add: function(data) {
    return $.ajax({
      url: "../api/add",
      type: "POST",
      data: data
    });
  },
  getById: function(id) {
    return $.ajax({
      url: "../api/id/" + id,
      type: "GET",
      async: false
    });
  },
  getByParentId: function(id) {
    return $.ajax({
      url: "../api/children/" + id,
      type: "GET",
      async: false
    });
  }
};

// function to add entry to db, linked to button click or submit
function addEntry(event) {
  event.preventDefault();

  var newEntry = {
    parentId: parseInt($(".description").attr("value")),
    //leaf: $ref.leaf.val(),
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
  } else if (newEntry.body.length < 10) {
    errorModal("Text has to be at least 10 characters.");
    return;
  }

  if (!newEntry.question) {
    errorModal("Question (or ending) is required.");
    return;
  } else if (newEntry.question.length < 2 || newEntry.question.length > 40) {
    errorModal("Question (or ending) has to be between 2 and 40 characters");
    return;
  }

  if (!newEntry.leaf) {
    newEntry.leaf = true;
  }

  console.log(newEntry)

  API.add(newEntry).then(function(err) {
    restartValues();
    location.reload();
    console.log("New Entry Added")
    console.log(err);
  });
}

//Resets input values
function restartValues() {
  //$ref.leaf.val("");
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
$(document).on("click","#new-branch",addEntry);

$(document).on("click","#bttnOk", function(){
  $("#infoModal").modal("show");
});

$("#logo").on("click", function() {
  location.reload();
});
