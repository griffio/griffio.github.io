## Ruby Install

### chruby
brew install chruby

### install chruby and source chruby to environment 
brew install chruby ruby-install
echo "source /usr/local/opt/chruby/share/chruby/chruby.sh" >> ~/.zshenv
echo "source /usr/local/opt/chruby/share/chruby/auto.sh" >> ~/.zshenv

### speed up gem install no docs
echo "gem: --no-document" >> ~/.gemrc


### gem
gem env

vim ~/.gemrc
gemhome: /Users/griffio/.gem/ruby/2.1.0

RubyGems Environment:
  - RUBYGEMS VERSION: 2.2.2
  - RUBY VERSION: 2.1.1 (2014-02-24 patchlevel 76) [x86_64-darwin13.0]
  - INSTALLATION DIRECTORY: /Users/griffio/.gem/ruby/2.1.0
  - RUBY EXECUTABLE: /usr/local/Cellar/ruby/2.1.1_1/bin/ruby
  - EXECUTABLE DIRECTORY: /Users/griffio/.gem/ruby/2.1.0/bin
  - SPEC CACHE DIRECTORY: /Users/griffio/.gem/specs
  - RUBYGEMS PLATFORMS:
    - ruby
    - x86_64-darwin-13
  - GEM PATHS:
     - /Users/griffio/.gem/ruby/2.1.0
     - /usr/local/Cellar/ruby/2.1.1_1/lib/ruby/gems/2.1.0
  - GEM CONFIGURATION:
     - :update_sources => true
     - :verbose => true
     - :backtrace => false
     - :bulk_threshold => 1000
     - "gemhome" => "/Users/griffio/.gem/ruby/2.1.0"
  - REMOTE SOURCES:
     - https://rubygems.org/
  - SHELL PATH:
     - /usr/local/bin
     - /usr/bin
     - /bin
     - /usr/sbin
     - /sbin
     - /usr/X11/bin
     - /usr/local/share/npm/bin






