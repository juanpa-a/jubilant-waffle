let id = 1;

let currentNode = API.getById(id);
let children = API.getByParentId(id);

console.log('hi');
console.log(currentNode);