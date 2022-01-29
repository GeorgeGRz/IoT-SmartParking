#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include "https_client.h"
#include <QQuickStyle>
#include <QQuickWindow>
#include <QQmlComponent>
#include <qqmlproperty.h>
#include <QQuickItem>

#include "customwebsocket.h"
#include "nodeModel.h"
deviceModel * model;
nodeModel * nModel;
int main(int argc, char *argv[])
{
#if QT_VERSION < QT_VERSION_CHECK(6, 0, 0)
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
#endif
#if defined(Q_OS_LINUX) && !defined(Q_OS_ANDROID)
    qputenv("QT_IM_MODULE", QByteArray("qtvirtualkeyboard"));
#endif
    QGuiApplication app(argc, argv);



    QQuickStyle::setStyle("Default");
    QQmlApplicationEngine engine;

    qmlRegisterType<https_client>("Https_client", 1, 0, "Https_client");

    qmlRegisterType<customwebsocket>("CWebsocket", 1, 0, "CWebsocket");
    const QUrl url(QStringLiteral("qrc:/main.qml"));


    model = new deviceModel{};

    nModel = new nodeModel{};
    auto ctxt = engine.rootContext();
    ctxt->setContextProperty("myModel", model);
    ctxt->setContextProperty("nodesModel", nModel);

    QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
                     &app, [url](QObject *obj, const QUrl &objUrl) {
        if (!obj && url == objUrl)
            QCoreApplication::exit(-1);
    }, Qt::QueuedConnection);
    engine.load(url);

    /*
    auto wind = qobject_cast<QQuickWindow*>(engine.rootObjects().at(0));
    //qDebug() << "Property value:" << QQmlProperty::read(wind, "url").toString();
   QObject *rect = wind->findChild<QObject*>("label");
    if (rect){
        qDebug()<< "FOUND";
    }
    */
    /*

    QQmlComponent component(&engine, QUrl("qrc:/test.qml"));
    QQuickItem *object = qobject_cast<QQuickItem*>(component.create());

    QQmlEngine::setObjectOwnership(object, QQmlEngine::CppOwnership);

    object->setParentItem(itm);
    object->setParent(&engine);

    object->setProperty("color", QVariant(QColor(255, 255, 255)));
    object->setProperty("txt", QVariant(QString("foo")));
    */

    auto code = app.exec();
    delete model;
    return code;
}
