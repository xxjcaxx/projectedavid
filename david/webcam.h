#ifndef WEBCAM_H
#define WEBCAM_H


#include <QtQuick/QQuickItem>
#include <QtGui/QOpenGLShaderProgram>
#include <QtGui/QOpenGLFunctions>

#include <opencv2/core/core.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <opencv2/highgui/highgui.hpp>

 #include <QImage>

#include <QGLWidget>

class WebcamRenderer : public QObject, protected QOpenGLFunctions
{
    Q_OBJECT
public:
    WebcamRenderer() : m_t(0), m_program(0) { }
    ~WebcamRenderer();

    void setT(qreal t) { m_t = t; }
    void setViewportSize(const QSize &size) { m_viewportSize = size; }
    void opencamera();

public slots:
    void paint();

private:
    QSize m_viewportSize;
    qreal m_t;
    QOpenGLShaderProgram *m_program;

     cv::VideoCapture mCapture;
     cv::Mat     mOrigImage;
      QImage      mRenderQtImg;
bool        mSceneChanged;
     int         mOutH;                  /// Resized Image height
     int         mOutW;                  /// Resized Image width
     float       mImgRatio;             /// height/width ratio

     int         mPosX;                  /// Top left X position to render image in the center of widget
     int         mPosY;                  /// Top left Y position to render image in the center of widget
};

class Webcam : public QQuickItem
{
    Q_OBJECT
    Q_PROPERTY(qreal t READ t WRITE setT NOTIFY tChanged)

public:
    Webcam();

    qreal t() const { return m_t; }
    void setT(qreal t);

signals:
    void tChanged();

public slots:
    void sync();
    void cleanup();

private slots:
    void handleWindowChanged(QQuickWindow *win);

private:
    qreal m_t;
    WebcamRenderer *m_renderer;

};


#endif // WEBCAM_H
