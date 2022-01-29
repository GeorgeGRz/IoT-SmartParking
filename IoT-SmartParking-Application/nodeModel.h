#include <QObject>
#include <QAbstractListModel>
#include "node.h"
#ifndef NODEMODEL_H
#define NODEMODEL_H
class nodeModel : public QAbstractListModel{
Q_OBJECT
public:

    enum NodeRoles {
            idRole,
            nodeRowRole,
            nodeColRole,
            occupiedRole
        };
    nodeModel(QObject *parent = 0):QAbstractListModel(parent){
        ;
    }
    void addModel(const node &animal){
        //qDebug() << animal.getCol()<< " " << animal.getRow();
        beginInsertRows(QModelIndex(), rowCount(), rowCount());
        m_devices << animal;
        endInsertRows();
    }
    Q_INVOKABLE void test(){
        qDebug()<<"OK";
    }

    Q_INVOKABLE void add(QString id,int row,int col, bool oc){
       addModel(node(id,row,col,oc));
    }
    int rowCount(const QModelIndex & parent = QModelIndex()) const{
        return m_devices.count();
    };
    QVariant data(const QModelIndex & index, int role = Qt::DisplayRole) const{
        if (index.row() < 0 || index.row() > m_devices.count())
            return QVariant();

        const node &animal = m_devices[index.row()];
        if (role == idRole)
            return animal.carID();
        else if (role == nodeRowRole)
            return animal.getRow();
        else if (role == nodeColRole)
            return animal.getCol();
        else if (role == occupiedRole)
            return animal.getOccupied();
        return QVariant();
    }
    QHash<int,QByteArray> roleNames()const{
       QHash<int, QByteArray> roles;
       roles[idRole] = "id";
       roles[nodeRowRole] = "row";
       roles[nodeColRole] = "col";
       roles[occupiedRole] = "occupied";
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
        QList<node> m_devices;
};

#endif // NODEMODEL_H
