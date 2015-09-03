// Global JS
// Order CountDown
var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
function countdown(yr,m,d){
	theyear=yr;themonth=m;theday=d
	var today=new Date()
	var todayy=today.getYear()
	if (todayy < 1000) todayy+=1900
	var todaym=today.getMonth()
	var todayd=today.getDate()
	var todayh=today.getHours()
	var todaymin=today.getMinutes()
	var todaysec=today.getSeconds()
	var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
	futurestring=montharray[m-1]+" "+d+", "+yr
	dd=Date.parse(futurestring)-Date.parse(todaystring)
	dday=Math.floor(dd/(60*60*1000*24)*1)
	dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1)
	dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1)
	dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1)
	if(dday==0&&dhour==0&&dmin==0&&dsec==1){
		$('#time').text('');
		return
	} else {
		if(dhour < 10) dhour = '0'+dhour;
		if(dmin < 10) dmin = '0'+dmin;
		if(dsec < 10) dsec = '0'+dsec;
		$('#time').text(dhour+":"+dmin+":"+dsec);
	}
	setTimeout("countdown(theyear,themonth,theday)",1000)
}

function refreshtime() {
	seconds--;
	if(seconds==-01){seconds=59; minutes=minutes-1;} else minutes=minutes;
	if(seconds<=9) seconds="0" + seconds; time=(minutes<=9 ? "0" + minutes : minutes) + ":" + seconds;
	inter=setTimeout("refreshtime()", 1000);
	document.getElementById('minutes').innerHTML=minutes;
	document.getElementById('seconds').innerHTML=seconds;
	if(minutes=='00' && seconds=='00') { minutes=20; seconds=00;}
}




cntry_selector = '#country';
quantity_selector = '#int_product_count';

$(document).ready(function() {
	$(cntry_selector).on('change', function() {
		upd_int();
	});
	$(quantity_selector).on('keyup', function() {
		if ($(this).val() < 1) {
			$(this).val(1);
		}
		upd_int();
	});
 });

function upd_int() {
	curs 	= $(cntry_selector).val();
	count 	= $(quantity_selector).val();
	if($.isNumeric(count)){
		count 	= $(quantity_selector).val();
	}else{
		count = 1;
	}
	prod_info = $jsonData.prices[curs];
	total = (prod_info.price + prod_info.delivery_price + prod_info.tax_price);
	$(".int_price_show").text(prod_info.price * count + " " + prod_info.currency);
	$(".int_price_delivery").text(prod_info.delivery_price * count + " " + prod_info.currency);
	$(".int_price_total").text(total * count + " " + prod_info.currency);
	$(".int_price_old").text(prod_info.old_price * count + " " + prod_info.currency);
	
	$("#note_name b").text(prod_info.name_template);
	$("#note_phone b").text(prod_info.phone_template);
	$("#note_address b").text(prod_info.address_template);
	
	$("#product_count").val(count);
}





