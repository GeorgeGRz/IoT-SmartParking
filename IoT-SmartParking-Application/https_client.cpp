#include "https_client.h"
#include "QJsonDocument"
#include "QJsonObject"
#include "QJsonArray"
#include <QtQuick/QQuickItem>

#include <QQuickView>
#include "qqmlcontext.h"

/*
void https_client::handleResponse(QNetworkReply *reply){
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



}*/

deviceModel::deviceModel(QObject *parent): QAbstractListModel(parent)
{
;

}

void deviceModel::addDevice(const device &animal)
{
    beginInsertRows(QModelIndex(), rowCount(), rowCount());
    m_devices << animal;
    endInsertRows();

}
int deviceModel::rowCount(const QModelIndex & parent) const {
    return m_devices.count();
}
QVariant deviceModel::data(const QModelIndex & index, int role) const {
    if (index.row() < 0 || index.row() > m_devices.count())
        return QVariant();

    const device &animal = m_devices[index.row()];
    if (role == nameRole)
        return animal.name();
    else if (role == ipRole)
        return animal.ipaddr();
    else if (role == idRole)
        return animal.id();
    return QVariant();
}
