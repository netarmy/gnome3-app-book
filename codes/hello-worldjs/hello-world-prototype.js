#!/usr/bin/env gjs
print("Hello world")

var Book = function(isbn, title) {
	this.isbn = isbn;
	this.title = title;
}

Book.prototype = {
	printTitle: function(){
		print("Title is " + this.title);
	},
	printISBN: function() {
		print("ISBN is " + this.isbn);
	}
}
var book = new Book("1234", "A good title");

book.printTitle();
book.printISBN();

