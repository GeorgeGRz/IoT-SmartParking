import QtQuick 2.0

Item {
    Component.onCompleted: {
        //nodesModel.add("a","b","c",true)
        //console.log(myModel.get(p1scores.currentIndex).name)
        client.fetchNodes("1");
    }

    GridView {
        id: gridView
        //width: parent.width; height: parent.height
        cellWidth: 100; cellHeight: 100
        anchors.fill: parent
        focus: true
        Component {
            id: contactsDelegate
            Rectangle {
                id: wrapper
                width: gridView.cellWidth-4
                height: gridView.cellHeight-4
                color: {
                    if(occupied)
                        return "red"
                    else{
                        if(id != "")
                            return "orange";
                        return "black";
                    }
                }
                Text {
                    id: contactInfo
                    text: row +" "+ col + " "+id;
                    color: "white"
                }
                MouseArea {
                    anchors.fill: parent
                    enabled:{
                        if(occupied || id != "")
                            return false
                        return true;
                    }

                    onClicked: {
                        parent.GridView.view.currentIndex = index
                        console.log("ITS NOT OCCUPIED")
                    }
                }

            }

        }

        model: nodesModel
        delegate: contactsDelegate

    }
}
