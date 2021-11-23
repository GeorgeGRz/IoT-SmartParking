/*
Standard WebSocket UML implementation, i had to reimplement to use with custom CA because by default it assumes the certificate is trusted.
*/

#ifndef CUSTOMWEBSOCKET_H
#define CUSTOMWEBSOCKET_H


#include <QObject>
#include <QQmlParserStatus>
#include <QtQml>
#include <QScopedPointer>
#include <QtWebSockets/QWebSocket>
QT_BEGIN_NAMESPACE
class customwebsocket : public QObject, public QQmlParserStatus
{
    Q_OBJECT
    Q_DISABLE_COPY(customwebsocket)
    Q_INTERFACES(QQmlParserStatus)
    Q_PROPERTY(QUrl url READ url WRITE setUrl NOTIFY urlChanged)
    Q_PROPERTY(Status status READ status NOTIFY statusChanged)
    Q_PROPERTY(QString errorString READ errorString NOTIFY errorStringChanged)
    Q_PROPERTY(bool active READ isActive WRITE setActive NOTIFY activeChanged)
public:
    explicit customwebsocket(QObject *parent = 0);
    explicit customwebsocket(QWebSocket *socket, QObject *parent = 0);
    ~customwebsocket() override;
    enum Status
    {
        Connecting  = 0,
        Open        = 1,
        Closing     = 2,
        Closed      = 3,
        Error       = 4
    };
    Q_ENUM(Status)
    QUrl url() const;
    void setUrl(const QUrl &url);
    Status status() const;
    QString errorString() const;
    void setActive(bool active);
    bool isActive() const;
    Q_INVOKABLE qint64 sendTextMessage(const QString &message);
    Q_REVISION(1) Q_INVOKABLE qint64 sendBinaryMessage(const QByteArray &message);
Q_SIGNALS:
    void textMessageReceived(QString message);
    Q_REVISION(1) void binaryMessageReceived(QByteArray message);
    void statusChanged(customwebsocket::Status status);
    void activeChanged(bool isActive);
    void errorStringChanged(QString errorString);
    void urlChanged();
public:
    void classBegin() override;
    void componentComplete() override;
private Q_SLOTS:
    void onError(QAbstractSocket::SocketError error);
    void onSslErrors(const QList<QSslError> &errors);
    void onStateChanged(QAbstractSocket::SocketState state);
private:
    QScopedPointer<QWebSocket> m_webSocket;
    Status m_status;
    QUrl m_url;
    bool m_isActive;
    bool m_componentCompleted;
    QString m_errorString;
    // takes ownership of the socket
    void setSocket(QWebSocket *socket);
    void setStatus(Status status);
    void open();
    void close();
    void setErrorString(QString errorString = QString());
};
QT_END_NAMESPACE


#endif // CUSTOMWEBSOCKET_H
