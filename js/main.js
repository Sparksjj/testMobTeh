/*scroll*/
jQuery(document).ready(function(){
    jQuery('.scrollbar-inner').scrollbar();
});

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
	
	if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
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
