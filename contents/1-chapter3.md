# 3 编程语言 #

> 在 GNOME 3 以前，C 语言是创建 GNOME 应用程序的首选语言，之后出现了 C++，C#，Python 语言。当 GNOME 发展到版本3时，Vala 和 JavaScript 变得越来越流行了，甚至已经成为了 GNOME 的重要部分。JavaScript 已经存在很久了，人们也都早就熟知了。Vala 虽然非常新，但是编程效率高效，借鉴了 Java 和 C# 中语法，在 GNOME 应用开发中也正在受到开发者们的关注。

本章讲述两种编程语言。我们将快速了解 JavaScript 和 Vala 的基础，以确保我们有足够的知识来用这些语言开发应用程序。

在本章我们将会学到：

- 在 JavaScript 中操作数据类型
- 在 JavaScript 中控制迭代
- JavaScript 基本的面向对象编程
- 构建 JavaScript 对象
- 使用 JavaScript 原型
- 模块化 JavaScript 程序
- Vala 成员访问标示符
- Vala 的基本数据类型
- Gee 集合库

让我们从使用 Seed 来开始了解 JavaScript 。

## 用 JavaScript 来编写 GNOME 程序

目前有在 GNOME 中有两种 JavaScript 的实现，使用不同的引擎。
一个是 Gjs，基于 Mozilla 的 Spidermonkey。
一个是 Seed，基于 WebKit 的 JavaScript 核心引擎。
目前 GNOME 3 官方使用 Gjs，我们也将尽量采用 Gjs 来演示，由于原书中采用 Seed 来举例，这里我们也会保留。

### 实践环节 - Gjs / Seed 初探

现在让我们看看 Gjs 或 Seed 是怎么工作的。

1. 在 GNOME shell 中打开终端 (gnome-terminal)
2. 运行 Gjs 或 Seed

    $ gjs
    
    $ seed

3. 之后会进入提示符，Gjs 的提示符：

    gjs>

    而 Seed 的提示符：
    
    \>
    
4. 输入下面的代码，回车.

    print("Hello, world")
    
5. 将打出下面的结果。

    Hello, world

### 刚刚发生了什么？

Gjs 和 Seed 是一个解释器。我们通过这种方式运行会进入交互模式，意味着我们每输入一段指令它就会立即返回给我们结果。
我们可以输入任何 JavaScript 代码，然而你不能输入我们开发网页应用的代码。
例如：
````
console.log("Hello, world")
````
这是因为 Gjs 和 Seed 并不提供 _document_ 或 _console_ 对象。因此只支持基本的 JavaScript ，除非我们导入相应的对象。

### 大胆实践 - 亲手试一试下面的 JavaScript 代码

在交互模式下，试试下面的代码，如加法，减法和变量赋值。如：
````
var a=1
var b=2
b+a
a-b
````
你可以继续练习其它的，这只是为了了解一些基本的概念。
如果你有使用 JavaScript 的经验但有些生疏，你不防用这些来热下身。
我们也可以用它作为一个计算器。

如果我们输入一个不完整的行后回车，如：
````
var c=
````
我们将会看到如下的提示：(Gjs 和 Seed 的一个‘点’的区别)
````
..
````
这意味你需要完整的输入，否则 Gjs 或 Seed 将输出一个语法错误。

实验结束之后，你可以使用 **Ctrl + C** 来退出，返回到终端。

### 实践环节 - 用 Gjs 或 Seed 来运行程序

交互模式在实际的应用程序是无法使用的。我们现在要做的就是把代码放到一个文件中并运行它。
准备好了么？

1. 启动 _Anjuta_ 。
2. 菜单 **文件|新建 (File | New)** 创建一个新的文件 。
3. 输入下面的代码

````JavaScript
    #!/usr/bin/env gjs
    print("Hello, world")
````
        或
````
    #!/usr/bin/env seed
    print("Hello, world")
````
4. 保存文件为 _hello-world.js_ 。最好创建一个新的目录（如 _hello-worldjs_) 并把文件保存到这个目录下。

    > ✔ 在保存时弹出的对话框上，你可以点击 **创建文件夹 (Create Folder)** 按钮来创建新的目录。

5. 在菜单上单击 **运行 (Run)** 菜单，再选择 **执行(Execute)** ，弹出一个小的对话框，在 **程序 (Program)** 栏填入 _/usr/bin/gjs_ 或 _/usr/bin/seed_ ，在 **参数 (Arguments)** 栏填入 _hello-world.js_ 。 注意一定要选择 **终端运行 (Run in terminal)** 的复选框。如果保存到一个新的目录，也要设置 **工作目录 (Working Directory)** 为新的目录。

### 刚刚发生了什么？

我们称做这为脚本。通过这种方法，文件自己加载并直接用 Gjs 或 Seed 运行。这种方法类似于其它的脚本，
如 Bash, Perl 和 Python 。从第一行你可以看到我们使用了 Hashbang (#!) 来指明脚本所用的程序。
我们使用 _/usr/bin/env gjs_ 或 _/usr/bin/env seed_ ，而不是直接使用 _/usb/bin/gjs_ 或 _/usb/bin/seed_ 。
因为我们不想严格的限制 _gjs_ 或 _seed_ 的位置。使用 _env_ 系统将通过系统的路径来找到 Gjs 或 Seed 的位置。
如果我们的 _gjs_ 或 _seed_ 在 _/usr/local/bin_ 目录下，而不是在 _/usr/bin_ 下，程序仍会正常工作。

你也许会有疑问为什么我们在运行的对话框上填入了 _/usr/bin/seed_ 而不是输入 _hello-world.js_ 。
这是因为你没有为该文件设置可执行属性。通过下面的指令你可以设置可执行权限。
````
chmod +x hello-world.js
````
这之后，我们就可以直接在 **运行(Run)** 对话框上的 **程序(Program)** 栏中输入 _hello-world.js_ 。
你也许注意到在 **执行(Execute)** 的时候，不再提示对话框了。这是因为 Anjuta 认为我们已经设置程序的运行参数。
如果想要更改，从 **运行(Run)** 菜单选择 **程序参数(Program Parameters...)** 。
另外，我们也在可以在终端中直接运行程序：
````
./hello-world.js
````

## 松散类型的语言
JavaScript 是松散类型的语言，这意味着我们不用定义变量的类型为数字，字符串或数组就可以使用它。
只要简单的使用 _var_ 指令去定义变量。我们将很快发现这是怎么工作的。

### 实践环节 - 玩玩数据类型
现在让我们看下 JavaScript 的基本数据类型及如何使用。
这之后，我们才能够根据我们的需求来选择使用的类型。

1. 创建一个新文件 _hello-world-data-types.js_ 并填入如下代码：
````
#!/usr/bin/env gjs
print("Hello world")
var number = 1;
print(number);
number = number + 0.5;
print(number);
print(number.length);
number = number + " is a number? no, it is now a string";
print(number);
print(number.length);
number = (number.length == 0)
print(number);
number = undefined
print(number);
````
2. 运行
3. 输出的结果如下：（如果使用 seed 运行，输出的结果略有不同）
````
Hello world
1
1.5
undefined
1.5 is a number? no, it is now a string
39
false
undefined
````
### 刚刚发生了什么？

我们会发现两件有趣的事情。一是 JavaScript 能够自动转换数据类型。
我们能够通过赋值的方式来改变一个变量的类型。
第二，我们并不需要定义变量的类型，之前已经提到过。
在程序中我们使用 _number_ 变量，并赋值为 _1_ 。
````
var number = 1;
print(number);
````
现在 _number_ 变量是一个整数。
````
number = number + 0.5;
print(number);
````
在我们给 _number_ 加 _0.5_ 后，它转换为浮点类型。JavaScript 支持这个没有任何问题，当前 _number_ 的值是 _1.5_ 。
````
print(number.length);
````
然后我们尝试访问 _number_ 的 _.length_ 属性。因为当前的类型是数字，并没有长度，所以返回值是 _undefined_。

我们可以看到 JavaScript 有未知值的概念，也就是 _undefined_, 如果一个变量是未知值，我们不能访问它的属性，
这会让 JavaScript 认为这是一个错误。
````
number = number + " is a number? no, it is now a string";
print(number);
````
现在给 _number_ 连接一个字符串，使它变成了一个字符串。现在 _number.length_ 就在解释器中有定义了，值为39，意思是
_number_ 包含了 39 个字符。
````
number = (number.length == 0)
print(number);
````
这行代码又把 _number_ 赋了一个布尔值。因为 _number.length_ 不是 _0_ ，表达式 _(number.length == 0)_
返回 _false_ ，也就是 _0_ 。 如果返回的 _true_ ，值就是 _1_ 。
````
number = undefined
print(number);
````
现在给 _number_ 赋值为 _undefined_ ，这是一个保留字，因此我们可以用它赋值。

很有趣，是吧？

### 小测试 - 现在的值是什么？
Q1. 在完成了之前所有的任务之后，在代码运行的最后，_number.length_ 的值是多少？
（记得我们在给 _number_ 赋值为字符串后它的长度是 39 ）

1. _0_ ，因为我们给 _number_ 赋值为 _undefined_ 。
2. _undefined_ ， 因为我们给 _number_ 赋值为 _undefined_ 。
3. JavaScript 将认为这是一个错误，因为我们尝试访问一个 _undefined_ 的变量的长度 _.length_ 。

## 使用迭代
在编程，我们总会需要重复的运行一段代码。我们通过迭代来完成这个工作（也叫循环）
这在 JavaScript 十分容易。

### 实践环节 - 使用迭代
按下面的步骤来：

1. 创建一个新文件 _hello-world-iteration.js_ ，然后填入下面的代码：
````
#!/usr/bin/env gjs

print("Hello, world")
for (var i = 0; i < 10; i ++) {
	print("Iteration number #" + i);
}
````
2. 运行

3. 我们可以看到输出了10次结果。
````
Hello, world
Iteration number #0
Iteration number #1
Iteration number #2
Iteration number #3
Iteration number #4
Iteration number #5
Iteration number #6
Iteration number #7
Iteration number #8
Iteration number #9
````
### 刚刚发生了什么？
在这段代码里，我们让 JavaScript 使用 _for_ 循环做 _10_ 次迭代操作，从 _0_ 开始，不是 _1_ ，每次迭代我们
给 _i_ 加 _1_ （在 _for_ 循环中的 _i++_ 表达式意味着每次给 _i_ 加 _1_ ），循环在 _i_ 到 _10_ 之后将会退出。
循环最后 _i_ 的值是 _10_ , 因为不小于 _10_，所以结束循环。因此输出的结果
中显示的是从 _0_ 到 _9_, 而不是 _10_.

### 大胆实践 - 倒数
我们已经完成了累加，那么如何倒数呢？

### 实践环节 - 使用数组
让我们把数组想像成一堆盒子，每个里面装了一个同类型的数据。下面就把这堆盒子填满。

1. 创建 _hello-world-array.js_ ，并输入下面的代码
````
#!/usr/bin/env gjs
print("Hello world")
var boxes = []
for (var i = 0; i < 10; i ++) {
	boxes[i] = i * 2;
}
for (i = 0; i < boxes.length; i ++) {
	print("Box content #" + i + " is " + boxes[i])
}
````
2. 运行。
3. 我们将看到下面的从 _0_ 到 _9_ 号箱子中放了些什么。
````
Hello world
Box content #0 is 0
Box content #1 is 2
Box content #2 is 4
Box content #3 is 6
Box content #4 is 8
Box content #5 is 10
Box content #6 is 12
Box content #7 is 14
Box content #8 is 16
Box content #9 is 18
````
### 刚刚发生了什么？

首先我们定义 _boxes_ 为数组类型：
````
var boxes = []
````
你也许注意我们没有设置数据的大小，其实我们只用知道这个是数组就足够了，让 JavaScript 来处理吧。
这是因为任何时候我们编辑它的内容时，数组自身可以自动缩小或增大。
接下来我们往盒子数组里填充数据：
````
for (var i = 0; i < 10; i ++) {
	boxes[i] = i * 2;
}
````
我们给每一个盒子赋了一个索引值的2倍的值。
我们只直接按索引来给盒子赋值，而不像 C 语言那样需要提前分配。
真心简单啊！然后我们打印出数组的内容：
````
for (i = 0; i < boxes.length; i ++) {
	print("Box content #" + i + " is " + boxes[i])
}
````
数组的长度可以从对象的 _length_ 变量来获取，本例中使用 _boxes.length_ 就可以获取长度。
无论数组怎么变化，它的长度都会自动调整。

### 大胆实践 - 随便往数组里放些东东
在前面的部分我们往盒子里填入了数字，那么填入其它的类型会怎么样呢？
你可以试试在盒子中填入字符串, 甚至字符串和数字的混和也是可以的。感到惊喜没？

## JavaScript 面象对象的编程 (OOP)
如果你已经熟悉面向对象的编程，那么你要准备好 JavaScript 中的 OOP 有些限制并不像通常的 OOP。
这是因为 JavaScript 本身并不是一个全面象对象的语言。
我们所需要做的就是在已有的限制内使用 OOP。

### 实践环节 - 使用 JavaScript 对象
到该尝尝肉的时候了，这就试试 JavaScript 对象。
我们将在本书中使用大量的对象，先从一个简单的例子开始。

1. 创建 hello-world-object.js ，并输入下面的代码：
````
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
````
2. 运行。
3. 看看结果：
````
Hello world
[object Object]
undefined
[object Object]
xxxx-1234-1234
A somewhat interesting book
````
### 刚刚发生了什么？
与其它数据类型一样，我们可以很容易地给一个变量赋一个对象值。
````
var book = {};
````
这行我们定义 _book_ 为一个空的对象。用大括号来初始化对象，这是对象最简单的形式。
````
print(book);
````
这行打印出 _[object Object]_ ， 意思是这是一个 _Object_ 类型的对象。
````
print(book.isbn);
````
我们试图访问对象的 _.isbn_ 属性，但是没有值，初始化为 _undefined_ 。
````
book.isbn = "xxxx-1234-1234";
book.title = "A somewhat interesting book"
````
这两行代码给对象的属性赋些值。我们可以随意在对象内放任何东东，我们不用初始化或在使用前声明它。
````
print(book);
````
再次打印变量 _book_ ，它仍将返回 _Object_ 类型的对象。
````
print(book.isbn);
print(book.title);
````
目前情况已经改变，因为已经赋值了，_isbn_ 和 _title_ 能够被打印出来了。

### 能力越大责任也越大
你也许已经注意到在 JavaScript 中我们可以对数据类型做任何事情，由此我们必须检查代码的正确性。
随着代码的增长，最后你会发现很难找到错误的位置，JavaScript 的松散编程将最终导致灾难。

因为 JavaScript 区分大小写，这将对跟踪错误增加了难度。
假设在我们的代码中有下面一行：
````
book.authorFirstName = "Random Joe"
````
然后，在其它部分，我们编辑了这个变量：
````
book.authorFirstname = "Another Joe"
````
JavaScript 将不会有任何提示因为我们可以随意的设置对象内的东东。
我们有责任检查这种错误，两遍甚至三遍，以致于我们不会有前面的错误。
到现在，你对我们提到的 bug 明白了么？

### 大胆实践 - 给对象赋值的另一个方法
按下面的方法编辑前面的代码，看看结果怎么样。
````
var book = {
	isbn:"xxxx-1234-1234",
	title:"A somewhat interesting book"
}
````
我们以一个新的方式来定义 book 对象内 ISBN 和标题。我们使用冒号而不是等号，在不同的变量间使用逗号。
这个就是所谓的 **JSON (JavaScript 对象标记法)** 。
## 构建对象
在使用了最简单的 JavaScript 对象后，我们将再试一下复杂点的对象。

### 实践环节 - 构造函数
当我们提到构建一个对象，就是指调用一个特殊的函数 **constructor** 。下面让我们来试一下。

1. 创建一个 hello-world-constructor.js 文件，输入下面的代码：
````
#!/usr/bin/env gjs
print("Hello world")

var Book = function(isbn, title) {
	this.isbn = isbn;
	this.title = title;
}

var book = new Book("1234", "A good title");
print(book.isbn);
print(book.title);
````
2. 运行。
3. 看看结果：
````
Hello world
1234
A good title
````
### 刚刚发生了什么？
这与我们前面介绍的代码相类似，不同的是现在我们定义了一个类，然后实例化为一个对象。
````
var Book = function(isbn, title) {
	this.isbn = isbn;
	this.title = title;
}
````
这是 _Book_ 类的构造函数，我们把构造函数的参数 _isbn_ 赋值给 _.isbn_ 属性，对 _.title_ 属性也是一样。
````
var book = new Book("1234", "A good title");
````
我们创建了一个叫 _book_ 的变量（注意我们用的小写！)，通过参数把 _Book_ 类实例化。
````
print(book.isbn);
print(book.title);
````
现在我们可以看见 _.isbn_ 和 _.title_ 已经被打印出来了。

## 类和对象
在上面的代码里类只是一个定义, 比如 _var Book = function(..) {...}_ ，
它仍不是一个对象直到我们在后面用 _new_ 操作符实例化。
当它变成一个对象，我们叫类的实例。而在这之前我们直接使用大括号来实例化，而没有使用任何类的定义。

按惯例，我们使用驼峰字来定义类名，即第一个词的首字母大写，如 _Book_ 。
对比之下，对象的实例或变量，首字母的第一个词使用小写，如 _book_ 。

### 小测试 - 你能分辨出类和对象的区别吗？
看一下下面的代码：
````
var Circle = function(radiusInPixel) {
	this.radius = radiusInPixel
}

var circle = new Circle(100);
````
Q1. circle 和 Circle 都代表什么？下面哪句话正确？

1. _Circle_ 是一个类，因为它有定义，_circle_ 是一个对象，从一个 _Circle_ 类实例。
2. _circle_ 是一个对象，因为它有定义，_Circle_ 是 _circle_ 对象的一个实例。

## 使用原型 (prototypes)
In OOP, we can have methods or functions attached to an object. This means that the
function is specific to a particular object in memory. If we call a function in one object, it
does not interfere with another object of the same type that also has the same function.
In JavaScript we use prototypes to achieve this feature.

在面向对象编程中，我们可以给一个对象添加更多的方法或函数。这意味着函数在内存中是一个特殊的对象。
如果我们调用一个对象中的函数，它并不会妨碍另一个对象中相同名字的函数。
在 JavaScript 中我们使用原型来添加函数。

### 实践环节 - 添加原型
让我们在之前的 _Book_ 类中添加一些方法。我们使用 _prototype_ 对象来定义它们。

1. 创建一个新的文件 _hello-world-prototype.js_ ，输入下面的代码：
````
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
````
2. 运行。
3. 结果如下：
````
Hello world
Title is A good title
ISBN is 1234
````
### 刚刚发生了什么？
在 JavaScript  对象，_prototype_ 是一个特殊的对象，它拥有一个类或对象内部的所有属性和函数。
因此我们所做的就是往 _prototype_ 中添加我们自己的函数。
````
var Book = function(isbn, title) {
	this.isbn = isbn;
	this.title = title;
}
````
从上面可以看到，构造函数与前面的一样。
````
Book.prototype = {
````
然后，定义 _prototype_ ，加入我们自己的方法。
````
printTitle: function(){
	print("Title is " + this.title);
},
````
这是我们添加的第一个方法。
````
printISBN: function() {
	print("ISBN is " + this.isbn);
}
````
> ✔ 我们使用冒号而不是等号来定义一个函数，在函数结束时使用逗号，意味着还将定义另一个函数或成员。
还记得我们之前定义 _book_ 对象时使用什么方式了么？

接着，添加第二个方法，注意结束后大括号后边没有逗号。
````
var book = new Book("1234", "A good title");
````
在这之后，定义了 _book_ 变量，并以特定的参数构建一个 _Book_ 对象赋值给它。
````
book.printTitle();
book.printISBN();
````
最后，我们调用这些方法（注意方法名字后面要接小括号）。

### 大胆实践 - 添加更多的方法
为什么不再添加些方法呢？我们还需要下面的方法：

- _getISBN()_ , 将返回 _isbn_ 的值
- _getTitle()_ , 将返回书名

> ✔ 注意不要忘记冒号和逗号！

### 实践环节 - 编辑一个对象的 prototype
就像前面提到的，我们可以直接在一个对象的 _prototype_ 中添加一些东东，而不是在类中添加。
我们不会每天都做这些基本的事情，在此我们还是了解一下，这些迟早都会派上用场的。
想象一下我们如何在运行的时候用另一个函数代替在 prototype 中已经定义的函数！

1. 创建 _hello-world-proto.js_ ，输入下面的代码：
````JavaScript
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

anotherBook.printTitle();
anotherBook.printISBN();
anotherBook.printAuthor(); // this is invalid
````
2. 运行。
3. 看看结果你会发现这段代码能够打印第一本书的作者，但打印第二本书的作者时会失败。
````
Hello world
Title is A good title
ISBN is 1234
Author is Joe Random
Title is A more better title
ISBN is 4567

(gjs:3476): Gjs-WARNING **: JS ERROR: TypeError: anotherBook.printAuthor is not a function
@./hello-world-proto.js:37

JS_EvaluateScript() failed
````
用 Seed 运行后的结果略有不同，只需要把第一行的 _gjs_ 更改为 _seed_ 。
````
Hello world
Title is A good title
ISBN is 1234
Author is Joe Random
Title is A more better title
ISBN is 4567

** (seed:3507): CRITICAL **: Line 36 in ./hello-world-proto.js: TypeError undefined is not a function (evaluating 'anotherBook.printAuthor()')

Stack:
global code@./hello-world-proto.js:36:24
````
### 刚刚发生了什么？
为了在运行时编辑 _prototype_ ，我们需要知道些小技巧。
这时 _prototype_ 属性不再能被访问了，我们需要使用 __proto__ 。
在下面这行，我们先实例化一个 _book_ 对象。
````
var book = new Book("1234", "A good title");
````
接着，我们通过 __proto__ 在 _prototype_ 中加入了两个属性。
````
book.__proto__ = {
	author: "Joe Random",
	printAuthor: function() {
		print("Author is " + this.author);
	}
}
````
然后，我们立即调用它。
````
book.printAuthor();
````
然而，我们另一个实例并不具有这个属性。你知道为什么吧？
因为我们只编辑了 _book_ 对象，这不会影响另一个 _anotherBook_ 对象。
````
var anotherBook = new Book("4567", "A more better title");
anotherBook.printAuthor(); // this is invalid
````
### 小测试 - 如何让 _printAuthor()_ 都可以用？
Q1. 为了给所有从 _Book_ 类创建的对象添加中 _printAuthor_ 方法，下面哪个方式更好些？

1. 在每一个创建的对象的 __proto__ 中添加 _printAuthor_ ，之后所有的对象中都可以使用这个函数。
2. 在 _Book_ 类的 _prototype_ 中添加 _printAuthor_ ，然后从 _Book_ 创建的所有对象中都可以使用这个函数。

### 大胆实践 - 改变实现的细节
假设我们准备使用 _anotherBook_ 对象定义一本特殊的书。我们想在 _printTitle_ 中打印出的 "<book-title> is really good title" 。
其中 <book-title> 是书的标题。

> ✔ 重新定义在 anotherBook 对象的 __proto__ 中的函数即可。

## 模块化

Imagine that we implemented a big project and we put it inside a single script. That would
be a nightmare as it would be very difficult to debug. Hence, we should discuss this now,
before our code gets bigger.
想象一下我们在一个单独的脚本中实现一个特别大的项目，这对调试来说是一个恶梦。因此在我们代码变得越来越大之前有必要介绍一下。

Time for action – modularizing our program
### 实践环节 - 把程序模块化
Now we are going to modularize our software.
现在我们将把程序模块化
1.	Let's create a new file called hello-world-module.js and fill it with this:
创建 hello-world-module.js ，写入下面的代码：
````
#!/usr/bin/env seed
print("Hello world")
var BookModule = imports.book
var book = new BookModule.Book("1234", "A good title");
book.printTitle();
book.printISBN();
````
2.	Create another new script called book.js and fill it with this:
创建 book.js 脚本，定入下面的代码：
````
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
````
3.	Then run hello-world-module.js (not book.js ).
3. 然后运行 hello-world-module.js ，不是 book.js 。
4.	See the printouts.
4. 看看运行的结果。

### 刚刚发生了什么？

From the output, we can see that it is exactly the same as the previous code. But here we
split the code into two files.
从输出我们可以看到各前面代码运行的结果一样，但是我们分成了两个脚本文件。
var BookModule = imports.book
var book = new BookModule.Book("1234", "A good title");

Here, we ask Seed to attach the BookModule variable with the evaluation of book with the
imports command. Here it is expected that we have book.js inside our current directory.
With this, all objects in book.js are accessible from the BookModule variable. Hence, we
construct the book object with the previous line.
我们让 Seed 用 imports 命令给 BookModule 赋值为 book 。
它会想找当前目录下的 book.js ，在 book.js 中的所有对象都可以从 BookModule 变量访问到。
这样，在前面的代码中我们可以构建 book 对象。

Also note that, in book.js , we no longer have the hashbang line. This is not required because
we don't use book.js as our entry point, but rather we use hello-world-module.js .
你也会注意到在 book.js 中我们没有 hashbang 行，因为我们不用 book.js 作为我们的入口，所以就不需要。
但 hello-world-module.js 中还是需要的。

With this approach, we can lay out our objects in files and import them whenever necessary.
This not only makes the memory usage efficient but also keeps the code structure clean.
This concludes our quick introduction to JavaScript as a GNOME application development
programming language. Now let's move on to Vala.
用这种方法，我们可以把所有的对象按文件来存放，在需要的时候导入即可。
这不但能高效的使用内存，也能保持代码结构清晰。
至此我们将结束对 GNOME 应用程序开发语言 JavaScript 的介绍，接下来让我们看看 Vala 。

Getting to know Vala
## 了解 Vala
When compared to JavaScript, Vala is fairly new and is the only language being used
in GNOME development since its conception. It has quite an interesting concept: the
programmers are exposed to C# and Java-like syntax, but underneath, the code will be
translated into pure C and then compiled to binary.
和 JavaScript 比起来，Vala 是一个相当新的语言，从诞生后目前只在 GNOME 开发中使用。
它有一个十分有趣的概念：程序员可以使用 C# 和 Java 类的语法，之后代码被转换成纯 C ，
然后编译成二进制文件。

This approach will make GNOME programming more accessible, because developing a
GNOME application with C is quite hard to understand for beginners. It involves many
boilerplate code snippets that you must copy and paste into your source code tree and
then modify according to the guidelines. This step is totally hidden by Vala.
Similar to our adventure with JavaScript, we will now learn the basics of the Vala language
without implementing any graphical elements. As Vala is a full-blown object-oriented
programming language, we will immediately use the OOP concept in our journey with Vala.
这个方法让 GNOME 编程更容易，因为对初学者用 C 语言来编写 GNOME 程序很不容易理解。
它涉及到许多公式化的代码段，你需要复制粘贴到你的代码树并按手册来修改它。
这些细节都被 Vala 隐藏了。
与我们讲述 JavaScript 时一样，我们现在学习一些 Vala 编程语言的基础，并会在 Vala 语言中立即使用面向对象的概念。
Let's now prepare a project that will be used as our experiment. Remember the steps from
Chapter 2, Preparing Our Weapons? Good! Let's do it again with some changes. We will use
hello-vala as the project name.
先让我们准备一个用于实验的工程。
记得第二章中的准备我们的武器？好！让我们对此做些修改。我们将使用 hello-vala 作为项目的名称。
[IMAGE]

In the preceding screenshot, we can see in Project options that we choose No license to
minimize modifications that we are going to do next. We also uncheck the Use GtkBuilder
for user interface option because we want to do a simple text-based application to grasp
the essentials of Vala.
在上面的截图中，我们在 'Project options' 中选择 'No license'， 让我们接下来所做的修改最小化。
也不选择 'Use GtkBuilder for user interface' 选项，因为我们先做一个简单的基于文本的应用程序来了解一下 Vala 的内在。

Time for action – entry point to our program
### 实践环节 - 程序的入口点
We are now going to replace all the generated code with our own so that we understand
what makes an application from the ground up.
我们将用我们自己的代码来代替所有自动生成的代码，这样我们就可以了解一个程序是如何从头开始产生的。
1.	Edit the generated hello_vala.vala file and fill it with this:
1. 编辑 hello_vala.vala 文件，并写入下面的代码：
````
using GLib;
public class Main : Object
{
	public Main ()
	{
	}
	static int main (string[] args)
	{
		stdout.printf ("Hello, world\n");
		return 0;
	}
}
````
2.	Click on the Run menu and choose Execute.
2. 点击 'Run' 菜单中的 'Execute'。
3.	See the text that is printed:
3. 看下输出的结果：
````
Hello, world
````
### 刚刚发生了什么？

Here we start by looking at the Book class.
下面让我们看一下 Book 类。 (TBD)
````
using GLib;
````
This line says that we are using the GLib namespace.
这行说明我们使用 GLib 的命名空间。
````
public class Main : Object

````
This is the definition of the Main class. It is stated here that it is derived from the
GLib.Object class. We don't put the full name GLib.Object but only Object
because we already stated in the first line that we are using the GLib namespace.
这行是 Main 类的定义。它是从 GLib.Object 类派生出来的。我们没有使用全名 GLib.Object 面只
使用了 Object 是因为我们已经在第一行中使用 GLib 命名空间了。
````
public Main ()
{
}
````
The preceding structure is the constructor of the class. Here we have an empty one.
我们定义了类的构建函数，它为空。
````
static int main (string[] args)
{
	stdout.printf ("Hello, world\n");
	return 0;
}
}
````
This is our entry point to the program. If declared as static, the main function will be
considered as the first function that will be run in the application. Without this function,
we can't run the application.
这是程序的入口点。如果我们定义为静态 static ，这个 main 函数将被作为程序运行的第一个函数。
没有这个函数我们无法运行程序。
And one more thing; there must be one and only one static main function, otherwise your
program will not compile.
还有一件事需要注意，这必需只有一个静态 main 函数，否则你的程序将会编译失败。

Have a go hero – look at the generated C code
### 大胆实践 - 看看产生的 C 代码
Now we should have the generated C code available in the src/ directory. Navigate the
filesystem using the Files dock and find hello_vala.c . Let's open it and see how Vala
transforms the Vala code into C code.
现在我们在 src/ 目录下已经生成了 C 代码。使用文件浏览器找到 hello_vala.c ，看看 Vala 是如何把 Vala 代码
转换为 C 代码的。
We can modify the C code, but your changes will be overwritten whenever you change the
Vala code, and the C code will get regenerated.
我们可以修改 C 代码，但是当我们更改 Vala 代码后所有的改动都会被覆盖，因为 C 代码再一次被重新生成了。

Member access specifier
成员访问符
Vala defines a set of member access specifiers, which we can use to define which member of
the class can be accessed by another class or by its inheriting classes. This idiom provides us
a way to make a clean set of application programming interfaces (API), which is easy to use.
Vala 定义了一系列的成员访问符，我们可以使用它来定义哪些类的成员可以被另一个类或继承类访问。
这些惯用语法提供给我们一系列的应用程序开发接口(API)，用起来也非常容易。
Time for action – defining member access
### 实践环节 - 定义成员的访问
Let's take a look at how to specify the access to our class member.
让我们看一下如何指定访问类中的成员。
1.	Create a new file and save it as book.vala inside the src/ directory. Fill it with this:
1. 创建新的文件保存到 src/ 目录下的 book.vala ，写入下面的代码：
````
using GLib;
public class Book : Object {
	private string title;
	private string isbn;
	public Book(string isbn, string title) {
		this.isbn = isbn;
		this.title = title;
	}
	public void printISBN() {
		stdout.printf("%s\n", isbn);
	}
	public void printTitle() {
		stdout.printf("%s\n", title);
	}
}
````
2.	 We need to add this to the project. Click on the Project menu and choose
Add Source File....
2. 我们添加这个到项目中，点出 'Project' 菜单，选择 'Add Source File...'。
3.	 In the next dialog, click on the Target option, find hello_vala inside src/ ,
and then, in the file selection box below it, choose book.vala .
3. 在出现的对话框中点击 'Target' 选项，在 src/ 下找到 hello_vala ， 然后在文件选择框选择 book.vala 。

4.	 Modify the main function of hello_vala.vala to look like this:
4. 按下面来修改 hello_vala.vala 的 main 函数：
````
using GLib;
public class Main : Object
{
	public Main ()
	{
		var book = new Book("1234", "A new book");
		book.printISBN ();
	}
	static int main (string[] args)
	{
		stdout.printf ("Hello, world\n");
		var main = new Main();
		return 0;
	}
}
````
5.	Run it.
5. 运行
6.	Note that the program cannot be built.
6. 注意程序还不能够被编译。
[IMAGE]

### 刚刚发生了什么？

From the error message, we see that it rejects our access to call Book.printISBN
(we read this dot notation as the printISBN member from the Book class).
从错误信息看，调用 Book.printISBN 时被拒绝了（我们使用点来访问 Book 类中的 printISBN 成员）。
var book = new Book("1234", "A new book");
book.printISBN ();

This is what we have in the Main class constructor. There we instantiate Book into the book
variable, and call printISBN there.
这是我们在 Main 类构建函数中的代码，我们把 Book 实例化并赋给 book 变量，然后调用 printISBN 。
````
void printISBN() {
    stdout.printf(isbn);
}
````
However, this is what we have in the Book class. It looks innocent, but it turns out that we
missed something crucial that makes this function inaccessible from outside the class.
然而在 Book 类的代码，看起来没什么问题，但从结果证明它缺少一些关键的东西来让它可以从类外面访问。

The access specifiers
### 访问指示符
Here is a list of access specifiers that are recognized by Vala:
在 Vala 中可以使用的访问指示符列表：
  private : The access is limited within the class or struct.
private : 访问被限制在类或结构内。
  public : The access is unlimited
public : 访问没有限制。
  protected : The access is limited within the class and any class that inherits from the class
protected : 访问被限制在类内和任何从它派生的类。
 
internal : The access is limited within the classes inside the package
internal : 访问被限制在 package 中所有的类。

When we don't specify anything, the access is set to private by default. That is why our
program cannot be built.
当我们不指定任何类型时，访问权限被缺省的设置为 private 。这也是为什么程序编译失败的原因。

Pop quiz – how to fix this?
### 小测试 - 如何解决呢？
As mentioned previously, we don't put any specifiers in front of the printISBN function,
so it is considered private. We can fix this by putting the correct access specifier in the
printISBN function.
因此就像前面提到的，我们没有在 printISBN 函数前面添加任何指示符，这个函数被看作为私有的。
我们在 printISBN 函数前面添加正确的指示符就可以了。

Q1. Which specifier from the following options do you think is correct?
Q1. 你认为下面哪个指示符是正确的？
1.	 public , because we want to access it from Main class which is outside the Book class.
1. public ，因为我们想从 Book 类外的 Main 类中访问它。
2.	 None; we just need to fix how we call printISBN in the Main constructor.  
2. None ，我们需要更改在 Main 构造函数调用 printISBN 的方式。

Basic data types
基本数据类型

Let's now move on, learning the basic data types available in Vala, meaning that we will take
a look at how to interact with strings, numbers, and Boolean.
让我们继续学习在 Vala 中可用的基本数据类型，也就是说看看如何使用字符串，数字和布尔值。

Time for action – experiment with data types
### 实践环节 - 数据类型实验
We will now create an imaginary BookStore program to explore the data types in Vala.
我们现在通过创建一个想象中的书店 (BookStore) 程序来了解 Vala 的数据类型。
1.	Create a new file called bookstore.vala and put it in src/ . Fill it with these lines:
1. 创建一个 bookstore.vala 的文件，保存到 src/ 目录下，写入下面的代码：
````
using GLib;
public class BookStore {
	private Book book;
	private double price = 0.0;
	private int stock = 0;
	public BookStore (Book book, double price, int stock) {
		this.book = book;
		this.price = price;
		this.stock = stock;
	}
	public int getStock() {
		return stock;
	}
	public void removeStock(int amount) {
		stock = stock - amount;
	}
	public void addStock(int amount) {
		stock = stock + amount;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public bool isAvailable() {
		return (stock > 0);
	}
}
````
2.	Add this file to our project.
2. 把这个文件添加到工程里。
3.	Modify our Main class to look like this:
3. 按下面来编辑我们的 Main 类：
````
using GLib;
public class Main : Object
{
	public Main ()
	{
		var book = new Book("1234", "A new book");
		book.printISBN ();
		var store = new BookStore(book, 4.2, 10);
		stdout.printf ("Initial stock is %d\n", store.getStock());
		stdout.printf ("Initial price is $ %f\n", store.getPrice());
		store.removeStock(4);
		store.setPrice(5.0);
		stdout.printf ("Stock is %d\n", store.getStock());
		stdout.printf ("and price is now $ %f\n", store.getPrice());
		var status = "still available";
		if (store.isAvailable() == false) {
			status = "not available";
		}
		stdout.printf ("And the book is %s\n", status);
	}
	static int main (string[] args)
	{
		stdout.printf ("Hello, world\n");
		var main = new Main();
		return 0;
	}
}
````
4.	Run it.
4. 运行
5.	See how the data is manipulated and printed:
5. 看看数据是怎么处理和输出的：
````
Hello, world
1234
Initial stock is 10
Initial price is $ 4.200000
Stock is 6
and price is now $ 5.000000
And the book is still available
````
### 刚刚发生了什么？

Let's start analyzing from the calling code, the Main constructor.
让我们从 Main 构造函数开始分析。
````
var store = new BookStore(book, 4.2, 10);
````
Here, we instantiate a new store object from the BookStore class. We initialize it with
a book object, a floating point number, and an integer.
我们从 BookStore 类实例化一个新的 store 对象，并用一个 book 对象，一个浮点数字和一个整数来做为参数。
````
public BookStore (Book book, double price, int stock) {
````
In the BookStore constructor, we have to specify the data types in the argument list as
previously done. Then we say that we want to accept a Book object, a number in double
precision, and an integer.
在 BookStore 的构造函数里，我们必须在参数列表中指定数据的类型，也就是说我们想要接受一个 Book 对象，
一个浮点型的数字和一个整数。
````
this.book = book;
this.price = price;
this.stock = stock;
````
And then, we assign our private members of book , price , and stock with the arguments.
Here we use this. to denote that we want to assign the book member from the private
member with the book member from the argument. If we name our argument variable
with a different name, for example, bookObject , we can omit this because it is no longer
ambiguous; we know that bookObject must be coming from the argument list and not
from our member. The same happens with price and stock .
然后，我们把参数赋值给私有成员 book, price 和 stock 。在这我们使用 this. 来区分开参数中的 book 和私有的 book 成员。
如果我们把参数变量改一个名字，如 bookObject ，那么我们就不用使用 this 了，因为不会造成歧义了。
我们知道 bookObject 来自参数列表而不是我们的成员。 对 price 和 stock 也一样。

stdout.printf ("Initial stock is %d\n", store.getStock());
This is how we print an integer with printf . We use %d as a placeholder for an integer.
这行用 printf 来打印一个整数，使用 %d 作为一个整数的点位符。

stdout.printf ("Initial price is $ %f\n", store.getPrice());
And this is how we print a real number with printf. We use %f as a placeholder for it.
这行用 printf 来打印一个实数，使用 %f 作为它的点位符。
````
store.removeStock(4);
Then, we remove 4 books from the stock. Internally, this is defined in BookStore.
然后，我们从仓库中删除 4 本书，这在 BookStore 中有定义。
removeStock , as follows:
removeStock , 如下：
stock = stock - amount;

There we just subtract using a mathematical expression because it is simply an integer.
这是一个减法表达式。
````
var status = "still available";
if (store.isAvailable() == false) {
    status = "not available";
}
````
Next, we have a Boolean expression evaluation. If the value is false , we change the value
of status . The type for status is string , and we can just assign the value.
接下来，我们使用一个布尔表达式。如果值为 false ，我们更改 status 的值。status 的类型为字符串，可以直接赋值。
````
stdout.printf ("And the book is %s\n", status);
````
Finally, we use %s as a placeholder in printf to put our string value there.
最后我们使用 %s 做为输出字符串的点位符。

Gee, what is it?
### Gee 是什么？

Gee is a collection library written in Vala. The basic types of the collection are list, set,
and maps. These are similar to array but with more powerful features.
Gee 是 Vala 中一个集合的库。集合的基本类型有 list, set 和 maps 。
这些与数组类似，但功能更强大些。

Time for action – adding the Gee library
### 实践环节 - 添加 Gee 库
Let's take a look at Gee more closely. But first, let's try adding it to our project:
让我们看下 Gee ，但首先需要把它加入到项目中：
1.	Click on the Project menu and choose Add Library....
1. 选择 Project 菜单中的 Add Library....
2.	In Select the target for the library, find hello_vala under src/ .
2. 在 Select the target for the library 中，在 src/ 目录下找到 hello_vala 。
3.	Then click on the New library... button.
3. 点击 New library... 按钮。
4.	Find gee from the list and check it in the Module option at the bottom of the dialog,
and then find HELLO_VALA. This means that we add Gee into the C compilation
step. Under the hood, this step modifies the configure.ac file to add Gee
into the build system.
4. 从列表中选择 gee 并在对话框的底部检查下 Module 选项，然后找到 HELLO_VALA 。
这是我们添加 Gee 到 C 编译环境的步骤。同时也会编辑 configure.ac 文件，添加 Gee 到编译系统中。

5.	Then, from the Files dock, find Makefile.am in the src/ directory and open it.
Find the hello_vala_VALAFLAGS stanza and modify it to look like this:
5. 然后，从文件浏览器在 src/ 目录下找到 Makefile.am 并打开它。
找到 hello_vala_VALAFLAGS 的部分，按下面来编辑它：
hello_vala_VALAFLAGS =
--pkg gtk+-3.0 \
--pkg gee-1.0
\
6.	 Then, save and close the Makefile.am file. This step means that we add Gee into
the Vala compilation step.
6. 然后，保存并关闭 Makefile.am 文件。这时我们已经添加 Gee 到 Vala 编译环境中了。

7.	 Then click on Build and choose Clean Project. This would clean the project from all
the generated code and scripts prepared by the build system to make sure we pick
up changes that we made in Makefile.am and configure.ac .
7. 然后点击 Build 菜单选择 'Clean Project' 。这将清理产生的所有代码和脚本，来保证我们能够使用
最新的 Makefile.am 和 configure.ac 来编译。
8.	 Try running our previous code again. There should be no error anymore.
8. 运行之前的代码，现在不应该再有错误了。

### 刚刚发生了什么？

We just added Gee into the project. Anjuta support for Vala is not yet perfect as we need to
perform two actions (as we just did) to add a library into a project, one for C compilation and
another for Vala compilation. Without these two steps, our program cannot be built because
either Vala would not recognize the Gee namespace or the C compiler would not find the
Gee header files and library.

Time for action – Gee in action
### 实践环节 - 
After installing Gee in our project, let's quickly check what capabilities Gee has to offer. Let's
start from the simple ones, the array list.
1.	Modify our book.vala file to look like this:
编辑 book.vala 文件：
````
using GLib;
using Gee;
public class Book : Object {
	private string title;
	private string isbn;
	private ArrayList<string> authors;
	public Book(string isbn, string title) {
		this.isbn = isbn;
		this.title = title;
		authors = new ArrayList<string>();
	}
	public void addAuthor(string author) {
		authors.add(author);
	}
	public void printISBN() {
		stdout.printf("%s\n", isbn);
	}
	public void printTitle() {
		stdout.printf("%s\n", title);
	}
	public void printAuthors() {
		foreach (var author in authors) {
			stdout.printf("Author name: %s\n", author);
		}
	}
}
````
2.	Modify the Main class constructor to include these lines:
2. 编辑 Main 类的构造函数并加入下面这些行：
var book = new Book("1234", "A new book");
book.printISBN ();
book.addAuthor("Joe Random");
book.addAuthor("Joe Random Jr.");
book.printAuthors();
3.	Run it.
3. 运行
4.	See that it prints all of the authors of the book.
看看结果，它会打印书的所有作者。
````
Hello, world
1234
Author name: Joe Random
Author name: Joe Random Jr.
Initial stock is 10
Initial price is $ 4.200000
Stock is 6
and price is now $ 5.000000
And the book is still available
````
### 刚刚发生了什么？

Here we try to utilize the array list, which is one of many collection data structures provided
by Gee.

using Gee;

In order to use Gee, first we declare that we are using the Gee namespace.
We can actually omit this, but we need to always put the
Gee. prefix in front of all Gee classes.
Now look at the member declaration in the Book class:
````
public class Book : Object {
	private string title;
	private string isbn;
	private ArrayList<string> authors;
````
The construct with angle brackets is called generics programming. This means that the data
contained in the data structure (which is ArrayList in this context) is generic. If we have an
array of type integer, we will put it as ArrayList<int> , and so on. Hence, in this particular
line, we have ArrayList , which has content with type string , and we call the list with the
name authors . In the constructor, we have to initialize the array list with this syntax:
````
public Book(string isbn, string title) {
	this.isbn = isbn;
	this.title = title;
	authors = new ArrayList<string>();
}
````
It means that we need to allocate an ArrayList object, which has content of type string .
Note that only a declaration is not enough. If we forget this part, the program will crash.

public void addAuthor(string author) {
	authors.add(author);
}
Here, we use an add function, which is provided by the ArrayList class. As the name
suggests, it will add the data into the array list; note that it can only accept string because
we declare and initialize it with string content.

public void printAuthors() {
	foreach (var author in authors) {
		stdout.printf("Author name: %s\n", author);
	}
}
}

Here we iterate the content of the array list. We use the foreach command to iterate while
assigning the value obtained on each iteration to the author variable. Note that we use
the var author in authors expression. We don't specify the author variable to be
string , but instead we use an automatic variable construction with the var keyword. In
this line, var will get assigned a type depending on the content of the authors variable.
Because the authors content type is string , the author variable bound to the var
keyword will be also string . This kind of construction is really useful if we generalize a
class to be able to handle any kind of data types depending on the data type stored in the
collection or data structure.
Initializing members when declaring
In our previous code, we initialize the array list in the constructor. Another alternative is to
initialize it while declaring in the declaration area, without initializing it in the constructor.
We can do it like this:
private ArrayList<string> authors = new ArrayList<string>();
When your code grows and you have more than one constructor, this alternative is better
than initializing in the constructor because you must copy all of the initialization code to
all constructors.
Time for action – watching for signals
### 实践环节 - 
Vala has a construct for emitting and watching signals, which is a mechanism of subscribing
to information when something happens in the code. We can subscribe to a signal by
connecting the function that will perform some action into the signal. Let's see how it works.

1.	Modify our bookstore.vala file ad add two new declarations:
```
public class BookStore {
	...
	public signal void stockAlert();
	public signal void priceAlert();
```

2. Modify our removeStock and setPrice functions in bookstore.vala to be like this:
```
	public void removeStock(int amount) {
		stock = stock - amount;
		if (stock < 5) {
			stockAlert();
		}
	}
	public void setPrice(double price) {
	this.price = price;
	if (price < 1) {
		priceAlert();
	}
}
```
3.	Modify our Main constructor to be like this:
```
public Main ()
{
var book = new Book("1234", "A new book");
book.printISBN ();
book.addAuthor("Joe Random");
book.addAuthor("Joe Random Jr.");
book.printAuthors();
var store = new BookStore(book, 4.2, 10);
store.stockAlert.connect(() => {
stdout.printf ("Uh oh, we are going to run out stock
soon!\n");
});
store.priceAlert.connect(() => {
stdout.printf ("Uh oh, price is too low\n");
});
stdout.printf ("Initial stock is %d\n", store.getStock());
stdout.printf ("Initial price is $ %f\n", store.getPrice());
store.removeStock(4);
store.setPrice(5.0);
stdout.printf ("Stock is %d\n", store.getStock());
stdout.printf ("and price is now $ %f\n", store.getPrice());
store.removeStock(4);
var status = "still available";
if (store.isAvailable() == false) {
status = "not available";
}
stdout.printf ("And the book is %s\n", status);
store.setPrice(0.2);
```
4.	Run it.
4. 运行
5.	See the printed message:
5. 看看结果：
Hello, world
1234
Author name: Joe Random
Author name: Joe Random Jr.
Initial stock is 10
Initial price is $ 4.200000
Stock is 6
and price is now $ 5.000000
Uh oh, we are going to run out stock soon!
And the book is still available
Uh oh, price is too low

### 刚刚发生了什么？

The warning message printed that the stock is running out and the price is too low is not
printed by BookStore class but rather by the Main class. This assumes a scenario where
the Main class subscribes to the signals and will do something about it when Main receives
the information from the signals.
public signal void stockAlert();
public signal void priceAlert();
First, we have to define the signal in the class that we want to publish the signal from. In
BookStore , we declare these two signals. Note that we only declare the method signature
with the signal keyword. We don't declare the body of the function. It is essential of
the signal that the object that subscribes to these signals provides functions to handle the
emitted signals.
if (stock < 5) {
stockAlert();
}
...
if (price < 1) {
priceAlert();
}
These two snippets show how we emit the signal. When stock is less than 5 , we emit
the stockAlert signal, and if price is less than 1 , we emit the priceAlert signal. The
BookStore class doesn't care about what happens next; it only announces the signals, and
that's it.
store.stockAlert.connect(() => {
stdout.printf ("Uh oh, we are going to run out stock soon!\n");
});
store.priceAlert.connect(() => {
stdout.printf ("Uh oh, price is too low\n");
});
While here, the Main class constructor connects itself with these two signals. We can see
the construct for providing a function body by using the => operator. This construct is called
closure or anonymous function. The parameter of this function is defined before => , which
in this context is indicating that no parameters were supplied. This is shown by empty
parentheses.
Inside the function body, we declare what should happen when the signal is emitted by
the store object. Here, we just print some alert text. In reality, we could do anything
from disconnecting network and displaying images to any other actions we want.
store.removeStock(4);
...
store.setPrice(0.2);
Here the actual signals are emitted and the text is printed.
Have a go hero – putting parameters in signals
We can put parameters in our signal, too. We can just put the parameters we want in the
signal declaration. Then, when connecting to a signal, put the parameters before the =>
operator. Now how about modifying the priceAlert signal to have one parameter, which
is the price of the book?

Summary
### 总结
It is fairly easy and quick to create an application and get it up and running with both Seed
and Vala. So why do we want to learn both and use them in this book?
JavaScript is an interpreted language; we can see the guts of the program and modify it
directly without recompilation. Vala, on the other hand, is a compiled language. We need
to have access to the source code to modify it. If we want to make a commercial software
on top of the GNOME platform, Vala makes a pretty good choice.
Making a program with JavaScript in Seed is pretty straightforward and does not require
project management in Anjuta, while in Vala, we need to take care of the dependencies
manually. Let's hope this can be fixed in the future version of Anjuta.
Now we know the basic construct of the JavaScript and Vala code, from manipulating basic
data types to using the object-oriented programming concept.
We see that JavaScript programming is pretty relaxed, while Vala is strict. A better code
structure using modularization would help simplify development and make debugging easier.
After knowing all of this, now we are ready to go to the next chapter, which uses the GNOME
platform libraries, which is the foundation of creating a GNOME application.
