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
            width: parent.width*0.8; 
            height: parent.heght;
            activeFocusOnTab: true
        }

        OptionMenu {
            id: optionMenu
            x: 0
            y: parent.height*0.2
            width: parent.width
            height: parent.height*0.4
            activeFocusOnTab: true
        }

        Rectangle {
            id: shade
            anchors.fill: parent
            color: "black"
            opacity: 0
        }

        states:  [
            State {
                name: "showGridViews"
                PropertyChanges { target: gridMenu; y: 160 }
                PropertyChanges { target: optionMenu; y: 480 }
            },

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
