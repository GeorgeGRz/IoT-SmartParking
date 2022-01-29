#include <QString>

#ifndef NODE_H
#define NODE_H
struct node{
private:
    QString carId;
    int nodeRow;
    int nodeCol;
    bool occupied;
public:
    QString carID() const{return carId;}
    int getRow() const {return nodeRow;}
    int getCol() const{return nodeCol;}
    bool getOccupied()const{return occupied;}

    node(QString id,int nRow,int nCol,bool occ):carId(id),nodeRow(nRow),nodeCol(nCol),occupied(occ){
        ;
    }


};
#endif // NODE_H
