import QtQuick 2.1

FocusScope {
    property alias interactive: gridView.interactive

    onActiveFocusChanged: {
        if (activeFocus)
            mainView.state = "showGridViews"
    }

    Rectangle {
        anchors.fill: parent
        clip: true
        gradient: Gradient {
            GradientStop { position: 0.0; color: "#193441" }
            GradientStop { position: 1.0; color: Qt.darker("#193441") }
        }

        GridView {
            id: gridView
            x:0
            y:0
            anchors.fill: parent; anchors.leftMargin: 5; anchors.rightMargin: 5
            cellWidth: (parent.width * 0.50)-5; cellHeight: (parent.height * 0.50)-5
            focus: true
            model:4           
            //KeyNavigation.right: optionMenu

            delegate: Item {
                id: container
                width: GridView.view.cellWidth;
                height: GridView.view.cellHeight;

                Rectangle {
                    id: content
                    color: "red"
                    width: container.width;
                    height: container.height;
                    antialiasing: true
                    anchors.fill: parent; anchors.margins: 20; radius: 10

                    Rectangle { color: "#91AA9D"; anchors.fill: parent; anchors.margins: 3; radius: 8; antialiasing: true }
                    Image { source: "Images/opcionPruebapec.png"; anchors.centerIn: parent }
                }

                MouseArea {
                    id: mouseArea
                    anchors.fill: parent
                    hoverEnabled: true

                    onClicked: {
                        container.GridView.view.currentIndex = index
                        container.forceActiveFocus()
                    }
                }

                states: State {
                    name: "active"; when: container.activeFocus
                    PropertyChanges { target: content; color: "#FCFFF5"; scale: 1.1 }
                }

                transitions: Transition {
                    NumberAnimation { properties: "scale"; duration: 100 }
                }
            }
        }
    }
}
