## Introduction ##

As open source books, ebooks and PDF format should be created on the fly, the following sections describe those solution in detail.

 * contents/*.markdown : all source chapters
 * template/template.tex : book style
 * mmd2bok : script to generate latex from Markdown and call `xelatex` to generate pdf

## Making PDF books ##

PDF format is used to read/print in nice way like real book. [MultiMarkdown](http://fletcherpenney.net/multimarkdown/) is good at this and it is used instead to generate latex from multimarkdown, and LaTeX tool `xelatex` (is part of [TexLive][texlive] now) is used to generate PDF from LaTeX.

Please check [CTAN](http://www.ctan.org/) and [TeX Live][texlive] for more background for LaTeX, which is quite complicated yet elegant if you have never touched it before.

### Ubuntu Platform ###

Ubuntu Platform Precise (12.04) is used mainly and it is continuously verified by travis-ci.org as well.

Though TeX Live 2011 could be installed separately, the default one texlive 2009 from Ubuntu repository is good enough so far.

    $ sudo apt-get install texlive-xetex
    $ sudo apt-get install texlive-latex-recommended # main packages
    $ sudo apt-get install texlive-latex-extra # package titlesec

You need to install related fonts for Chinese. Fortunately, they are also available in Ubuntu repository.

    $ sudo apt-get install ttf-arphic-gbsn00lp ttf-arphic-ukai # from arphic
    $ sudo apt-get install ttf-wqy-microhei ttf-wqy-zenhei # from WenQuanYi


### Fedora Platform ###

Fedora 19 is verified, it uses texlive 2013, see [Fedora TeX Live Project](http://fedoraproject.org/wiki/Features/TeXLive)

Below could be simplified to use collection-*

    # yum install texlive-xetex
    # yum install texlive-latex
    # yum install texlive
    # yum install texlive-xetex-def texlive-xltxtra texlive-tocbibind
    # yum install texlive-euenc texlive-frame texlive-footnpag texlive-titlesec
    # yum install texlive-appendix

You need to install related fonts for Chinese. Fortunately, they are also available in Fedora repository.

    # yum install texlive-arphic # from arphic
    // # yum install cjkuni-uming-fonts cjkuni-ukai-fonts
    # yum install wqy-microhei-fonts wqy-zenhei-fonts # from WenQuanYi

### OpenSUSE Platform ###

OpenSUSE 13.1, which uses TeX Live 2013, is recommended.

    # zypper in texlive-xetex
    # zypper in texlive-latex
    # zypper in texlive
    # zypper in texlive-xetex-def texlive-xltxtra texlive-tocbibind
    # zypper in in texlive-euenc texlive-frame texlive-footnpag texlive-titlesec
    # zypper in texlive-appendix

You need to install related fonts for Chinese. Fortunately, they are also available in the official openSUSE repository.

    # zypper in texlive-arphic # from arphic
    # zypper in arphic-gbsn00lp-fonts arphic-ukai-fonts arphic-uming-fonts
    # zypper in wqy-microhei-fonts wqy-zenhei-fonts # from WenQuanYi


### Generate PDF ###

See [my blog for "Challenges of Chinese fonts"](http://larrycaiyu.com/2012/01/13/ebook-chinese-fonts.html)

`multimarkdown` shall be compiled from git source.

Then it should work perfectly

	$ ./mmd2bok

### LaTeX template ###

The LaTeX template is `template/template.tex`. It contains the style and include the `preface`, `chapters`, `appendix` LaTeX files, which are generated from source chapters.

See `mmd2bok` for more information.

[texlive]: http://www.tug.org/texlive/
