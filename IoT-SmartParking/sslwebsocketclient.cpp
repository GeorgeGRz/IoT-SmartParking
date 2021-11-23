#include "sslwebsocketclient.h"
#include <QtCore/QDebug>
#include <QtWebSockets/QWebSocket>
#include <QCoreApplication>

QT_USE_NAMESPACE

//! [constructor]
sslwebsocketclient::sslwebsocketclient(QObject *parent) :
    QObject(parent)
{
    connect(&m_webSocket, &QWebSocket::connected, this, &sslwebsocketclient::onConnected);
    connect(&m_webSocket, QOverload<const QList<QSslError>&>::of(&QWebSocket::sslErrors),
            this, &sslwebsocketclient::onSslErrors);
    connect(&m_webSocket, &QWebSocket::textMessageReceived,
            this, &sslwebsocketclient::onTextMessageReceived);

}
//! [constructor]



void sslwebsocketclient::connectToServer()
{
     m_webSocket.open(QUrl("wss://192.168.1.4:9898"));

}




//! [onConnected]
void sslwebsocketclient::onConnected()
{
    qDebug() << "WebSocket connected";



}
//! [onConnected]

//! [onTextMessageReceived]
void sslwebsocketclient::onTextMessageReceived(QString message)
{
    qDebug() << "Message received:" << message;
    //qApp->quit();
}

void sslwebsocketclient::onSslErrors(const QList<QSslError> &errors)
{
    Q_UNUSED(errors);

    // WARNING: Never ignore SSL errors in production code.
    // The proper way to handle self-signed certificates is to add a custom root
    // to the CA store.

    m_webSocket.ignoreSslErrors();
}


//! [onTextMessageReceived]

