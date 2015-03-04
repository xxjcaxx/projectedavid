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
    void setDimensions(int x,int y,int w, int h);//funció per situar la posició i mida de la webcam
    void setViewportSize(const QSize &size) { m_viewportSize = size; }
    void setIMG(cv::Mat orig);
    void opencamera();

public slots:
    void paint();

signals:

    void    imageSizeChanged( int outW, int outH ); /// Used to resize the image outside the widget

protected:

    void 	initializeGL(); /// OpenGL initialization
    void 	paintGL(); /// OpenGL Rendering
    void 	resizeGL(int width, int height);        /// Widget Resize Event

    void        updateScene();
    void        renderImage();

private:
    QSize m_viewportSize;
    qreal m_t;
    int m_x,m_y,m_width,m_height;
    QOpenGLShaderProgram *m_program;



     cv::Mat     mOrigImage;
     QImage      mRenderQtImg;
     bool        mSceneChanged;
     int         mOutH;                  /// Resized Image height
     int         mOutW;                  /// Resized Image width
     float       mImgRatio;             /// height/width ratio

     int         mPosX;                  /// Top left X position to render image in the center of widget
     int         mPosY;                  /// Top left Y position to render image in the center of widget

         QColor      mBgColor;		/// Background color
};

class Webcam : public QQuickItem
{
    Q_OBJECT
    Q_PROPERTY(qreal t READ t WRITE setT NOTIFY tChanged)
    Q_PROPERTY(int x READ x WRITE setX NOTIFY XChanged)
    Q_PROPERTY(int y READ y WRITE setY NOTIFY YChanged)
    Q_PROPERTY(int width READ width WRITE setW NOTIFY WChanged)
    Q_PROPERTY(int height READ height WRITE setH NOTIFY HChanged)

public:
    Webcam();

    qreal t() const { return m_t; }
    int x() const { return m_x; }
    int y() const { return m_y; }
    int width() const { return m_width; }
    int height() const { return m_height; }
    void setT(qreal t);
    void setX(int X);
    void setY(int Y);
    void setW(int W);
    void setH(int H);

signals:
    void tChanged();
    void XChanged();
    void YChanged();
    void WChanged();
    void HChanged();

public slots:
    void sync();
    void cleanup();

private slots:
    void handleWindowChanged(QQuickWindow *win);

private:
    qreal m_t;
    int m_x,m_y,m_width,m_height;
    WebcamRenderer *m_renderer;
    cv::VideoCapture mCapture;
    void opencamera();
     void timerEvent(QTimerEvent *event);

};


#endif // WEBCAM_H
