QT       += core gui opengl
# Add more folders to ship with the application, here
<<<<<<< HEAD
=======
folder_01.source = qml/david
folder_01.target = qml
DEPLOYMENTFOLDERS = folder_01
>>>>>>> f517c1e465b2ec0fab640b212e6611dfb617d5fb

# Additional import path used to resolve QML modules in Creator's code model
QML_IMPORT_PATH =

# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp \
    webcam.cpp
<<<<<<< HEAD
RESOURCES += \
    projecteDavid.qrc
=======

>>>>>>> f517c1e465b2ec0fab640b212e6611dfb617d5fb
# Installation path
# target.path =

# Please do not modify the following two lines. Required for deployment.
include(qtquick2applicationviewer/qtquick2applicationviewer.pri)
qtcAddDeployment()

HEADERS += \
    webcam.h

LIBS += `pkg-config opencv --libs`

