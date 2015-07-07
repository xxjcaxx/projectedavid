import QtQuick 2.1
import OpenGLUnderQML 1.0
Rectangle{
    id:webcam
    width: parent.width
    height: parent.height
    color:black
    Webcam {
        x: 0
        y: 0
        width: parent.width
        height: parent.height
        focus:true
        SequentialAnimation on t{
            NumberAnimation { to: 1; duration: 2500; easing.type: Easing.InQuad }
            NumberAnimation { to: 0; duration: 2500; easing.type: Easing.OutQuad }
            loops: Animation.Infinite
            running: true
        }
    }
}

