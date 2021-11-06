var cb = document.getElementById("crop");
var tresh = document.getElementById("th");
var cnv = document.getElementById("submit");
var container = document.getElementById("container");

var image = document.getElementById("target");

image.ondragstart = function() { return false; };

//getting coordinates to crop image
container.onmousedown = function(event) {

    mousepos(event);
    clear();

    container.onmousemove = function(event) {

        mousepos2(event);

        container.onmouseup = function(event) {

            mousepos3(event);

            cropinit();
            checkpos();

        }

    }

}

var posx;
var posy;
var mx;
var my;
var ux;
var uy;
var lposx;
var lposy;
var lux;
var luy;

function checkpos() {
    if (posx > ux) {
        lposx = ux;
        lux = posx;

    } else {
        lposx = posx;
        lux = ux;
    }

    if (posy > uy) {
        lposy = uy;
        luy = posy;
    } else {
        lposy = posy;
        luy = uy;
    }
}



function mousepos(event) {
    let x = event.clientX - container.offsetLeft;
    let y = event.clientY - container.offsetTop;

    console.log("DOWN Coordinate x: " + x, "Coordinate y: " + y);

    posx = x;
    posy = y;

    console.log("POS x: " + x, "y: " + y);

}

function mousepos2(event) {
    let x = event.clientX - container.offsetLeft;
    let y = event.clientY - container.offsetTop;

    //console.log("Coordinate x: " + x, "Coordinate y: " + y);

    mx = x;
    my = y;
    //console.log("MOVE x: " + x, "y: " + y);
}

function mousepos3(event) {
    let x = event.clientX - container.offsetLeft;
    let y = event.clientY - container.offsetTop;

    console.log("UPPPPPPP Coordinate x: " + x, "Coordinate y: " + y);

    ux = x;
    uy = y;
    console.log("UX x: " + x, "y: " + y);
}

function cropinit() {

    var myc = document.getElementById("myCanvas");
    var context = myc.getContext("2d");
    var tc = document.getElementById("tc");

    var srcw = ux - posx;
    var srch = uy - posy;

    context.clearRect(0, 0, myc.width, myc.height);

    //(img,crop starting pt X,crop starting pt Y, WIDTH OF CROP, HEIGHT OF CROP, plotting x position, y position, plotted width, plotted height)

    context.drawImage(tc, posx, posy, srcw, srch);

    console.log("crop init");
}

function clear() {
    var myc = document.getElementById("myCanvas");
    var context = myc.getContext("2d");

    context.clearRect(0, 0, myc.width, myc.height);
}

function clearthresh() {
    var myc = document.getElementById("myCanvas3");
    var context = myc.getContext("2d");

    context.clearRect(0, 0, myc.width, myc.height);
}


//crop
cb.onclick = function() {

    var d = document.getElementById("default");
    d.style.visibility = "hidden";

    var c = document.getElementById("myCanvas2");
    var ctx = c.getContext("2d");
    var img = document.getElementById("target");


    r = img.naturalWidth / 1180;

    let nux = lux * r;
    let nuy = luy * r;
    let nposx = lposx * r;
    let nposy = lposy * r;


    var newsrcw = nux - nposx;
    var newsrch = nuy - nposy;

    ctx.clearRect(0, 0, c.width, c.height);
    clearthresh();
    //ctx.drawImage(img,crop starting pt X,crop starting pt Y, WIDTH OF CROP, HEIGHT OF CROP, plotting x position, y position, plotted width, plotted height)
    ctx.drawImage(img, nposx, nposy, newsrcw, newsrch, 0, 0, newsrcw, newsrch);



};
//grayscale -> threshold
tresh.onclick = function() {
    var c = document.getElementById("myCanvas3");
    var ctx = c.getContext("2d");

    var img = document.getElementById("myCanvas2");

    const v = document.getElementById("thv").value;



    if (v >= 0 && v <= 255) {
        ctx.clearRect(0, 0, c.width, c.height);
        // get the scale
        var scale = Math.min(c.width / img.width, c.height / img.height);
        // get the top left position of the image
        var x = (c.width / 2) - (img.width / 2) * scale;
        var y = (c.height / 2) - (img.height / 2) * scale;

        threshold = v;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        let imgData = ctx.getImageData(0, 0, img.width * scale, img.height * scale);
        let pixels = imgData.data;
        //grayscale
        for (var i = 0; i < pixels.length; i += 4) {

            let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

            pixels[i] = lightness;
            pixels[i + 1] = lightness;
            pixels[i + 2] = lightness;
        }
        ctx.putImageData(imgData, 0, 0);


        //threshold
        let d = ctx.getImageData(0, 0, c.width, c.height);
        for (var i = 0; i < d.data.length; i += 4) { // 4 is for RGBA channels
            // R=G=B=R>T?255:0
            //colors lighter than threshold value converted to white and darker than threshold value converted to black.
            d.data[i] = d.data[i + 1] = d.data[i + 2] = d.data[i + 1] > threshold ? 255 : 0;
        }

        ctx.putImageData(d, 0, 0);

    } else {
        alert("threshold value must be in between 0 and 255s");
    }


};

$('#submit').click(function(event) {
    var finalcanvas = document.getElementById("myCanvas3");
    //converting canvas to base 64 data url
    var dataURI = finalcanvas.toDataURL();
    //console.log(dataURI);

    dataURI = dataURI.replace("data:image/png;base64,", "");

    console.log(dataURI);

    var gg = document.getElementById("gg");
    gg.value = dataURI;
    event.preventDefault();
    var finaltext = document.getElementById("finaltext")
    var form_data = new FormData($('#uploadform')[0]);

    //sending base64 image url to python using ajax flask

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/uploadajax',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            console.log('Success!');
            console.log("reached")
            console.log(data);
            finaltext.innerHTML = data;

            download("download.txt", data);
            data = '';

        },
    });

})

//download text
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}