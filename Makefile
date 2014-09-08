#!/bin/bash

TEMPLATE_DIR=template
CONTENTSi_DIR=contents
IMAGE_DIR=contents/img

all: 
	cp -fr ./contents/img .
	multimarkdown -t latex ./template/meta.txt ./contents/0-preface*.md -o preface.tex
	multimarkdown -t latex ./template/meta.txt ./contents/1-chapter*.md -o chapters.tex
	multimarkdown -t latex ./template/meta.txt ./contents/2-appendix*.md -o appendix.tex
	
	cp ./template/template.tex gnome3-app-book.tex

	xelatex gnome3-app-book.tex
	xelatex gnome3-app-book.tex
	xelatex gnome3-app-book.tex
	
	echo "PDF Compiled!"
	
	rm *.tex *.aux *.fot *.toc *.log *.out
	rm -fr img

	echo
	echo "Done!"

clean:
	rm -fr latex
	rm gnome3-app-book.*

sample:
	cp gnome3-app-book.pdf book-sample.pdf
