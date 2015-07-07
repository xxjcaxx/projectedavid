import QtQuick 2.1
import "Core"

Rectangle {
    id: window

    width: 800; height: 640
    color: "#3E606F"

    FocusScope {
        id: mainView

        width: parent.width; height: parent.height
        focus: true

        GridMenu {
            id: gridMenu
            y: 0;
            width: parent.width*0.8;
            height: parent.height;
            activeFocusOnTab: true;
        }
        CamMenu {
            id: camMenu
            x:parent.width*0.8;
            y:0;
            width: parent.width*0.2
            height: parent.height*0.5
            //activeFocusOnTab: true;
        }
        OptionMenu {
            id: optionMenu
            x: parent.width*0.8
            y: parent.height*0.5
            width: parent.width*0.2
            height: parent.height*0.5
            activeFocusOnTab: true
        }

        Rectangle {
            id: shade
            anchors.fill: parent
            color: "black"
            opacity: 0
        }

        states:  [
            //State {
             //   name: "showCam"
               // PropertyChanges { target: gridMenu; y: 160 }
                //PropertyChanges { target: optionMenu; y: 480 }
            //},

            State {
                name: "showListViews"               
                PropertyChanges { target: gridMenu; y: 0 }
                PropertyChanges { target: optionMenu; y: 320 }
            }
        ]

        transitions: Transition {
            NumberAnimation { properties: "y"; duration: 600; easing.type: Easing.OutQuint }
        }
    }

}
