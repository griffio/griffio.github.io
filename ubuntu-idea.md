#Ubuntu Intellij Setup

Download Ultimate 64bit https://www.jetbrains.com/idea/#chooseYourEdition and extract to your user's home ```/home/$USER/bin```

Open terminal to the extracted bin directory ```cd /home/$USER/bin/idea-IU-*/bin/```

Make the idea shell script executable [chmod](http://explainshell.com/explain?cmd=chmod+a%2Bx+idea.sh)

```
chmod a+x idea.sh
```
Execute from bin directory

```
./idea.sh
```

**Shell Launcher**

From Intellij Tools/Create Command Line Launcher ```/usr/local/bin/idea```

---

**Ubuntu Launcher**

Create using "Lock to Launcher" or verify exists in location ```.local/share/applications/jetbrains-idea.desktop```

``` ini
[Desktop Entry]
Version=1.0
Type=Application
Name=IntelliJ IDEA
Icon=/home/FIXME/bin/idea-IU-162.2032.8/bin/idea.png
Exec="/home/FIXME/bin/idea-IU-162.2032.8/bin/idea.sh" %f
Comment=The Drive to Develop
Categories=Development;IDE;
Terminal=false
StartupWMClass=jetbrains-idea
```

##References

```
sudo update-alternatives --config java
```

The update-alternatives for Java doesn't set the JAVA_HOME system environment.

See [Setting the JAVA_HOME Environment Variable](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04)

Locations in Ubuntu for setting system and user session environment variables.  

[EnvironmentVariables#Session-wide_environment_variables](https://help.ubuntu.com/community/EnvironmentVariables#Session-wide_environment_variables)
