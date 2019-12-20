function parser(obj, root) {
    let branch = new TreeBranch(root.id, root.name, root.data, obj, root)
    return branch

    function TreeBranch(id, name, data, obj, root) {
        this.id = id
        this.name = name
        this.data = data
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
    name: "Initial",
    parent: 0,
    data: "You Open a Door",
    children: []
    },
    {
    id: 2,
    name: "Choice",
    parent: 1,
    data: "Go through the door",
    children: []
    },
    {
    id: 3,
    name: "Decision",
    parent: 1,
    data: "You close the door",
    children: []
    },
    {
    id: 4,
    name: "Secondary",
    parent: 2,
    data: "You Open a Door",
    children: []
    },
    {
    id: 5,
    name: "Full",
    parent: 2,
    data: "Go kick the door",
    children: []
    },
    {
    id: 6,
    name: "Net",
    parent: 4,
    data: "You imagine the door",
    children: []
    }
]

let convertedObj = parser(objectPassed, objectPassed[0])
console.log(convertedObj)
console.log("-------------------------------------")
let parsed = `'${JSON.stringify(convertedObj)}'`

console.log(parsed)


module.exports = parsed