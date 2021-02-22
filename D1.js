class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    // create a new node
    let newNode = new Node(value);
    // check if list is empty, it is head and tail in the new node
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }
    // other wise take the tail node to be the new node
    else {
      this.tail.next = newNode;
      // set the previous property of the newly created node to be the tail
      newNode.prev = this.tail;
      // set the tail to be the newly created node
      this.tail = newNode;
    }

    // increment lenght
    this.length++;
    // return the list
    return this;
  }

  // remove node at end of list
  pop() {
    // if no head return undefined
    if (!this.head) {
      return undefined;
    }
    // store current tail in a variable
    let popNode = this.tail;
    // if length is 1 set the head and tail to be null
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // make the tail to be the previous node
      this.tail = popNode.prev;
      // set the new tail next to be null
      this.tail.next = null;
      popNode.prev = null;
    }
    // decrement the length
    this.length--;
    // return the removed value
    return popNode;
  }

  // shift: remove a node at the beginning of list
  shift() {
    // if length is 0 return undefined
    if (!this.head || this.length === 0) {
      return undefined;
    }
    // store current head/old head in a variable
    let currentHead = this.head;
    // if length is 1 set head to be null and tail as well
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // make the head to be the next of the old head
      this.head = currentHead.next;
      // set heads prev property to be null
      this.head.prev = null;
      // set the old head next to be null
      currentHead.next = null;
    }

    // decrement length is list
    this.length--;
    // return old head
    return currentHead;
  }
  // add node to the beginning of list
  unShift(value) {
    // create a new node
    let newNode = new Node(value);
    // if length is 0 set head and tail to be the new node
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // otherwise set the prev property on the head of the list to be the new node
      this.head.prev = newNode;
      // set the next property on the new Node to be the head property
      newNode.next = this.head;
      // update head to be the newNode
      this.head = newNode;
    }
    // increment the length
    this.length++;
    // return the length
    return this;
  }
  // return node at their position
  get(index, value) {
    // check if index is 0 or greater or equal to length , return null
    if (index < 0 || index >= this.length) {
      return null;
    }
    if (index <= this.length / 2) {
      console.log(`Working From Start`);
      let count = 0;
      let current = this.head;

      while (count !== index) {
        current = current.next;
        count++;
      }
      return current;
    } else {
      console.log(`Working from End`);
      let count = this.length - 1;
      let current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
      return current;
    }
  }
  set(index, value) {
    let foundNode = this.get(index);

    if (foundNode !== null) {
      foundNode.value = value;
      return true;
    }
    return false;
  }
  insert(index, value) {
    // if index is < 0 or >= to the length return false
    if (index < 0 || index > this.length) {
      return null;
    }
    // if index is 0, unshift
    if (index === 0) {
      return this.unShift(value);
    }
    // if index is same as the length, push
    if (index === this.length) {
      return this.push(value);
    }
    //   create ne new node
    let newNode = new Node(value);
    // use get method to access the index - 1
    let beforeNode = this.get(index - 1);
    let afterNode = beforeNode.next;
    // set next and prev property on the correct nodes to link everything together
    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;

    // increment the length
    this.length++;
    // return true
    return true;
  }

  // delete node
  remove(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }
    let removedNode = this.get(index);
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;
    return removedNode;
  }
}

let list = new DoublyLinkedList();
list.push(97);
list.push(98);
list.push(99);
list.push(100);
list.push(101);
list.push(102);
console.log(`-------- Before Pop --------->`);
console.log(list);
console.log(`-------- After Pop --------->`);
list.pop();
console.log(list);

console.log(`-------- Before Shift --------->`);
console.log(list);
console.log(`-------- After Shift --------->`);
list.shift();
console.log(list);

console.log(`-------- Before UnShift --------->`);
console.log(list);
console.log(`-------- After UnShift --------->`);
list.unShift(96);
console.log(list);

console.log(`------- Before Getting node -------`);
console.log(list);
console.log(`------- After Getting node -------`);
console.log(list.get(0));
console.log(list);

console.log(`------- Before Set node -------`);
console.log(list);
console.log(`------- After Set node -------`);
console.log(list.set(0, "Peter"));
console.log(list);

console.log(`------- Before Insert node -------`);
console.log(list);
console.log(`------- After Insert node -------`);
console.log(list.insert(3, "Oscar"));
console.log(list);

console.log(`------- Before Removed node -------`);
console.log(list);
console.log(`------- After Removed node -------`);
console.log(list.remove(4));
console.log(list);
