#!/usr/bin/env gjs
print("Hello world")

// gjs 默认只在 /usr/share/gjs-1.0 和 /usr/lib/gjs-1.0 目录下寻找导入的文件
// 所以需要设置导入时搜索的目录为当前目录
// 当然也可以通过下面两种方法来设置路径
// gjs --include-path=. hello-world-module.js
// GJS_PATH=. ./hello-world-module.js
imports.searchPath.unshift('.');

var BookModule = imports.book

var book = new BookModule.Book("1234", "A good title");
book.printTitle();
book.printISBN();
