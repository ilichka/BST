class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null; // корень bst
  }

  insert(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode); // helper method below
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  inOrderTraverse(node, callback) { //Прямой обход. Посещает все узлы в порядке возрастания. Можно указать с какого узла начать и какую функию выполнять(callback)
    if (node != null) {
      this.inOrderTraverse(node.left, callback);
      callback(node.data);
      this.inOrderTraverse(node.right, callback);
    }
  }

  preOrderTraverse(node, callback) { //Симметричный обход. При симметричном обходе посещаются каждый узел до его потомков.
    if (node != null) {
      callback(node.data);
      this.preOrderTraverse(node.left, callback);
      this.preOrderTraverse(node.right, callback);
    }
  }

  postOrderTraverse(node, callback) { //Обратный обход.
    if (node != null) {
      this.postOrderTraverse(node.left, callback);
      this.postOrderTraverse(node.right, callback);
      callback(node.data);
    }
  }

  search(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return node;
    }
  }

  static findMinNode(node) {
    let currNode = node;

    while (currNode.left !== null) {
      currNode = currNode.left;
    }
    return currNode.data;
  }

  static minNode(node) {
    // если слева от узла ноль тогда это должен быть минимальный узел
    if (node.left === null)
      return node;
    else
      return BinarySearchTree.findMinNode(node.left);
  }

  remove(data) {
    this.root = this.removeNode(this.root, data); // helper method below
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
      // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
      // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
      // если данные такие как данные корня, удаляем узел
    } else {
      // удаляем узел без потомков (листовой узел (leaf) или крайний)
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // удаляем узел с одним потомком
      if (node.left === null) {
        node = node.right;
        return node;
      } else if(node.right === null) {
        node = node.left;
        return node;
      }
      // удаляем узел с двумя потомками
      // minNode правого поддерева хранится в новом узле
      let newNode = BinarySearchTree.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }
}

const BST = new BinarySearchTree();
BST.insert(11); // establishes root node
BST.insert(7);
BST.insert(9);
BST.insert(15);
BST.insert(6);
console.log(BST);

console.log(1);