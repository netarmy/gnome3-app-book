#!/bin/bash

TEMPLATE_DIR=./template
CONTENTS_DIR=./contents
IMAGE_DIR=./contents/img

all: 
	multimarkdown -t latex ${TEMPLATE_DIR}/meta.txt ${CONTENTS_DIR}/0-preface*.md -o preface.tex
	multimarkdown -t latex ${TEMPLATE_DIR}/meta.txt ${CONTENTS_DIR}/1-chapter*.md -o chapters.tex
	multimarkdown -t latex ${TEMPLATE_DIR}/meta.txt ${CONTENTS_DIR}/2-appendix*.md -o appendix.tex
	${call pdfgen}
	
define pdfgen	
	cp -fr ${IMAGE_DIR} .
	cp ${TEMPLATE_DIR}/template.tex gnome3-app-book.tex

	xelatex gnome3-app-book.tex
	xelatex gnome3-app-book.tex
	xelatex gnome3-app-book.tex
	
	@echo "PDF Compiled!"
	
	rm *.tex *.aux *.fot *.toc *.log *.out
	rm -fr img

	@echo
	@echo "Done!"
endef

clean:
	rm -fr latex
	rm gnome3-app-book.*

sample:
	multimarkdown -t latex ${TEMPLATE_DIR}/meta.txt ${CONTENTS_DIR}/0-preface*.md -o preface.tex
	multimarkdown -t latex ${TEMPLATE_DIR}/meta.txt ${CONTENTS_DIR}/1-chapter1.md -o chapters.tex
	multimarkdown -t latex ${TEMPLATE_DIR}/meta.txt ${CONTENTS_DIR}/2-appendix.md -o appendix.tex
	${call pdfgen}
	cp gnome3-app-book.pdf book-sample.pdf
	@echo "Sample Book is OK"
