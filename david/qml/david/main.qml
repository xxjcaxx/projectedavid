import QtQuick 2.0
import OpenGLUnderQML 1.0



Item {
    width: 1000
    height: 700

    Webcam {
        id: webcam
        x: 2*(parent.width/2.5)
        y: 0
        width: parent.width/5
        height: parent.height/2.5
           SequentialAnimation on t {
                NumberAnimation { to: 1; duration: 2500; easing.type: Easing.InQuad }
                NumberAnimation { to: 0; duration: 2500; easing.type: Easing.OutQuad }
                loops: Animation.Infinite
                running: true
            }
        }

    MouseArea {
        anchors.fill: parent
        hoverEnabled: true
        onClicked: {
           // Qt.quit();
            //rectangle1.color="blue"
        }

        onPositionChanged: {

           var px= mouse.x;
            var py= mouse.y;

            if(px<width/2.5 && py<height/2.5) { rectangle1.color="#ee0000";rectangle2.color="#eeeeee";rectangle3.color="#eeeeee";rectangle4.color="#eeeeee";}
            if(px>width/2.5 && py<height/2.5) { rectangle1.color="#eeeeee";rectangle2.color="#ee0000";rectangle3.color="#eeeeee";rectangle4.color="#eeeeee";}
            if(px<width/2.5 && py>height/2.5) { rectangle1.color="#eeeeee";rectangle2.color="#eeeeee";rectangle3.color="#e0000e";rectangle4.color="#eeeeee";}
            if(px>width/2.5 && py>height/2.5) { rectangle1.color="#eeeeee";rectangle2.color="#eeeeee";rectangle3.color="#eeeeee";rectangle4.color="#ee0000";}

           // print(px);


        }


       Rectangle {
            id: rectangle1
            x: 0
            y: 0
            width: parent.width/2.5
            height: parent.height/2.5
            color: "#a10d0d"
        }
        Rectangle {
            id: rectangle2
            x: parent.width/2.5
            y: 0
            width: parent.width/2.5
            height: parent.height/2.5
            color: "#a500a8"
        }
        Rectangle {
            id: rectangle3
            x: 0
            y:parent.height/2.5
            width: parent.width/2.5
            height: parent.height/2.5
            color: "#00a8a8"
        }
        Rectangle {
            id: rectangle4
            x: parent.width/2.5
            y:parent.height/2.5
            width: parent.width/2.5
            height: parent.height/2.5
            color: "#a7aa00"
        }
        Rectangle {
            id: menus
            x: 2*(parent.width/2.5)
            y:parent.height/2.5
            width: parent.width/5
            height: parent.height/2.5
           color: "#aaaaaa"
        }


        Rectangle {
            id: consola
            x:0
            y:2*(parent.height/2.5)
            width: parent.width
            height: parent.height/5
            color: "#bbbbbb"
        }


    }
}
