import QtQuick 2.0

Item {

    function reservationReplyHandler(reply){
        console.log(reply);
        var jsonResult = JSON.parse(reply.toString())
        if(jsonResult.status === true){
            console.log("OK");
            nodesModel.clear();
            myModel.clear();
            client.fetchCars();
            stack.pop(null)

        }
    }

    Component.onCompleted: {
        //nodesModel.add("a","b","c",true)
        //console.log(myModel.get(p1scores.currentIndex).name)
        client.fetchNodes("1");
        client.reservationReply.connect(reservationReplyHandler)
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
                        console.log("RESERVING FOR "+ myModel.get(p1scores.currentIndex).name+ " AT " +row + " " + col )
                        var txt=row.toString()+col.toString();
                        client.reserveSeat(txt,myModel.get(p1scores.currentIndex).name)
                    }
                }

            }

        }

        model: nodesModel
        delegate: contactsDelegate

    }
}
