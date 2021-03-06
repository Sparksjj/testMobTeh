jQuery(document).ready(function(){
/*scroll init*/
	jQuery('.scrollbar-inner').scrollbar();


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

	/*floating menu*/
	var flag = true;
	$(document).scroll(function(){
		if($(this).scrollTop()>150 && flag){
			$(".top-menu").css({"position": "fixed", "width": "100%", "top": "-100px", "left": "0"}).animate({"top": "0", "left": "0"}, 200);
			flag= false;
		}else if($(this).scrollTop()<150 && !flag){	
			$(".top-menu").css({"position": "", "width": "", "top": "", "left": ""})
			flag= true;
		}
	})


	/*swich repost/new*/

	$("#center-block > ul.list-inline").on("click", "li", function(){
		$("#center-block > ul.list-inline li").css({"background-color": "#5c5fc9", "color": "#fff"});
		$(this).css({"background-color": "#fff", "color": "#5c5fc9"})

		if ($(this).text() == "Новый") {
			$("#add-file").fadeIn(100);
			$("#repost").fadeOut(100);
		}else{
			$("#add-file").fadeOut(100);		
			$("#repost").fadeIn(100);	
		};
		
	})


	/*clock help*/
	var currentTine = (new Date().getHours())+":"+(new Date().getMinutes());
	drowCurrentTime(currentTine);
	drowTimeHelp(currentTine);
	$("#calendar-section > p").on("click", function(){
		$("#time-options").slideToggle(200);
	});	

	$("#time-options").on("click", "li", function(){
		var newTime = $(this).text();
		drowCurrentTime(newTime)
		drowTimeHelp(newTime)

	})

	function drowCurrentTime(time){
		$("#calendar-section > p span").text(time);
	}
	
	function drowTimeHelp(newTime){
		$("#time-options li").each(function(){
			var timeArr = newTime.split(":");
			if(timeArr[0] == 24){
				timeArr[0] = "00"
			}else if(timeArr[0]<9){
				timeArr[0] = +timeArr[0] +1;
				timeArr[0] = "0" + timeArr[0];
			}else{
				timeArr[0] = +timeArr[0] + 1;
			}
			newTime = timeArr.join(":")
			$(this).text(newTime)
		})
	}


	/*Calendar===>>>*/
	function Calendar(id, year, month) {
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
		var strMonth=["January","February","March","April","May","June","July","August","September","October","November","December"];

		for(var  i = 1 - pustMonthDate; i <= Dlast + lastMonthDate; i++) {

		  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
		    calendar += '<td class="today">' + i;
		  }else{
		  	if (i < 1 || i > Dlast) {
		  		var day = new Date(year, month, +i).getDate();
		    	calendar += '<td class="notCurrent">' + day;
		  	}else{
		  		var day = new Date(year, month, +i).getDate();
		    	calendar += '<td>' + day;	  		
		  	}
		  }

		  if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
		    calendar += '<tr>';
		  }

		}

		for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
		document.querySelector('#'+id+' tbody').innerHTML = calendar;
		document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = strMonth[D.getMonth()] +' '+ D.getFullYear();
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
	    acceptedTypes = {
	      'image/png': true,
	      'image/jpeg': true,
	      'image/gif': true
	    },
	    oldData;

	function previewfile(file) {
	  if (acceptedTypes[file.type] === true) {
	    drowSuccess("Преретащите сюда")

	    var reader = new FileReader();
	    reader.onload = function (event) {
	      var image = new Image();
	      image.src = event.target.result;
	      initCrope(image);
	    };

	    reader.readAsDataURL(file);
	  }  else {
	  	drowError('Не верный формат, загрузите')
	  }
	}

	if (typeof (window.FileReader)=='undefined') {
		$("#drop-mess").text('Загрузите');
	}else{
	  holder.ondragover = function () { $("#load-image").addClass("ondragover"); return false; };

	  holder.ondragleave = function () { $("#load-image").removeClass("ondragover"); return false; };

	  holder.ondrop = function (e) {
	    this.className = '';
	    e.preventDefault();
	    previewfile(e.dataTransfer.files[0]);
	  }		
	};




	/*clean crope field*/
	$("#download-control li").eq(1).on("click", function(){	
		returnDefault();
		$("#upload input")[0].value = "";
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
	function drowSuccess(mess) {
	    $("#drop-mess").text(mess);
	    $("#load-image").removeClass("drop-error");
	}

	function drowError(mess) {
	    $("#drop-mess").text(mess);
	    $("#load-image").addClass("drop-error");
	}


});