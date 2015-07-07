// checksum 0xd721 version 0x9000c
/*
  This file was generated by the Html5 Application wizard of Qt Creator.
  Html5ApplicationViewer is a convenience class containing mobile device specific
  code such as screen orientation handling.
  It is recommended not to modify this file, since newer versions of Qt Creator
  may offer an updated version of it.
*/

#ifndef HTML5APPLICATIONVIEWER_H
#define HTML5APPLICATIONVIEWER_H

#include <QWidget>
#include <QUrl>

class QGraphicsWebView;

class Html5ApplicationViewer : public QWidget
{
    Q_OBJECT

public:
    enum ScreenOrientation {
        ScreenOrientationLockPortrait,
        ScreenOrientationLockLandscape,
        ScreenOrientationAuto
    };

    explicit Html5ApplicationViewer(QWidget *parent = 0);
    virtual ~Html5ApplicationViewer();

    void loadFile(const QString &fileName);
    void loadUrl(const QUrl &url);

    // Note that this will only have an effect on Fremantle.
    void setOrientation(ScreenOrientation orientation);

    void showExpanded();


    QGraphicsWebView *webView() const;

private:
    class Html5ApplicationViewerPrivate *m_d;
};

#endif // HTML5APPLICATIONVIEWER_H
