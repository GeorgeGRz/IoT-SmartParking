import QtQuick 2.0
import QtQuick.Controls

import CWebsocket

import QtQuick 2.0
import QtQuick.Controls
import QtQuick.Layouts
Item {
    function connectedHandler(result){
        console.log("X");

        var jsonResult = JSON.parse(result.toString())
        console.log(jsonResult.parked)
        if(jsonResult.parked === false){
            stack.push("qrc:/nodesPage.qml");
        }
        else{
            stack.push("qrc:/userPage.qml");
        }
    }

    function resultHandler(result) {
        console.log("IS PARKED : " +  myModel.get(p1scores.currentIndex).parked)
        console.log(result)
        var jsonResult = JSON.parse(result.toString())
        if(jsonResult.status === false){
            item1.txt = "<b>"+jsonResult.message+"</b>";
        }
        else{
            //console.log("RECEIVED TOKEN FROM REMOTE : " + jsonResult.message.token);
            statusLabel.text = " "
            var jsonObj = {};
            //jsonObj["_id"] = myModel.get(p1scores.currentIndex).id;
            //jsonObj["token"] = jsonResult.message.token;
            //console.log(result);
            //Send JSON object containing the ID and token to the websocket server
            client.checkParked(myModel.get(p1scores.currentIndex).name);


            //if(myModel.get(p1scores.currentIndex).parked === false){
              //  stack.push("qrc:/nodesPage.qml");
            //}
            //else{
             //   stack.push("qrc:/userPage.qml");
            //}

            //secureWebSocket.sendTextMessage(JSON.stringify(jsonObj));
        }
        //TODO: ADD RESULT
    }

    id: item1
    //Once the component is initialized, we connect the signal coming from HTTPS_Client into resultHandler function
    //This signal returns once user tries to login and upon completion, it returns the result in JSON format.
    Component.onCompleted:
    {
        client.replyAvailable.connect(resultHandler)
        client.carUpdated.connect(connectedHandler)
    }
    property alias cancelButton: cancelButton
    property alias loginButton: loginButton
    //property alias userName: userName
    property alias password: password

    property alias txt : statusLabel.text
    Column {
        id: columnLayout
        anchors.topMargin: 20
        anchors.top: parent.top
        anchors.bottomMargin: 20
        anchors.bottom: parent.bottom
        anchors.rightMargin: 20
        anchors.right: parent.right
        anchors.leftMargin: 20
        anchors.left: parent.left

        Rectangle {
            id: rectangle
            height: 30
            anchors.rightMargin: 0
            anchors.leftMargin: 0
            anchors.right: parent.right
            anchors.left: parent.left
            gradient: Gradient {
                GradientStop {
                    position: 0
                    color: "#25a6e2"
                }
                GradientStop {
                    color: "#188bd0"
                }
            }

            Text {
                id: textArea
                x: 54
                y: 5
                color: "#ffffff"
                text: qsTr("Connecting to device " + "<b>"+ myModel.get(p1scores.currentIndex).name+"</b>")
                font.pointSize: 12
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.verticalCenter: parent.verticalCenter
            }
        }

        Item {
            width: 10
            height: 10
        }

        Text {
            id: passwordText
            text: qsTr("Password:")
            font.pointSize: 12
        }

        TextInput {
            id: password
            width: parent.width
            height: 26
            Layout.fillWidth: true
            font.pointSize: 12
            echoMode: TextInput.Password
            focus: true
            Keys.onReturnPressed:
            {

                Qt.inputMethod.hide();//will close keyboard
            }

        }
        Item {
            width: 10
            height: 10
        }


        Row {
            id: rowLayout
            width: 100
            height: 100
            spacing: 5
            Item {
                Layout.fillWidth: true
            }

            Button {
                id: cancelButton

                width: 120
                height: 30
                text: qsTr("Back")
                onClicked: stack.pop()

            }

            Button {

                id: loginButton
                width: 120
                height: 30
                text: qsTr("Login")
                onClicked:{

                    client.authenticate( myModel.get(p1scores.currentIndex).name,password.text);
                    //secureWebSocket.active=true
                }
            }

        }

        Text {
            id: statusLabel
            objectName: "label"
            text: qsTr("")
        }
    }
}

