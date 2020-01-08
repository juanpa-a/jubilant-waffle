let tree = [];

// A. Query que revisa el nodo donde estas y devuelve el objeto
// Depende del api
const getNode = id => {
  // db query
};

// B. Funcion que regresa hijos del nodo
const getChildren = id => {
  // debe guardar un arreglo de tuplas
  // con id, title
};

// C. Contructor que toma A y B y contruye para P5
class Node {
  constructor(id, title, body, question, isLeaf) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.question = question;
    this.isLeaf = isLeaf;
    this.children = getChildren(this.id);
  }
}

const parse = id => {
  const root = getNode(id);
  const children = getChildren(id);

  const node = new Node(
    root.id,
    root.title,
    root.body,
    root.question,
    root.isLeaf,
    root.children = children;
  );
};

// D. Agrega al array --> click
const drawTree = () => {
  tree.push(parse(id));
  // refresh tree
  // mandar a p5
};

// E. Funcion de P5
