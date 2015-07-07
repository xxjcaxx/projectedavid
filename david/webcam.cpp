/****************************************************************************
**
** Copyright (C) 2014 Digia Plc and/or its subsidiary(-ies).
** Contact: http://www.qt-project.org/legal
**
** This file is part of the demonstration applications of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:LGPL21$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and Digia. For licensing terms and
** conditions see http://qt.digia.com/licensing. For further information
** use the contact form at http://qt.digia.com/contact-us.
**
** GNU Lesser General Public License Usage
** Alternatively, this file may be used under the terms of the GNU Lesser
** General Public License version 2.1 or version 3 as published by the Free
** Software Foundation and appearing in the file LICENSE.LGPLv21 and
** LICENSE.LGPLv3 included in the packaging of this file. Please review the
** following information to ensure the GNU Lesser General Public License
** requirements will be met: https://www.gnu.org/licenses/lgpl.html and
** http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html.
**
** In addition, as a special exception, Digia gives you certain additional
** rights. These rights are described in the Digia Qt LGPL Exception
** version 1.1, included in the file LGPL_EXCEPTION.txt in this package.
**
** $QT_END_LICENSE$
**
****************************************************************************/

#include "webcam.h"

#include <QtQuick/qquickwindow.h>
#include <QtGui/QOpenGLShaderProgram>
#include <QtGui/QOpenGLContext>
#include <QGraphicsPixmapItem>

/*

  1 Inicialitza la webcam, es connecta la senyal del window amb la de windowchanged per inicialitzar coses quant es connecten les pantalles
  2 el handlewindowchanged connecta la senyal beforesynchronizing amb la funció sync() amb una Direcconnection
  3 El timerevent va capturant y cridant a update(), la qual sincronitzarà i crida a la senyal beforesynchronizing que està connectada amb sync()
  4 sync, la primera vegada, crea el renderer i connecta la beforerendering amb la funció paint(). També encen la camara
  5 sync, la restade vegades, informa del tamany de la pantalla resizeGL redimensiona sense perdre la relació d'aspecte.
  6 El paint de webcamrenderer captura la imatge de la webcam i la mostra en opengl

Falta:
Afegir la detecció del rostre
Fer la captura, detecció i dibuix openGL en un fil per no sobrecarregar el programa principal
Transformar la captura en ordres del sistema operatiu com si apretares tecles


*/


// WEBCAM ***************************************************

Webcam::Webcam()
    : m_t(0)
    , m_renderer(0)
{
    connect(this, SIGNAL(windowChanged(QQuickWindow*)), this, SLOT(handleWindowChanged(QQuickWindow*))); // Connecta la senyal de la pantalla amb la webcam
    qDebug() << "Webcam inicializada";


}

void Webcam::setT(qreal t)  //T és una variable que no serveix per a res, però es veu cóm el qml la va modificant i cóm es crida a la funció de cambiar T i esta al update de la finestra, que cridarà al paint()
{
    if (t == m_t)
        return;
    m_t = t;
    emit tChanged();
   // if (window()) {window()->update(); /*qDebug() << m_t; */}
}

void Webcam::setX(int X)  // Posició X
{
    if (m_x == X)
        return;
    m_x = X;
    emit XChanged();
   // if (window()) {window()->update(); /*qDebug() << X; */}
}

void Webcam::setY(int Y)  // Posició Y
{
    if (m_y == Y)
        return;
    m_y = Y;
    emit YChanged();
// if (window()) { window()->update(); /*qDebug() << Y; */}
}

void Webcam::setW(int W)  // Width
{
    if (m_width == W)
        return;
    m_width = W;
    emit WChanged();
  //  if (window()) { window()->update(); /*qDebug() << W; */}
}

void Webcam::setH(int H)  // Posició Y
{
    if (m_height == H)
        return;
    m_height = H;
    emit HChanged();
   // if (window()) {window()->update(); /*qDebug() << H; */}
}

void Webcam::handleWindowChanged(QQuickWindow *win)
{
    if (win) {
        connect(win, SIGNAL(beforeSynchronizing()), this, SLOT(sync()), Qt::DirectConnection);
        connect(win, SIGNAL(sceneGraphInvalidated()), this, SLOT(cleanup()), Qt::DirectConnection);
        // If we allow QML to do the clearing, they would clear what we paint
        // and nothing would show.
        win->setClearBeforeRendering(false);
    }
    qDebug() <<"handlewindowchanged";
}

void Webcam::cleanup()
{
    if (m_renderer) {
        delete m_renderer;
        m_renderer = 0;
    }
    qDebug() <<"cleanup";
}

WebcamRenderer::~WebcamRenderer()
{
<<<<<<< HEAD
   delete m_program;
=======
   // delete m_program;
>>>>>>> f517c1e465b2ec0fab640b212e6611dfb617d5fb
}

void Webcam::opencamera()
{
    if( !mCapture.isOpened() ) { //abre la cámara opencv
         !mCapture.open( 0 );
            qDebug() <<"Camara abierta";
    }
    startTimer(0); // inicia un temporizador que va llamando a timerevent

}


void Webcam::sync()
{
    if (!m_renderer) {
        m_renderer = new WebcamRenderer();
        connect(window(), SIGNAL(beforeRendering()), m_renderer, SLOT(paint()), Qt::DirectConnection);
        opencamera();
    }
    m_renderer->setViewportSize(window()->size() * window()->devicePixelRatio());
    m_renderer->setT(m_t);
    m_renderer->setDimensions(m_x,m_y,m_width,m_height);
<<<<<<< HEAD
    cv::Mat image;
    mCapture >> image;  //Matriu de pixels de cv, pot ser no siga una imatge visible
    m_renderer->setIMG(image);
    qDebug() << m_x;
=======
  //  cv::Mat image;
  //  mCapture >> image;  //Matriu de pixels de cv, pot ser no siga una imatge visible
  //  m_renderer->setIMG(image);
  // qDebug() << m_x;
>>>>>>> f517c1e465b2ec0fab640b212e6611dfb617d5fb

}

void Webcam::timerEvent(QTimerEvent *event)
{
    cv::Mat image;
   mCapture >> image;

    // Do what you want with the image :-)
 m_renderer->setIMG(image);
    // Show the image
<<<<<<< HEAD
 m_renderer->paint();

 qDebug() << m_t;

 if (window()) { window()->update(); /*qDebug() << W; */}
=======
   // m_renderer->paint();

  //  qDebug() << m_t;
  if (window()) { window()->update(); /*qDebug() << W; */}
>>>>>>> f517c1e465b2ec0fab640b212e6611dfb617d5fb
}



// WEBCAMRENDERER ***************************************************


void WebcamRenderer::setIMG(cv::Mat orig){

     mOrigImage=orig;

}


void WebcamRenderer::initializeGL()
{
  //  makeCurrent();
    glClearColor(1.0f,0.0f,0.0f,1.0f);
}

void WebcamRenderer::setDimensions(int x,int y,int w, int h){
    m_x=x;
    m_y=y;
   // m_width=w;
   // m_height=h;
    resizeGL(w,h);
}

void WebcamRenderer::resizeGL(int width, int height)
{
 //   makeCurrent();
    glViewport(m_x, m_y, (GLint)width, (GLint)height);  //   void glViewport(GLint x,  GLint y,  GLsizei width,  GLsizei height); Posició i mida del dibuix

    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();

    glOrtho(0, width, 0, height, 0, 1);	// To Draw image in the center of the area

    glMatrixMode(GL_MODELVIEW);

    // ---> Scaled Image Sizes
   m_height = width/mImgRatio;
   m_width = width;

    if(m_height>height)
    {
        m_width = height*mImgRatio;
        m_height = height;
    }

    emit imageSizeChanged( mOutW, m_height);
    // <--- Scaled Image Sizes

   // m_x = (width-m_width)/2;
 //   m_y = (height-m_height)/2;
//qDebug() << mImgRatio;
//qDebug() << m_y;
    mSceneChanged = true;

   // updateScene();
}

void WebcamRenderer::updateScene()
{
   /* if( mSceneChanged)
        updateGL();*/
}


void WebcamRenderer::paint()
{

glClear(GL_COLOR_BUFFER_BIT);

   // image.copyTo(mOrigImage); // copyTo la copia per mantindre l'original

    mImgRatio = (float)mOrigImage.cols/(float)mOrigImage.rows;  // Cal saber la mida de la imatge

    if( mOrigImage.channels() == 3)  //la transforma a Qimage
        mRenderQtImg = QImage((const unsigned char*)(mOrigImage.data),
                              mOrigImage.cols, mOrigImage.rows,
                              mOrigImage.step, QImage::Format_RGB888).rgbSwapped();
    else if( mOrigImage.channels() == 1)
        mRenderQtImg = QImage((const unsigned char*)(mOrigImage.data),
                              mOrigImage.cols, mOrigImage.rows,
                              mOrigImage.step, QImage::Format_Indexed8);



    mSceneChanged = true;

    glPushMatrix();
    {

        QImage mResizedQtImg = mRenderQtImg.scaled( //this->size(),
                                     QSize(m_width,m_height),
                                     Qt::KeepAspectRatio,
                                     Qt::SmoothTransformation
                                     );




        mRenderQtImg = QGLWidget::convertToGLFormat(mResizedQtImg); //la transforma a una Qimage però compatible amb OpenGL


        //glRasterPos2i( m_x, m_y);
        glRasterPos2i( 0, 0);

        int imW = mRenderQtImg.width();
        int imH = mRenderQtImg.height();
        // qDebug() << m_x;

        glDrawPixels( imW, imH, GL_RGBA, GL_UNSIGNED_BYTE, mRenderQtImg.bits());
    }
    glPopMatrix();

    // end
    glFlush();
}
