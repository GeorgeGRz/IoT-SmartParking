import QtQuick 2.0
import QtQuick.Controls

import CWebsocket
/*Item {
    id : loginPage
    Column {
        spacing: 10

       Button {
            id: backBTN
            text: "<"
            enabled: stack.depth > 1
            onClicked: stack.pop()

        }
        Text {

            text: "<b>Device ID</b> : " + myModel.get(p1scores.currentIndex).name
        }
        Row{

            Text{
                text: "<b>Enter Password: </b>"
            }
            TextField {

                echoMode: TextInput.Password

            }
        }
    }
}*/
import QtQuick 2.0
import QtQuick.Controls
import QtQuick.Layouts
Item {
    function resultHandler(result) {

        var jsonResult = JSON.parse(result.toString())
        if(jsonResult.status === false){
            item1.txt = "<b>"+jsonResult.message+"</b>";
        }
        else{
            console.log(jsonResult.message.token);
            statusLabel.text = " "

            //create websocket to connect to the client
            secureWebSocket.sendTextMessage(result);
        }

        //TODO: ADD RESULT
    }
    CWebsocket {
           id: secureWebSocket
           url: "wss://192.168.1.4:9898"
           onTextMessageReceived: function(message) { console.log(message); }
           onStatusChanged: if (secureWebSocket.status == CWebsocket.Error) {
                                console.log("Error: " + secureWebSocket.errorString)

                            } else if (secureWebSocket.status == CWebsocket.Closed) {
                                console.log( "\nSecure socket closed")

                            }
           active: false
       }


    id: item1
    //Once the component is initialized, we connect the signal coming from HTTPS_Client into resultHandler function
    //This signal returns once user tries to login and upon completion, it returns the result in JSON format.
    Component.onCompleted:  client.replyAvailable.connect(resultHandler)
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
                    client.authenticate( myModel.get(p1scores.currentIndex).id,password.text);
                    secureWebSocket.active=true
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

