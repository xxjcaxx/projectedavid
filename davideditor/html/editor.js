//  http://cancerbero.mbarreneche.com/raphaeltut/

Raphael.fn.connection = function (obj1, obj2, line, n, bg) { //(objecte1, objecte2, colorlinea, posició, background de la linia)
    if (n) { var nn= n;}
    if (obj1.line && obj1.from && obj1.to) { //si ha sigut cridada per un drag
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
        nn = line.nn;
    }

    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox();
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }

  //  console.debug(d);

    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;


    x1= bb1.x + bb1.width-bb1.width/20;
    y1= bb1.y + nn*bb1.height/5; // Falla, pero hay que ponerlo
    x4= bb2.x;
    y4= bb2.y+bb2.height/2;

  //  console.debug(nn);


    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);


    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2,
            nn: n
        };
    }
};


// Función para ampliar un cuadrado y permitir su edición:
function crear_set(rW,rH,tx,ty) {

    var color = "#555";
    var rectangulo= r.rect(0,0, rW, rH, 5),
            texto=r.text(tx, ty,"Hola"),
            entrada=r.ellipse(0,rH/2,rW/20,rW/20),
            opcion1=r.ellipse(rW,rH/5,rW/20,rW/20),
            opcion2=r.ellipse(rW,rH/5*2,rW/20,rW/20),
            opcion3=r.ellipse(rW,rH/5*3,rW/20,rW/20),
            opcion4=r.ellipse(rW,rH/5*4,rW/20,rW/20);
    texto.attr({fill:"#FFF"});
    rectangulo.attr({fill: color, stroke: color, "fill-opacity": 100, "stroke-width": 2, cursor: "move"});
    entrada.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 1, cursor: "move"});
    opcion1.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 1, cursor: "move"});
    opcion2.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 1, cursor: "move"});
    opcion3.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 1, cursor: "move"});
    opcion4.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 1, cursor: "move"});

    opcion1.mousedown(function(e){
        var bbox = this.getBBox();
        console.debug(bbox);
        drag_opcion(bbox.x,bbox.y+bbox.height/2,this.data("set"),1);
    });
    opcion2.mousedown(function(e){
        var bbox = this.getBBox();
        console.debug(bbox);
        drag_opcion(bbox.x,bbox.y+bbox.height/2,this.data("set"),2);
    });
    opcion3.mousedown(function(e){
        var bbox = this.getBBox();
        console.debug(bbox);
        drag_opcion(bbox.x,bbox.y+bbox.height/2,this.data("set"),3);
    });
    opcion4.mousedown(function(e){
        var bbox = this.getBBox();
        console.debug(bbox);
        drag_opcion(bbox.x,bbox.y+bbox.height/2,this.data("set"),4);
    });

    entrada.mouseup(function(e){
        var bbox = this.getBBox();
       // console.debug(bbox);
        this.attr({stroke: "#fff"});
        soltar_opcion(bbox.x,bbox.y+bbox.height/2,this.data("set"));
    });

    entrada.mouseover(function(e){ if(enlazando) this.attr({stroke: "#5f5"});});

    var f=r.set([rectangulo,texto,entrada,opcion1,opcion2,opcion3,opcion4]); f.data("myset",f); f.data("limites",rectangulo); f.data("ampliado",false);
    opcion1.data("set",f); entrada.data("set",f);
     opcion2.data("set",f); entrada.data("set",f);
     opcion3.data("set",f); entrada.data("set",f);
     opcion4.data("set",f); entrada.data("set",f);

    return f;
};


var enlazando=false;
var pos_enlazando=[];
var shape1_enlazando;
var path_enlace;

function drag_opcion(x,y,shape1,n){

    if(!enlazando){
    enlazando=true;
    pos_enlazando=[x,y,n];
    shape1_enlazando=shape1;

    p1= {x: pos_enlazando[0], y: pos_enlazando[1]}; cp1= {x: pos_enlazando[0]+50, y: pos_enlazando[1]};
    p2= {x: x, y: y};  cp2= {x: x-50, y: y};
    s="M"+p1.x+","+p1.y + 	/* begins in p1 */
                "C" + 					/* a cubic Bézier curve defined by */
                cp1.x+","+cp1.y +   	/* first control point cp1	*/
                ","+cp2.x+","+cp2.y +	/* second control point cp2 */
                ","+p2.x+", "+p2.y;		/* ends in p2 */
    path_enlace = r.path(s).attr({stroke:"#5F5"});


    }
    else{
    enlazando=false;

    }
    console.debug("drag",pos_enlazando);
};

function soltar_opcion(x,y,shape2){
console.debug("soltar",pos_enlazando,shape2,shape1_enlazando);
    if(!enlazando){


    }
    else{
    enlazando=false;
        connections.push(r.connection(shape1_enlazando, shape2, "#fff", pos_enlazando[2]));
        path_enlace.hide();

    }

};


ampliar = function (){
//console.debug(this.data("ampliado"));
    if(this.data("ampliado")){
        this.data("ampliado",false);
        this.data("myset").forEach(function(shape, index){
                shape.transform(shape.transform()+"s0.33,0.33");
            })

    } else {

        this.data("ampliado",true);
    var bbox= this.data("limites").getBBox();


    this.data("myset").forEach(function(shape, index){
            shape.transform(shape.transform()+"s3,3");
        })
   // console.debug(bbox);

    }

};


var el;
var connections = []; //Array de connexions
window.onload = function () {

    /*Las funciones del drag*/

    var dragger = function () {
        this.default_transform = this.transform();
        this.animate({"fill-opacity": .2}, 500);
    };

        move = function (dx, dy, x ,y, e) {
            if (e.which==1){
            this.data("myset").transform(this.default_transform+'T'+dx+','+dy);
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            r.safari();

}
           // console.debug(e.which);
        };

        up = function () {
             this.default_transform = this.transform();
            this.animate({"fill-opacity": 1}, 500);
        };

    // Fin de las funciones de drag
    var container = $("#holder");
    var r_width= container.width();
    var r_height=container.height();
    var r_x=0, r_y=0;

        r = Raphael("holder", r_width, r_height); //Crear el holder on dibuixar

    // Creació inicial de les shapes i les connexions


        shapes=[]; //Array de sets
        rW = 70;
        rH = 50;
        tx = 20;
        ty = rH - rH/4;

    for(i=0;i<6;i++){
        f = crear_set(rW,rH,tx,ty);
        shapes.push(f);
    }


    for (var i = 0, ii = shapes.length; i < ii; i++) {
        shapes[i][0].drag(move, dragger, up);
        shapes[i].dblclick(ampliar);
        shapes[i].data("myset").transform(this.default_transform+'T'+i*80+','+i*70);
    }

    connections.push(r.connection(shapes[0], shapes[1], "#fff",1));
    connections.push(r.connection(shapes[1], shapes[2], "#fff",1));
    connections.push(r.connection(shapes[1], shapes[3], "#fff",2));
    connections.push(r.connection(shapes[1], shapes[4], "#fff",3));
    connections.push(r.connection(shapes[1], shapes[5], "#fff",4));


    /*El moviment del DRAG de la pantalla amb el botó del mig del ratoli*/

    // using the event helper
    $('#holder').mousewheel(function(event) {

        wa=r_width+20* event.deltaY*event.deltaFactor*-1;
        ha=r_height+20* event.deltaY*event.deltaFactor*-1;
        if( wa > 0 && ha > 0 ) {
            r.setViewBox(r_x, r_y, wa, ha, false);
            r_width=wa;
            r_height=ha;
        }
        console.log(event.deltaX, event.deltaY, event.deltaFactor, r_width, r_height, event.pageX, event.pageY);
    });

    var dragg=false;
    var dragg_x, dragg_y;

   $('#holder').mousedown(function(e){
     if(e.which==2) { dragg=true; dragg_x=e.clientX; dragg_y=e.clientY;}

   });

   $('#holder').mouseup(function(e){
     dragg=false;
     if(enlazando){
         console.debug("UP",pos_enlazando,enlazando);
         enlazando=false;
         path_enlace.hide();
         pos_enlazando=[];
     }
   });



    $('#holder').mousemove(function(e){
        if(dragg){
            var parentOffset = $(this).offset();

            d_x=e.clientX - dragg_x;
            d_y=e.clientY - dragg_y;
            dragg_x=e.clientX; dragg_y=e.clientY;
            r_x= r_x-d_x;
            r_y= r_y-d_y;
            r.setViewBox(r_x, r_y, r_width, r_height, false);
            console.log(e.which,e.pageX,e.pageY,d_x,d_y);
           }


        //el enlazado

        if(enlazando){

            posx = e.pageX - $(document).scrollLeft() - $('#holder').offset().left;
            posy = e.pageY - $(document).scrollTop() - $('#holder').offset().top;

            p1= {x: pos_enlazando[0], y: pos_enlazando[1]}; cp1= {x: pos_enlazando[0]+50, y: pos_enlazando[1]};
            p2= {x: posx, y: posy};  cp2= {x: posx-50, y: posy};
            s="M"+p1.x+","+p1.y + 	/* begins in p1 */
                        "C" + 					/* a cubic Bézier curve defined by */
                        cp1.x+","+cp1.y +   	/* first control point cp1	*/
                        ","+cp2.x+","+cp2.y +	/* second control point cp2 */
                        ","+p2.x+", "+p2.y;		/* ends in p2 */
            path_enlace.attr({path: s});
          //  console.debug("Move",pos_enlazando,enlazando);
        }

    });


};
