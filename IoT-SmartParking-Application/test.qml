import QtQuick 2.0

Item {
    property alias txt : name.text
    Text {
        id: name
        text: qsTr("text")
    }
}
