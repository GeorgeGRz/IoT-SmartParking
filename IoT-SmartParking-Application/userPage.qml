import QtQuick 2.0
 import QtQuick.Controls
Item {
    Text {
        id: userText
        objectName: "label"
        text: qsTr("Reservation name: " + "<b>"+ myModel.get(p1scores.currentIndex).name+"</b>")
    }

}
