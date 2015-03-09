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

var el;
window.onload = function () {

    /*Las funciones del drag*/

    var dragger = function () {
        this.default_transform = this.transform();
        this.animate({"fill-opacity": .2}, 500);
    };

        move = function (dx, dy) {
            this.data("myset").transform(this.default_transform+'T'+dx+','+dy);
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            r.safari();

        };

        up = function () {
             this.default_transform = this.transform();
            this.animate({"fill-opacity": 0}, 500);
        };

    // Fin de las funciones de drag
    var container = $("#holder");
    r_width= container.width();
    r_height=container.height();
    r_x=0; r_y=0;

        r = Raphael("holder", r_width, r_height); //Crear el holder on dibuixar

    // Creació inicial de les shapes i les connexions

        connections = []; //Array de connexions
        shapes=[]; //Array de sets
        rW = 70;
        rH = 50;
        tx = 20;
        ty = rH - rH/4;

    for(i=0;i<6;i++){
        var color = Raphael.getColor();
        var rectangulo= r.rect(0,0, rW, rH, 5),
                texto=r.text(tx, ty,"Hola"),
                opcion1=r.ellipse(rW,rH/5,rW/20,rW/20),
                opcion2=r.ellipse(rW,rH/5*2,rW/20,rW/20),
                opcion3=r.ellipse(rW,rH/5*3,rW/20,rW/20),
                opcion4=r.ellipse(rW,rH/5*4,rW/20,rW/20);
        texto.attr({fill:"#FFF"});
        rectangulo.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
        opcion1.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 2, cursor: "move"});
        opcion2.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 2, cursor: "move"});
        opcion3.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 2, cursor: "move"});
        opcion4.attr({fill: color, stroke: "#fff", "fill-opacity": 100, "stroke-width": 2, cursor: "move"});
        var f=r.set([rectangulo,texto,opcion1,opcion2,opcion3,opcion4]); f.data("myset",f);
        shapes.push(f);
    }


    for (var i = 0, ii = shapes.length; i < ii; i++) {
        shapes[i].drag(move, dragger, up);
        shapes[i].data("myset").transform(this.defaul_transform+'T'+i*80+','+i*70);
    }

    connections.push(r.connection(shapes[0], shapes[1], "#fff",1));
    connections.push(r.connection(shapes[1], shapes[2], "#fff",1));
    connections.push(r.connection(shapes[1], shapes[3], "#fff",2));
    connections.push(r.connection(shapes[1], shapes[4], "#fff",3));
    connections.push(r.connection(shapes[1], shapes[5], "#fff",4));


    // using the event helper
    $('#holder').mousewheel(function(event) {
       // console.log(event.deltaX, event.deltaY, event.deltaFactor);
        var parentOffset = $(this).parent().offset();

        wa=r_width+20* event.deltaY*event.deltaFactor*-1;
        ha=r_height+20* event.deltaY*event.deltaFactor*-1;
        if( wa != 0 && ha!=0 ) {
            r.setViewBox(r_x, r_y, wa, ha, false);
            r_width=wa;
            r_height=ha;
        }
        console.log(event.deltaX, event.deltaY, event.deltaFactor, r_width, r_height, event.pageX, event.pageY);
    });


};
