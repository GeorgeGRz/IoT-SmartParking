#ifndef SSLWEBSOCKETCLIENT_H
#define SSLWEBSOCKETCLIENT_H

#include <QtCore/QObject>

#include <QtNetwork/QSslError>
#include <QtCore/QList>
#include <QtCore/QString>
#include <QtCore/QUrl>
#include <QtWebSockets/QtWebSockets>


QT_FORWARD_DECLARE_CLASS(QWebSocket)

class sslwebsocketclient : public QObject
{
    Q_OBJECT

public:
    explicit sslwebsocketclient( QObject *parent = nullptr);
    Q_INVOKABLE void connectToServer();


private Q_SLOTS:
    void onConnected();
    void onTextMessageReceived(QString message);
    void onSslErrors(const QList<QSslError> &errors);

private:
    QWebSocket m_webSocket;
};
#endif // SSLWEBSOCKETCLIENT_H
