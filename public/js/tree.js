let id = 1;


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

let node = {
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

let children = [
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
  $(".description").text('');
  $(".description").text(node.body);
  $(".description").attr('value', id);
  $(".question").text('');
  $(".question").text(node.question);
};

const drawOptions = () => {
  $('.choices').empty();
  children.forEach(elem => {
    console.log("Elem: "+ elem)
    console.log("Hidden ": + elem.hidden)
    console.log(elem.id);
    $(".choices").append(`<span  value=${elem.id} class="choice col-lg-4">${elem.title}</span>`);
  });
};

drawEvent()
drawOptions()

function moveForward(id) {
  node = API.getById(id);
  children = API.getByParentId(id);
}

function render() {
  node = node.responseJSON;
  children = children.responseJSON;
  drawEvent();
  drawOptions();
}

$(document).on("click",".choice",function() {

  id = $(this).attr('value');
  console.log(id);
  moveForward(id);
  render();
   console.log(node.leaf)
   if (node.leaf) {
   $(".addNew").text("")
}
   


});

$("#new-branch").on("click", function(event) {
   event.preventDefault()
  let title = $("#node-title").val().trim()
  let description = $("#node-description").val().trim()
  let question = $("#node-question").val().trim()


})

//Actual Tree
let width = window.innerWidth;
let height = window.innerHeight;

treeData = {
  name: "Room",
  id: 1,
  children: [
    { name: "Waffle", id: 2},
    { name: "Box", id: 13},
    { name: "Sword", id: 15},
  ]
}




$(document).ready(function() {
    //init(treeData)
})


function init(treeData) {

    
      // Gives the height of the spacetree
      dx = 10;
      // Node separation distance
      dy = 150;
      // Can be typed in nodeSize below
      tree = d3.tree().nodeSize([dx, dy]);

    
      // separation using relative positioning
      margin = { top: 50, right: 120, bottom: 10, left: 40 };
    
      // ???
      diagonal = d3
        .linkHorizontal()
        .x(d => d.y)
        .y(d => d.x);
    
      // gets element to put chart
      let getElem = document.getElementById("spacetree");
    
      // Runs function, this creates the chart and appends it to above
      getElem.append(svg.node());
}
document.addEventListener("DOMContentLoaded", function() {
    //init(treeData)

  
});
 // Gives the height of the spacetree
 dx = 30;
 // Node separation distance
 dy = 160;
 // Can be typed in nodeSize below
 tree = d3.tree().nodeSize([dx, dy]);


 // separation using relative positioning
 margin = { top: 50, right: 120, bottom: 10, left: 80 };

 // ???
 diagonal = d3
   .linkHorizontal()
   .x(d => d.y)
   .y(d => d.x);

    // Constructs a "root node" from the passed data
    const root = d3.hierarchy(treeData);

    const currentNode = root.descendants().reverse();
    console.log(currentNode)
    // Nada... Usado para que no se rompa
    root.x0 = dy / 2;
    // Nada... Usado para que no se rompa
    root.y0 = 0;

    // Creates an array of descendant nodes, then followed by each child in topological order
    root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        //Arregla cosas del tamano
        if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    //assings to svg an element that:
    const svg = d3
        //SVG HTML document fragment
        .create("svg")
        //With attribute of viewbox ("points seen" in SVG drawing area) [min x, min y, width, height]
        .attr("viewBox", [-margin.left, -margin.top, width, dx])
        //Changes font
        .style("font", "10px cute-font cursive")
        //Cannot highlight text or select
        .style("user-select", "none");

    //Adds style to the lines
    const gLink = svg
        // <g> is used to group svg elements. Transformations are applied to child elements only
        .append("g")
        // Line fill between nodes. Se ve muy feo con fill
        .attr("fill", "none")
        // Line color between nodes. Modify this not fill
        .attr("stroke", "#84b082")
        // Line oppacity between nodes
        .attr("stroke-opacity", .3)
        // Line width
        .attr("stroke-width", 5);

    //Adds style to cursor when in svg object
    const gNode = svg
        // <g> is used to group svg elements. Transformations are applied to child elements only  
        .append("g")
        // Cursor becomes pointer if on node
        .attr("cursor", "pointer")
        //SVG only. The element can only be the target of a pointer event when the pointer is over 
        //the interior (i.e., fill) or the perimeter (i.e., stroke) of the element. 
        .attr("pointer-events", "hover");


    // update function
    function update(source) {
        // Duration of initial animation of tree on the right (alt click as first duration)
        const duration = d3.event && d3.event.altKey ? 200 : 0;
        // Returns all nodes from "last" to root with reverse
        const nodes = root.descendants().reverse();
        // Returns links between all the nodes using source (parent) to target (child)
        const links = root.links();
        // Compute the new tree layout.
        tree(root);

        // assigns two variables to root node
        let left = root;
        let right = root;

        // Invokes the specified function for node and each descendant in pre-order traversal, 
        // such that a given node is only visited after all of its ancestors have already been visited. 
        // The specified function is passed the current node.
        root.eachBefore(node => {
            if (node.x < left.x) {
                left = node
            };
            if (node.x > right.x) {
                right = node
            }
        });
        
        // Calculates to paint svg element
        const height = right.x - left.x + margin.top + margin.bottom;

        // Adds the animation
        const transition = svg
        .transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween(
            "resize",
            window.ResizeObserver ? null : () => () => svg.dispatch("toggle")
        );

        // Update the nodes…
        const node = gNode.selectAll("g").data(nodes, d => d.id);

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node
        .enter()
        .append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", d => {
            d.children = d.children ? null : d._children;
            update(d);
        });

        // Style of the Circle of node
        nodeEnter
        .append("circle")
        .attr("r", 4)
        .attr("fill", d => (d._children ? "green" : "#84b082"))
        .attr("stroke-width", 20);

        // Chnages to text
        nodeEnter
        // Adds text to svg
        .append("text")
        //???
        .attr("dy", "0.31em")
        // Moves horizontaly if has children
        .attr("x", d => (d._children ? -6 : 6))
        // Sets before or after node
        .attr("text-anchor", d => (d._children ? "end" : "start"))
        // Adds actual title text
        .text(d => d.data.name)
        .clone(true)
        .lower()
        // Outside text color (shadow)
        .attr("stroke-linejoin", "arcs")
        // Stroke width
        .attr("stroke-width", 2.5)
        // Stroke color
        .attr("stroke", "#84b082")
        .attr("fill", "yellow");

        // Transition nodes to their new position.
        const nodeUpdate = node
        .merge(nodeEnter)
        .transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node
        .exit()
        .transition(transition)
        .remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

        // Update the links…
        const link = gLink.selectAll("path").data(links, d => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link
        .enter()
        .append("path")
        .attr("d", d => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
        });

        // Transition links to their new position.
        link
        .merge(linkEnter)
        .transition(transition)
        .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link
        .exit()
        .transition(transition)
        .remove()
        .attr("d", d => {
            const o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        });

        // Stash the old positions for transition.
        root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
        });
    }

    update(root);

    // Logs the created chart
    console.log(svg.node());

    // Returns the chart element
    svg.node();

    $('.choice').on('click', function() {

      let id = $(this).attr('value');
      //pull de la base de datos buscando este nodo
      //pull de la base de datos con todos los nodos hijos
      //se crea (parsea) el objeto
      //Se manda el objeto a D3
    });
    


function parser(obj, root) {
  let branch = new TreeBranch(root.id, root.title, root.body, root.question, root.isLeaf, obj, root)
  return branch

  function TreeBranch(id, title, body, question, isLeaf, obj, root) {
      this.id = id
      this.title = title
      this.body = body
      this.question = question
      this.isLeaf = isLeaf
      //this.children = []
      this.children = getChildren(obj, root)
  
      function getChildren(obj, root) {
          let children = []
          for (i = 1; i < obj.length; i++) {
              if (obj[i].parent === root.id) {
                  children.push(obj[i])
              }
              else {
                  let parent = obj[obj[i].parent - 1].children
                  parent.push(obj[i])
              }
          }
          return children
      }
  }
}

let objectPassed = [
  {
  id: 1,
  title: 'Initial',
  parent: 0,
  body: 'You Open a Door',
  children: [],
  question: "gerda",
  isLeaf: false
  },
  {
  id: 2,
  title: 'Choice',
  parent: 1,
  body: 'Go through the door',
  children: [],
  question: "res",
  isLeaf: false
  },
  {
  id: 3,
  title: 'Decision',
  parent: 1,
  body: 'You close the door',
  children: [],
  question: "yweawdef",
  isLeaf: false
  },
  {
  id: 4,
  title: 'Secondary',
  parent: 2,
  body: 'You Open a Door',
  children: [],
  question: "evfdsc",
  isLeaf: false
  },
  {
  id: 5,
  title: 'Full',
  parent: 2,
  body: 'Go kick the door',
  children: [],
  question: "refwd",
  isLeaf: false
  },
  {
  id: 6,
  title: 'Net',
  parent: 4,
  body: 'You imagine the door',
  children: [],
  question: "rdwec",
  isLeaf: false
  }
]

let convertedObj = parser(objectPassed, objectPassed[0])
let parsed = JSON.stringify(convertedObj)

console.log(convertedObj)
console.log("-------------------------------------")
//console.log(parsed)


// Mandar a object passed como nodos normales y hacerle push cuando haya un nuevo nodo


let newArr = []
newArr.push(node)

// Agregar propiedad de array vacio de children

// parse new arr 

//send to D3

// display


