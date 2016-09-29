#Ubuntu Intellij Setup

Download Ultimate 64bit https://www.jetbrains.com/idea/#chooseYourEdition and extract to your user's home ```/home/FIXME/bin```

Open terminal to the extracted bin directory ```/home/FIXME/bin/idea-IU-FIXME/bin/ ```

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
