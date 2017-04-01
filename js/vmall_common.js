function D ( id ) {
	return document.getElementById( id );
}
function D_T ( id, tag_name ) {
	var obj = D( id );
	return obj.getElementsByTagName( tag_name );
}
$( function () {
	//二级菜单
	$( ".nav li" ).hover(function(){
		$( this ).addClass( "menu_h_bg" ).children("ul").show();
	}, function(){
		$( this ).removeClass( "menu_h_bg" ).children("ul").hide();
	});
} );