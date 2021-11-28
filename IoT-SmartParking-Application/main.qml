import QtQuick
import QtQuick.Window
import QtQuick.Controls
import Https_client
Window {
    id : mainWindow
    width: 640
    height: 480
    visible: true
    title: qsTr("Hello World")


    Component{
        id : loginView
        Loader {


            source:"login_page.qml";
          }

     }


    Component.onCompleted:{



        //on load of the main app, connect to fetch the available cars
        client.fetchCars();

    }
    Https_client{
        id : client;
        onErrorOccured:function(errCode){
            if(errCode == 499)
            {
                popup.txt = "Can't connect to remote host.Connect and try again!";

                popup.open();
            }
        }
    }

    StackView {
           objectName: "stack"
           id: stack
           initialItem: p1scores
           anchors.fill: parent

       }
       /*
       Component {
           id: mainView

           Row {
               spacing: 10

               Button {
                   text: "Push"
                   onClicked:{
                        if(stack.depth == 0)
                            stack.push(mainView)
                        else
                            stack.push(loginView)

                   }
               }
               Button {
                   text: "Pop"
                   enabled: stack.depth > 1
                   onClicked: stack.pop()

               }
               Text {
                   text: stack.depth
               }
           }
       }*/


    Popup {
            id: popup
            property alias txt : errorText.text
            parent: Overlay.overlay

           x: Math.round((parent.width - width) / 2)
           y: Math.round((parent.height - height) / 2)
           Column{
                    Text{
                        id : errorText
                   text:""
                   color: "black"
                  }
                   Button{
                       text:"Close"
                       onClicked: Qt.quit();
                   }}


           width: parent.width
           height: parent.height
            modal: true
            focus: true
            closePolicy: Popup.CloseOnPressOutside
        }
    ListView {
         id: p1scores
         model: myModel


         delegate: contactDelegate


         highlight: Rectangle { color: "lightsteelblue"; radius: 5 }
         focus: true
         onCurrentItemChanged: {
             console.log('selected at index ' + p1scores.currentIndex);
         }



    }
    Component {
            id: contactDelegate
            Item {
                width: parent.width; height: 40
                Column {
                    Text { text: '<b>Device Name:</b> ' + name }
                     Text { text: '<b>Ip Address:</b> ' + ipaddr }
                }
                MouseArea {
                    anchors.fill: parent
                    onClicked:{

                        p1scores.currentIndex = index;
                        stack.push("qrc:/login_page.qml");

                    }
                }
            }
        }



}
