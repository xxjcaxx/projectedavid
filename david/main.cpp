#include <QtGui/QGuiApplication>
#include "qtquick2applicationviewer.h"
<<<<<<< HEAD
#include <QtQuick/QQuickView>

#include "webcam.h"
#include "../shared/shared.h"
=======

#include "webcam.h"

>>>>>>> f517c1e465b2ec0fab640b212e6611dfb617d5fb
int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    qmlRegisterType<Webcam>("OpenGLUnderQML", 1, 0, "Webcam");          //Registrem un element QT pre usar-lo com a element QML
    //  Nom de la clase ^     ^ Nom de la biblioteca   ^ Nom del type


<<<<<<< HEAD
    //QtQuick2ApplicationViewer viewer;
    //viewer.setMainQmlFile(QStringLiteral("proyectoDavid.qml"));
    QQuickView view;
    view.setResizeMode(QQuickView::SizeRootObjectToView);
    view.setSource(QUrl("qrc:///projectedavid/proyectoDavid.qml"));
    view.show();

    //viewer.showExpanded();
=======
    QtQuick2ApplicationViewer viewer;
    viewer.setMainQmlFile(QStringLiteral("qml/david/main.qml"));


    viewer.showExpanded();
>>>>>>> f517c1e465b2ec0fab640b212e6611dfb617d5fb

    return app.exec();
}
