#!/usr/bin/env seed
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

book.__proto__ = {
	author: "Joe Random",
	printAuthor: function() {
		print("Author is " + this.author);
	}
}

book.printAuthor();

var anotherBook = new Book("4567", "A more better title");

/* 改变实现的细节
anotherBook.__proto__ = {
	printTitle: function() {
		print(this.title + " is really a good title");
	}
}
*/
anotherBook.printTitle();
anotherBook.printISBN();
anotherBook.printAuthor(); // this is invalid
