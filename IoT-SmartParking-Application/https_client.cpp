#include "https_client.h"
#include "QJsonDocument"
#include "QJsonObject"
#include "QJsonArray"
#include <QtQuick/QQuickItem>

#include <QQuickView>
#include "qqmlcontext.h"



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
    else if (role == parkedRole)
        return animal.parked();
    else if (role == idRole)
        return animal.id();
    return QVariant();
}
