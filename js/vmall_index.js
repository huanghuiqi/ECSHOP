
function fadeIn(elem) {
	setOpacity(elem, 0)
	for ( var i = 0; i < 50; i++) {
		(function() {
			var pos = i * 2;				
			setTimeout(function() {
				setOpacity(elem, pos)
			}, i * 25);
		})(i);
	}
}
function fadeOut(elem) {
	for ( var i = 0; i <= 20; i++) {
		(function() {
			var pos = 100 - i * 5;
			setTimeout(function() {
				setOpacity(elem, pos)
			}, i * 25);
		})(i);
	}
}
// 设置透明度
function setOpacity(elem, level) {
	if (elem.filters) {
		elem.style.filter = "alpha(opacity=" + level + ")";
	} else {
		elem.style.opacity = level / 100;
	}
}
function toggle ( img_index ) {		
	var img_obj = D_T( "img_block", "img" );
	var small_icon = D_T( "small_icon", "li" );
	for ( var index = 0; index < img_obj.length; index++ ) {
		if ( index == img_index ) {
			fadeIn( img_obj[index] );
			img_obj[index].className = "show";
			small_icon[index].firstChild.style.background = "#f54545";
		} else {
			img_obj[index].className = "hide";
			small_icon[index].firstChild.style.background = "#ffac38";
		}
	}
	begin_index = img_index;
}

function loop () {
	if ( begin_index >= 4 ) {
		begin_index = -1;
	}
	begin_index++;
	toggle( begin_index );
}
var begin_index = -1;
var t;
window.onload = function () {
	t = setInterval( "loop()", 3000 );	
	D( "img_block" ).onmouseover = function () {			
		clearInterval( t );
	}
	D( "img_block" ).onmouseout = function () {
		t = setInterval( "loop()", 3000 );
	}	
}

$( function(){
	//三个产品推荐板块的选项卡
	$( "#new_bar_wrap > .tag > li, #best_bar_wrap > .tag > li, #hot_bar_wrap > .tag > li" ).mouseover( function(){	
		if ( $(this).parent().parent().attr( "id" ) == "best_bar_wrap" ) {
			var index = $( "#best_bar_wrap >.tag > li" ).index( $(this) );
		} else if ( $(this).parent().parent().attr( "id" ) == 'new_bar_wrap' ) {
			var index = $( "#new_bar_wrap >.tag > li" ).index( $(this) );
		} else if ( $(this).parent().parent().attr( "id" ) == "hot_bar_wrap" ) {
			var index = $( "#hot_bar_wrap >.tag > li" ).index( $(this) );				
		}					
		$( this ).removeClass( "sib_li" ).addClass( "current_tag" )
		.parent().width("976").css( { "border-bottom":"1px solid #c00" } ).end()
		.siblings().removeClass( "current_tag" ).addClass( "sib_li" );
		$(this).parent().siblings( "ul:eq(" + index + ")" ).show().siblings( "ul" ).hide();
	} );
	
	//所有推荐产品板块的边框高亮效果
	$( ".best_item > li, .hot_item > li, .new_item > li" ).hover( function(){	
		var this_width = $( this ).width();
		var this_height = $( this ).height();
		if ( $(this).find( ".bg_div" ).length > 0 ) {
			$(this).find( ".bg_div" ).remove();
		}
		$(this).append( "<div class='bg_div'></div>" ).find(".bg_div")
		.width( this_width ).height( this_height-5 )
		.css( { "border":"2px solid #a00", "z-index":"-5" } );	

	}, function () {
		if ( $(this).find( ".bg_div" ).length > 0 ) {
			$(this).find( ".bg_div" ).remove();
		}
	} );
	$( "#best_bar_wrap > .tag > li" ).triggerHandler( "mouseover" );
	$( "#new_bar_wrap > .tag > li" ).triggerHandler( "mouseover" );
	$( "#hot_bar_wrap > .tag > li" ).triggerHandler( "mouseover" );
} );