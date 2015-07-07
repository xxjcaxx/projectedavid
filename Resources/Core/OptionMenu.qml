import QtQuick 2.1

FocusScope {
    clip: true

    onActiveFocusChanged: {
        if (activeFocus)
            mainView.state = "showListViews"
    }

    ListView {
        id: list1
        x: 0
        y: parent.height*0.2 
        width: parent.width / 3; 
        height: parent.height - 20
        focus: true
        KeyNavigation.left: gridMenu;
        model: 10; cacheBuffer: 200
        delegate: ListViewDelegate {}

        Behavior on y {
            NumberAnimation { duration: 600; easing.type: Easing.OutQuint }
        }
    }

    Rectangle { width: parent.width; height: 1; color: "#D1DBBD" }

    Rectangle {
        y: 1; width: parent.width; height: 10
        gradient: Gradient {
            GradientStop { position: 0.0; color: "#3E606F" }
            GradientStop { position: 1.0; color: "transparent" }
        }
    }

    Rectangle {
        y: parent.height - 10; width: parent.width; height: 10
        gradient: Gradient {
            GradientStop { position: 1.0; color: "#3E606F" }
            GradientStop { position: 0.0; color: "transparent" }
        }
    }
}
