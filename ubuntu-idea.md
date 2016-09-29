#Ubuntu Intellij Setup

Download Ultimate 64bit https://www.jetbrains.com/idea/#chooseYourEdition and extract to user home ```/home/FIXME/bin```

```
chmod a+x idea.sh
```

**Shell Launcher**

Intellij Tools/Create Command Line Launcher ```/usr/local/bin/idea```

---

**Ubuntu Launcher**

Create using Lock to Launcher or verify exists in location ```.local/share/applications/jetbrains-idea.desktop```

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

