#ifndef HTTPS_CLIENT_H
#define HTTPS_CLIENT_H

#include <QObject>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QQmlApplicationEngine>
#include <QAbstractListModel>

#include <qjsonobject.h>
#include <qjsondocument.h>
#include <qeventloop.h>

struct device{
private:
    QString deviceName;
    QHostAddress deviceIP;
    QString device_id;
public:
    QString name() const{return deviceName;}
    QString id() const {return device_id;}
    QString ipaddr() const{return deviceIP.toString();}
    device(QString name, QHostAddress ip,QString unique_id):deviceName(name),deviceIP(ip),device_id(unique_id){
        ;
    }

};

class deviceModel : public QAbstractListModel{
Q_OBJECT
public:
    enum DeviceRoles {
            nameRole,
            ipRole,
            idRole
        };
    deviceModel(QObject *parent = 0);
    void addDevice(const device &animal);
    int rowCount(const QModelIndex & parent = QModelIndex()) const;
    QVariant data(const QModelIndex & index, int role = Qt::DisplayRole) const;
    QHash<int,QByteArray> roleNames()const{
       QHash<int, QByteArray> roles;
       roles[nameRole] = "name";
       roles[ipRole] = "ipaddr";
       roles[idRole] = "id";
       return roles;
    }
    Q_INVOKABLE QVariantMap get(int row) {
        QHash<int,QByteArray> names = roleNames();
        QHashIterator<int, QByteArray> i(names);
        QVariantMap res;
        while (i.hasNext()) {
            i.next();
            QModelIndex idx = index(row, 0);
            QVariant data = idx.data(i.key());
            res[i.value()] = data;

        }
        return res;
    }


private:
        QList<device> m_devices;
};

#include "QJsonArray"
#include "qqmlcontext.h"

extern deviceModel * model;
class https_client : public QObject
{
    Q_OBJECT
private:
    QNetworkAccessManager m_manager;
public:
    explicit https_client(QObject *parent = 0){

    };
    Q_INVOKABLE void testConn(){

        //QObject::connect(manager, &QNetworkAccessManager::finished,
         //       this,&https_client::handleResponse);
        //connect(manager,SIGNAL(finished(QNetworkReply*)),manager,SLOT(deleteLater()));
        //delete manager once its finished



        QNetworkRequest request;
        //Since our certificate is self-signed, we need to ignore SSL verification
        ///TODO: When deploying, use authorized certificate, need to comment this
        QSslConfiguration conf = request.sslConfiguration();
        conf.setPeerVerifyMode(QSslSocket::VerifyNone);
        request.setSslConfiguration(conf);
        request.setUrl(QUrl("https://192.168.1.4/cars"));
        request.setHeader(QNetworkRequest::ServerHeader, "application/json");
        auto reply = m_manager.get(request);
        QObject::connect(reply, &QNetworkReply::finished, [=](){
            QVariantList tempcars;
            if(reply->error() == QNetworkReply::NoError){
                    QByteArray result = reply->readAll();
                    QJsonDocument jsonResponse = QJsonDocument::fromJson(result);
                    QJsonObject obj = jsonResponse.object();

                    QJsonArray array = obj["cars"].toArray();

                    for(const QJsonValue & value : array) {
                        model->addDevice(device(value["carId"].toString(), QHostAddress(value["carIp"].toString()),value["_id"].toString()));

                    }

                }
                else
                    qDebug() << reply->error();
                reply->deleteLater();
        });

    }

    Q_INVOKABLE void authenticate(QString devName,QString passwd){
        //QNetworkAccessManager * manager = new QNetworkAccessManager();
        //connect(manager,SIGNAL(finished(QNetworkReply*)),manager,SLOT(deleteLater()));


        QNetworkRequest request;
        //Since our certificate is self-signed, we need to ignore SSL verification
        QSslConfiguration conf = request.sslConfiguration();
        conf.setPeerVerifyMode(QSslSocket::VerifyNone);
        request.setSslConfiguration(conf);
        request.setUrl(QUrl("https://192.168.1.4/authenticate"));
        request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");
        int code = 0;
        QJsonObject obj;
        obj["_id"] = devName;
        obj["passwd"] = passwd;
        QJsonDocument doc(obj);
        QByteArray data = doc.toJson();

        QNetworkReply *reply = m_manager.post(request, data);
        QObject::connect(reply, &QNetworkReply::finished, this,&https_client::handleResponse);


    }
    ~https_client(){}
 signals:
    void data_gathered(QVariantList list);
    Q_SIGNAL void replyAvailable(const QString & reply);
public slots:
    void handleResponse(){
        QNetworkReply* reply = qobject_cast<QNetworkReply*>(sender());
        if(reply->error() == QNetworkReply::NoError){
            QString contents = QString::fromUtf8(reply->readAll());

            emit replyAvailable(contents);
        }
        else{
            QString err = reply->errorString();
            qDebug() << err;
        }

        reply->deleteLater();
    }

};

#endif // HTTPS_CLIENT_H
