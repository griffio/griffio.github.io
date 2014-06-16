## Ruby Install with chruby, ruby-install

### remove existing
brew uninstall ruby

brew prune

rm ~/.gemrc

### install chruby and source chruby to environment 
brew install chruby ruby-install

echo "source /usr/local/opt/chruby/share/chruby/chruby.sh" >> ~/.zshenv

echo "source /usr/local/opt/chruby/share/chruby/auto.sh" >> ~/.zshenv

ruby-install ruby 2.0.0

chruby ruby-2.0.0-p451

### speed up gem install no docs
echo "gem: --no-document" >> ~/.gemrc

### gem environment
gem env

gemhome: /Users/griffio/.gem/ruby/2.1.0

RubyGems Environment:
  - RUBYGEMS VERSION: 2.0.14
  - RUBY VERSION: 2.0.0 (2014-02-24 patchlevel 451) [x86_64-darwin13.2.0]
  - INSTALLATION DIRECTORY: /Users/griffio/.gem/ruby/2.0.0
  - RUBY EXECUTABLE: /Users/griffio/.rubies/ruby-2.0.0-p451/bin/ruby
  - EXECUTABLE DIRECTORY: /Users/griffio/.gem/ruby/2.0.0/bin
  - RUBYGEMS PLATFORMS:
    - ruby
    - x86_64-darwin-13
  - GEM PATHS:
     - /Users/griffio/.gem/ruby/2.0.0
     - /Users/griffio/.rubies/ruby-2.0.0-p451/lib/ruby/gems/2.0.0
  - GEM CONFIGURATION:
     - :update_sources => true
     - :verbose => true
     - :backtrace => false
     - :bulk_threshold => 1000
  - REMOTE SOURCES:
     - https://rubygems.org/

### PATH
/Users/griffio/.gem/ruby/2.0.0/bin:/Users/griffio/.rubies/ruby-2.0.0-p451/lib/ruby/gems/2.0.0/bin:/Users/griffio/.rubies/ruby-2.0.0-p451/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/X11/bin:/usr/local/share/npm/bin
