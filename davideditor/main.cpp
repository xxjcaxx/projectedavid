#include <QApplication>
#include <QWebSettings>
#include "html5applicationviewer.h"


int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    QWebSettings::globalSettings()->setAttribute(QWebSettings::DeveloperExtrasEnabled, true);

    Html5ApplicationViewer viewer;
    viewer.setOrientation(Html5ApplicationViewer::ScreenOrientationAuto);
    viewer.showExpanded();
    viewer.resize(1280, 800);
    viewer.loadFile(QLatin1String("html/index.html"));
    return app.exec();
}
