#!/usr/bin/env gjs
print("Hello world")
var book = {};
print(book);
print(book.isbn);
book.isbn = "xxxx-1234-1234";
book.title = "A somewhat interesting book"
print(book);
print(book.isbn);
print(book.title);
