



var my_canvas = document.getElementById('my_canvas');
var context=my_canvas.getContext("2d");

var cutie = my_canvas.getBoundingClientRect();

var x1, y1, x2, y2;

var empty=true;
// mouse apasat
var m_apasat = true;

// seteaza o noua linie
function selecteaza_linie() {
    figura_selectata = 1;
}
// seteaza un nou dreptunghi
function selecteaza_dreptunghi() {
    figura_selectata = 2;
}
function crop(event){
	figura_selectata = 5;
}

// figura curenta care se deseneaza
var figura_selectata = 1;

// canvas temporar
var temp_canvas = document.createElement('canvas');
temp_canvas.width = 560;
temp_canvas.height = 300;

// pozitia in canvas x
function my_canvasX(ev) {
    this.X = ev.clientX - cutie.left;
    return this.X;
}
// pozitia in canvas y
function my_canvasY(ev) {
    this.Y = ev.clientY - cutie.top;
    return this.Y;
}
// eveniment la apasarea butonului de mouse
function mouseApasat(ev) {
    x1 = my_canvasX(ev);
    y1 = my_canvasY(ev);
    m_apasat = true;
   
}
my_canvas.addEventListener('mousedown', mouseApasat);

function preluare_coord(ev){
    x2 = my_canvasX(ev);
    y2 = my_canvasY(ev);
}

function mouse_eliberat(ev) {
    m_apasat = false;

    preluare_coord(ev);


    var xd=x2-x1;
    var yd=y2-y1;

        switch (figura_selectata) {
            case 1:
               deseneaza_linie();
              
                break;
            case 2:
                deseneaza_dreptunghi();
                break;
			case 5:
               
				temp_canvas.getContext("2d")
					.drawImage(my_canvas,x1,y1,x2-x1,y2-y1,  
                               0, 0,  x2 - x1,y2 - y1);
                            
                my_canvas.width= x2 - x1;
                my_canvas.height=y2 - y1;
               

            adauga_temp();
		}
    }

    function sterge_canvas(my_canvas){
            var context=my_canvas.getContext('2d');
        context.clearRect(0,0,my_canvas.width,my_canvas.height);
    }

    function adauga_temp(){
        var context=my_canvas.getContext("2d");
        if (temp_canvas!=null)
                context.drawImage(temp_canvas,0, 0, 560,300);
                
    }

    function deseneaza_linie(){
        context.strokeStyle = "#000000";
 
                // deseneaza linie
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.stroke();
              
    }
    function deseneaza_dreptunghi(){
        var xd=x2-x1;
        var yd=y2-y1;
        context.fillStyle = "#000000";
        context.fillRect(x1, y1,xd , yd);
    }
my_canvas.addEventListener('mouseup', mouse_eliberat);



function buton_salveaza() {

            var link = document.getElementById('link');
            link.setAttribute('download', 'desen.png');
             preluare_link(link,my_canvas);
             link1.click();

}
function dimensiune_canvas2(my_canvas_2){
    my_canvas_2.width = 1280;
    my_canvas_2.height = 800;
}

function preluare_link(link,canvas){
    var canv=canvas.toDataURL('image/png');
    link1=link.setAttribute('href', canv);
}


var fisier;
var citeste;
function imagine_trasa(ev) {
    
    imagine_trasa_peste(ev);
   
           var item= ev.dataTransfer.items[0];
            fisier=item.getAsFile();

            citeste = new FileReader();
            sterge_canvas(my_canvas);

            citeste.onload = incarca;
           preluareDataURL();
           
        
}
function preluareDataURL(){
    if(fisier!=null){
        citeste.readAsDataURL(fisier);
        }
}
function incarca(e){
    var img = document.createElement("img");
	img.onload =function(){
 
       var context=my_canvas.getContext("2d");
       if(context!=null){
        context.drawImage(img,0,0,img.width,img.height );
       }
        
      
   }	

if(e.target.result!=null){
img.src = e.target.result;


}

}
function redim_canvas(canvas,w,h){
    canvas.width=img.w;
     canvas.height=img.height.h;
   }

function imagine_trasa_peste(ev) {
    ev.preventDefault();
}
