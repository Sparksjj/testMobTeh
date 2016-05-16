/*scroll*/
jQuery(document).ready(function(){
    jQuery('.scrollbar-inner').scrollbar();
});

/*hide show user info panel*/
$("#toggle-user-info").on("click", function(){
	$("#user-info").slideToggle();
});

/*hide show userspanel*/
var position = "";
$("#hide-show-button").on("click", function(){

	$(".scrollbar-inner").fadeToggle();	

	if (position) {
		position = "";
	}else{
		position = "200px";
	};
	$("#hide-show-button").animate({left: position}, 200);
});

/*swich repost/new*/

$("#center-block > .list-inline li").eq(0).on("click", function(){
	$("#add-file").css("display", "block");
	$("#repost").css("display", "none");
	$("#center-block > .list-inline li").eq(0).css({"background-color": "#5c5fc9", "color": "#fff"});
	$("#center-block > .list-inline li").eq(1).css({"background-color": "#fff", "color": "#5c5fc9"});
})
$("#center-block .list-inline li").eq(1).on("click", function(){
	$("#add-file").css("display", "none");
	$("#repost").css("display", "block");
	$("#center-block > .list-inline li").eq(1).css({"background-color": "#5c5fc9", "color": "#fff"});
	$("#center-block > .list-inline li").eq(0).css({"background-color": "#fff", "color": "#5c5fc9"});
})

/*clock help*/

/*Calendar===>>>*/
function Calendar(id, year, month) {
	var intMonth = month;
	var Dlast = new Date(year, month+1, 0).getDate();
	var D = new Date(year, month, Dlast);
	var DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay();
	var lastMonthDate = 0;

	if (DNlast) {
		lastMonthDate = 7-DNlast;
	}

	var DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
	var pustMonthDate = 0;

	if (DNfirst == 0) {
		pustMonthDate = 6;
	}else{
		pustMonthDate = DNfirst - 1;
	}
	
	var calendar = '<tr>';
	var month=["January","February","March","April","May","June","July","August","September","October","November","December"];

	for(var  i = 1 - pustMonthDate; i <= Dlast + lastMonthDate; i++) {

	  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
	    calendar += '<td class="today">' + i;
	  }else{
	  	if (i < 1 || i > Dlast) {
	  		var day = new Date(year, intMonth, +i).getDate();
	    	calendar += '<td class="notCurrent">' + day;
	  	}else{
	  		var day = new Date(year, intMonth, +i).getDate();
	    	calendar += '<td>' + day;	  		
	  	}
	  }

	  if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
	    calendar += '<tr>';
	  }

	}

	for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
	document.querySelector('#'+id+' tbody').innerHTML = calendar;
	document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
	
	if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  
	    document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
	}
}

Calendar("calendar", new Date().getFullYear(), new Date().getMonth());
// switch month
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
  Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
}
// switch month
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
  Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
}



/*drag ===>>>*/

	/*trigger input file event*/
$("#load-buttons li").eq(0).on("click", function(){
	$("#upload input").trigger('click');
})
$("#upload input").change(function() {
  previewfile( this.files[0]);
});


var holder = document.getElementById('load-image'),
    tests = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData
    }, 
    support = {
      filereader: document.getElementById('filereader'),
      formdata: document.getElementById('formdata'),
     
    },
    acceptedTypes = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true
    },
    oldData;

function previewfile(file) {
  if (tests.filereader === true && acceptedTypes[file.type] === true) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;

      initCrope(image);
    };

    reader.readAsDataURL(file);
  }  else {
    holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
  }
}

if (tests.dnd) { 
  holder.ondragover = function () { this.className = 'hover'; return false; };
  holder.ondragend = function () { this.className = ''; return false; };
  holder.ondrop = function (e) {
    this.className = '';
    e.preventDefault();
    previewfile(e.dataTransfer.files[0]);
  }
}



/*clean crope field*/
$("#download-control li").eq(1).on("click", function(){	
	returnDefault();
})


/*crop ====>>>*/

	/*crop url ====>>>*/

	$('#load-buttons li').eq(1).on('click', function(){
		$("#url-img-wrapper").slideToggle();
	})

	$("#url-img-wrapper button").on("click", function(){
		var src = $("#url-img-wrapper input").val();
		console.log(src)
		initCrope(src);
	})

function initCrope(img){
	
	cleanCrop();

	el = document.getElementById('load-image');
	var vanilla = new Croppie(el, {
    viewport: { width: 100, height: 100 },
    boundary: { width: "100%", height: 400 },
    showZoomer: true,
    enableOrientation: true
	});
	var src;
	if (typeof img == "string") {
		src = img;
	}else{
		src = img.src;
	}
	vanilla.bind({
	    url: src,
	});

	/*rotate buttons*/
	$("#cr-control-wrap").css("display", "block")
	$('.vanilla-rotate').on('click', function() {
		vanilla.rotate(parseInt($(this).data('deg')));
	});

	//on button click
	$("#download-control li").eq(0).on("click", function(){
		vanilla.result('canvas').then(function (src) {
			drowCroppieElement($("<img src='"+src+"'>"));
		});
	})
}


function cleanCrop(){
	if (!oldData) {
		oldData = $("#emptyMessage").detach();
		$("#load-image").css("padding", "0");		
	}else{
		$(".cr-boundary").add(".cr-slider-wrap").remove();
	};
		$("#load-image img").remove();
		$("#cr-control-wrap").css("display", "none")
}

function drowCroppieElement(img){
	cleanCrop();
	img.prependTo("#load-image");
	$("#download-control li").eq(0).unbind("click");
}

function returnDefault(){
	cleanCrop();
	oldData.prependTo("#load-image").css("padding-top", "33%");
	oldData="";
}