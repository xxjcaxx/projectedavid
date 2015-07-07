import QtQuick 2.1
import OpenGLUnderQML 1.0

Rectangle {
    width: 100
    height: 62
    color: "#bbbbbb"
    border.color: "#000000"
    focus:true
    SequentialAnimation{
        NumberAnimation { to: 1; duration: 2500; easing.type: Easing.InQuad }
        NumberAnimation { to: 0; duration: 2500; easing.type: Easing.OutQuad }
        loops: Animation.Infinite
        running: true
    }
}

