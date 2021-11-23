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
        client.testConn();

    }
    Https_client{
        id : client;

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
