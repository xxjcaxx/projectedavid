import QtQuick 2.1

Item {
    id: container
    width: ListView.view.width; height: 60; anchors.leftMargin: 10; anchors.rightMargin: 10

    Rectangle {
        id: content
        anchors.centerIn: parent; width: container.width - 40; height: container.height - 10
        color: "transparent"
        antialiasing: true
        radius: 10

        Rectangle { anchors.fill: parent; anchors.margins: 3; color: "#91AA9D"; antialiasing: true; radius: 8 }
    }

    Text {
        id: label
        anchors.centerIn: content
        text: "Opciò" + (index + 1)
        color: "#193441"
        font.pixelSize: 14
    }

    MouseArea {
        id: mouseArea
        anchors.fill: parent
        hoverEnabled: true

        onClicked: {
            container.ListView.view.currentIndex = index
            container.forceActiveFocus()
        }
    }

    states: State {
        name: "active"; when: container.activeFocus
        PropertyChanges { target: content; color: "#FCFFF5"; scale: 1.1 }
        PropertyChanges { target: label; font.pixelSize: 16 }
    }

    transitions: Transition {
        NumberAnimation { properties: "scale"; duration: 100 }
    }
}
