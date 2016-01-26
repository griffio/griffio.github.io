---
layout: post
title: Spacemacs OSX terminal powerline font
category: utils
tags: spacemacs osx
published: true
summary: setup powerline font spacemacs OSX
---

If you are using [Spacemacs](http://spacemacs.org/) from terminal or iterm, the powerline fonts need to be installed and configured.

Here is an overview of the steps.

Spacemacs lives in the .emacs.d folder in the home directory and can be installed and updated using git.

~~~
/Users/griffio/.emacs.d
~~~

[Spacemacs instructions are here](https://github.com/syl20bnr/spacemacs)

Any existing ~/.emacs.d folder needs to be removed or moved aside.

~~~
git clone --single-branch https://github.com/syl20bnr/spacemacs ~/.emacs.d
~~~

The OSX installed version of emacs (22.x.x) could be out of date (needs at least 24.x.x) for Spacesmacs.

~~~
emacs --version
GNU Emacs 24.5.1
~~~

You can move or remove the /usr/bin/emacs and /usr/share/emacs directories.

[Use homebrew to install any newer emacs versions](https://github.com/syl20bnr/spacemacs)

Your terminal emacs binary should be located similar to "/usr/local/bin/emacs@ -> ../Cellar/emacs-mac/emacs-24.5-z-mac-5.9/bin/emacs".

### Setting Terminal and iTerm Fonts for Powerline

[powerline fonts](https://github.com/powerline/fonts)

Install into OSX font library and update font cache
~~~
git clone --single-branch https://github.com/powerline/fonts.git
./install.sh
~~~


#### iTerm

iTerm has two font settings - configure the non-ascii font with a powerline font e.g "sauce code"

![iterm](https://raw.githubusercontent.com/griffio/griffio.github.io/master/public/spacemacs-iterm.png)

![iterm-settings](https://raw.githubusercontent.com/griffio/griffio.github.io/master/public/iterm-powerline-font.png)

#### Terminal

Terminal has one font setting - configure with a powerline version font e.g "sauce code"

![terminal](https://raw.githubusercontent.com/griffio/griffio.github.io/master/public/public/public/spacemacs-iterm.png)

![terminal-settings](https://raw.githubusercontent.com/griffio/griffio.github.io/master/public/public/iterm-powerline-font.png)




