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
    QString device_id;
    bool car_parked;
public:
    QString name() const{return deviceName;}
    QString id() const {return device_id;}
    bool parked()const{return car_parked;}
    device(QString name,QString unique_id,bool isParked):deviceName(name),device_id(unique_id),car_parked(isParked){
        ;
    }

};

class deviceModel : public QAbstractListModel{
Q_OBJECT
public:
    enum DeviceRoles {
            nameRole,
            parkedRole,
            idRole
        };
    deviceModel(QObject *parent = 0);
    void addDevice(const device &animal);
    int rowCount(const QModelIndex & parent = QModelIndex()) const;
    QVariant data(const QModelIndex & index, int role = Qt::DisplayRole) const;
    QHash<int,QByteArray> roleNames()const{
       QHash<int, QByteArray> roles;
       roles[nameRole] = "name";
       roles[parkedRole] = "parked";
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
#include "nodeModel.h"
extern deviceModel * model;
extern nodeModel * nModel;
class https_client : public QObject
{
    Q_OBJECT
private:
    QNetworkAccessManager m_manager;
public:
    explicit https_client(QObject *parent = 0):m_manager(){

    };
    Q_INVOKABLE void fetchNodes(QString carID){
        QNetworkRequest request;

        //Since our certificate is self-signed, we need to ignore SSL verification
        QSslConfiguration conf = request.sslConfiguration();
        conf.setPeerVerifyMode(QSslSocket::VerifyNone);
        request.setSslConfiguration(conf);
        request.setUrl(QUrl("https://192.168.1.2/nodes"));
        request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");
        QJsonObject obj;
        obj["_id"] = carID;
        QJsonDocument doc(obj);
        QByteArray data = doc.toJson();

        QNetworkReply *reply = m_manager.post(request, data);
        QObject::connect(reply, &QNetworkReply::finished, [=](){
            QVariantList tempcars;
            if(reply->error() == QNetworkReply::NoError){
                    QByteArray result = reply->readAll();
                    QJsonDocument jsonResponse = QJsonDocument::fromJson(result);
                    QJsonObject obj = jsonResponse.object();
                    //qDebug()<<obj;
                    QJsonArray array = obj["nodes"].toArray();

                    for(const QJsonValue & value : array) {
                        //model->addDevice(device(value["carId"].toString(), QHostAddress(value["carIp"].toString()),value["_id"].toString()));
                        qDebug() << value["nodeRow"].toInt();
                        nModel->addModel(node(value["carId"].toString(),value["nodeRow"].toInt(),value["nodeCol"].toInt(),value["occupied"].toBool()));
                    }

                }
            else{

                emit errorOccured(reply->error());
            }
                reply->deleteLater();
        });
    }

    Q_INVOKABLE void fetchCars(){

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
        request.setUrl(QUrl("https://192.168.1.2/cars"));


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
                        qDebug() << value;
                        model->addDevice(device(value["carId"].toString(),value["_id"].toString(),value["parked"].toBool()));

                    }

                }
            else{

                emit errorOccured(reply->error());
            }
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
        request.setUrl(QUrl("https://192.168.1.2/login"));
        request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");
        int code = 0;
        QJsonObject obj;
        obj["carId"] = devName;
        obj["user_passwd"] = passwd;
        QJsonDocument doc(obj);
        QByteArray data = doc.toJson();

        QNetworkReply *reply = m_manager.post(request, data);
        QObject::connect(reply, &QNetworkReply::finished, this,&https_client::handleResponse);


    }
    ~https_client(){}
 signals:
    void data_gathered(QVariantList list);
    Q_SIGNAL void replyAvailable(const QString & reply);
    void errorOccured(QNetworkReply::NetworkError error_msg);
public slots:
    void handleErrors(QNetworkReply *reply, const QList<QSslError> &errors){
        for(auto& err : errors){
            qDebug()<< err;
        }
        qDebug()<< reply->errorString();
        reply->deleteLater();
        emit errorOccured(reply->error());
    }
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
