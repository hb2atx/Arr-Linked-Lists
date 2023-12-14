/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
    }
  }
  
  /** LinkedList: chained together nodes. */
  
  class LinkedList {
    constructor(vals = []) {
      this.head = null;
      this.tail = null;
      this.length = 0;
  
      for (let val of vals) this.push(val);
    }
  
    /** push(val): add new value to end of list. */
  
    push(val) {
        let newNode = new Node(val);// creates and initialzies a new node with the provided value
        if (!this.head){
          // If the list doesn't have a head node (i.e., it's an empty list), it sets both the 
          //b head and tail to the new node, effectively making it the only node in the list.
            this.head = newNode;
            this.tail = this.head;
        }else{
            this.tail.next = newNode;
            //If the list already has nodes, it sets the next pointer of the current tail to the new node, 
            // making the new node the new tail of the list.
            this.tail = newNode;
            //  Regardless of whether the list was empty or not, it increments the length of the list by 1 
            // as a new node has been added.
        }
        this.length += 1;
        //Increases the length of the list by 1, as a new node is added.
    }
  
    /** unshift(val): add new value to start of list. */
  
    unshift(val) {
        const newNode = new Node(val); //first we need to create the node by invoking new Node(), passing in a value. This creates an object
        //if no head
        if(!this.head){ // check if the list is empty (if there's no head node)
            this.head = newNode;
            this.tail = newNode;
            // Ifthe list is empty, sets both head and tail to the new node.
        }else{
            newNode.next = this.head;
            // If the list is not empty, sets the new node's 'next' pointer to the current head.
            this.head = newNode;
        }
        this.length++;
        return this;
    }
  
    /** pop(): return & remove last item. */
  
    pop() {
      //: Checks if the linked list is empty by verifying if there's a head node. 
      // If the list is empty (no head node), it returns undefined, indicating there's nothing to remove.
        if(!this.head){
          return undefined;
        }
        //Traverse the list to find the last node:
        // Initializes currentNode as the head of the list.
        let currentNode = this.head; 
        let newTail = currentNode; // Also initializes newTail as the head initially.

        while(currentNode.next){
          //Loop through the list until currentNode reaches the last node.
          // Enters a loop that traverses the list until currentNode reaches the last node 
          //(where currentNode.next is null).
          newTail = currentNode;
          currentNode = currentNode.next;
        }
        this.tail = newTail; //this.tail = newTail;: Updates the tail pointer to the new tail (second-to-last node).
        this.tail.next = null; //this.tail.next = null;: Removes the reference to the last node by setting the next pointer of the new tail to null.
        this.length--; // Decrements the length of the list as a node has been removed.
                      // If the list becomes empty after removing the node:

        if(this.length === 0){ //If the list becomes empty after removing the node:
                              //Resets both head and tail to null since there are no nodes left in the list.
          this.head = null;
          this.tail = null;
        }
        return currentNode;
    }
  
    /** shift(): return & remove first item. */
  
    shift() {
      if(!this.head){ //: Checks if the linked list is empty by verifying if there's a head node. If the list is empty (no head node), 
        //it returns undefined, indicating there's nothing to remove.
        return undefined;
      }
      const removedNode = this.head; // Stores a reference to the current head node, which is the node to be removed
      this.head = this.head.next; // Moves the head pointer to the next node in the list, effectively removing the 
      //current head node from the list.
      this.length--; // Decrements the length of the list as a node has been removed.
      //If the list becomes empty after removing the node: Resets tail to null since there are no nodes left in the list.

      if(this.length === 0){
        this.tail = null;
      }
      return removedNode; //Finally, it returns removedNode, which represents the node that was removed from the beginning of the list.
    }
  
    /** getAt(idx): get val at idx. */
  
    getAt(idx) {
      //// If the index is out of bounds or the list is empty, return null or handle the case as needed.
      if(idx < 0 || idx >= this.length || !this.head){
        return null;
      }
      let currentNode = this.head;
      let count = 0;

      while(count !== idx){ // // Loop through the list until count reaches the desired index.
        currentNode = currentNode.next;
        count++;
        if(currentNode === null){
          //If the index is out of bounds (e.g., greater than the list length), return null or handle the case as needed.
          return null;
        }
      }
      return currentNode.value; //Return the value of the node at the specified index.
    }
  
    /** setAt(idx, val): set val at idx to val */
  
    setAt(idx, val) {
      if(idx < 0 || idx >= this.length || !this.head){
        // If the index is out of bounds or the list is empty, return false or handle the case as needed.
        return false;
      }
      let currentNode = this.head;
      let count = 0;

      while(count !== idx){
        currentNode = currentNode.next;
        count++;
        if(currentNode === null){
          // If the index is out of bounds (e.g., greater than the list length), return false or handle the case as needed.
          return false;
        }
      }
      currentNode.value = val; //Set the value of the node at the specified index to the new value (val).
      return true; //Return true to indicate successful update.
    }
  
    /** insertAt(idx, val): add node w/val before idx. */
  
   
      insertAt(idx, val) {
        if (idx < 0 || idx > this.length) {
            // If the index is out of bounds, return false or handle the case as needed.
            return false;
        }
    
        const newNode = new Node(val);
        let currentNode = this.head;
        let prevNode = null;
        let count = 0;
    
        if (idx === 0) {
            // If inserting at the beginning (idx is 0), update head and tail accordingly
            newNode.next = this.head;
            this.head = newNode;
            
            if (!this.tail) {
                // If the list was empty before insertion, update tail to the new node
                this.tail = newNode;
            }
    
            this.length++;
            return true;
        }
    
        while (count !== idx) {
            // Loop through the list until count reaches the desired index.
            prevNode = currentNode;
            currentNode = currentNode.next;
            count++;
    
            if (currentNode === null && count !== idx) {
                // If the index is out of bounds, return false or handle the case as needed.
                return false;
            }
        }
    
        prevNode.next = newNode;
        newNode.next = currentNode;
    
        if (idx === this.length) {
            // If inserting at the end, update the tail to the new node
            this.tail = newNode;
        }
    
        this.length++;
        return true;
    }
    
    }
  
    /** removeAt(idx): return & remove item at idx, */
  
    removeAt(idx) {
      if (idx < 0 || idx >= this.length || !this.head) {
        return null;
      }
      let currentNode = this.head;
      let prevNode = null;
      let count = 0;

      if(idx === 0){
        this.head = currentNode.next;
        if(this.length === 1) {
          this.tail = null;
        }
        this.length--;
        return currentNode.value;
      }
      while (count !== idx) {
        prevNode = currentNode;
        currentNode = currentNode.next;
        count++;

        if(currentNode === null) {
          return null;
        }
      }
      prevNode.next = currentNode.next;
      this.length--;

      if (this.length - 1 === idx) {
        // If the removed node was the last one, update tail to the previous node
        this.tail = prevNode;
    }

    return currentNode.value;
    // Return the value of the removed node at the specified index.
}
    }
  
    /** average(): return an average of all values in the list */
  
    average() {
      if(!this.head) {
        return null;
      }
      let currentNode = this.head;
      let sum = 0;
      let count = 0;
      while(currentNode){
        sum += currentNode.value;
        count++;
        currentNode = currentNode.next;
    }

    return sum / count;
    // Return the average of all values in the list
}
      
    
  
  
  module.exports = LinkedList;


  
 