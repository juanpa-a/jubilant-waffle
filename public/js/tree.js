let id = 1;

const node = {
  id: 1,
  parentId: 0,
  leaf: false,
  title: "Room",
  body:
    "You wake up in a dark room, you look around and find no recognizable features. You feel disoriented, airless, and hungry, unsure of how long you've been in the room, or why you are here in the first place. You notice a couple of items on the floor.",
  question: "What do you grab?",
  hidden: false,
  createdAt: "2020-01-10T20:55:04.000Z",
  updatedAt: "2020-01-10T20:55:04.000Z"
};

const children = [
  {
    id: 2,
    parentId: 1,
    leaf: false,
    title: "Waffle",
    body:
      "You pick up the waffle, it looks relatively fresh, and the smell makes your stomach growl in anticipation. You are unsure what it's made of or if it's even safe to eat, and decide to first examine it.",
    question: "What is it made of?",
    hidden: false,
    createdAt: "2020-01-10T20:55:04.000Z",
    updatedAt: "2020-01-10T20:55:04.000Z"
  },
  {
    id: 13,
    parentId: 1,
    leaf: false,
    title: "Box",
    body:
      "You slowly notice how this ornate box glitters even in the darkness. You lose track of time as every detail entrances you, the intricate components cool to the touch. An eldritch symbol covers the keyhole, although the box appears unlocked. You slowly open the lid, revealing contents for which your sanity was unprepared.",
    question: "What is inside?",
    hidden: false,
    createdAt: "2020-01-10T20:55:06.000Z",
    updatedAt: "2020-01-10T20:55:06.000Z"
  },
  {
    id: 15,
    parentId: 1,
    leaf: false,
    title: "Sword",
    body:
      "You grab the sword's hilt and find it far lighter than you expected. You feel energy coursing through you as light surrounds the blade. You have never seen this sword before, but you know it's forever bonded to you, and that with it you are unstoppable. You hear a horrible sound outside, and turn to see a door opening that leads to a desolate valley.",
    question: "What is outside?",
    hidden: false,
    createdAt: "2020-01-10T20:55:06.000Z",
    updatedAt: "2020-01-10T20:55:06.000Z"
  }
];

const drawEvent = () => {
  $(".description").text(node.body);
  $(".question").text(node.question);
};

const drawOptions = () => {
  $('.choices').empty();
  children.forEach(elem => {
    $(".choices").append(`<span  value=${15} class="choice col-lg-4">${elem.title}</span>`);
  });
};

drawEvent()
drawOptions()

const moveForward = (id) => {
  node = API.getById(id);
  children = API.getByParentId(id);

  drawEvent();
  drawOptions();
}

$('.choice').on('click', function() {
  moveForward($(this).val());
})