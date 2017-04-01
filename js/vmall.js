function D ( id ) {
	var obj = document.getElementById( id );
	if ( obj ) {
		return obj;
	} else {
		return null;
	}
}
function D_T ( id, tag_name ) {
	var obj = D( id );
	if ( obj ) {
		return obj.getElementsByTagName( tag_name );
	} else {
		return null;
	}
}

function getEleByCName ( oNode, cName ) {
	var arr = [];
	var obj = null;
	if ( arguments.length == 2 ) {
		obj = oNode;
	}else {
		obj = document;
	}
	var allNode = obj.getElementsByTagName( "*" );
	for ( var i = 0; i < allNode.length; i++ ) {
		var re = new RegExp( "\\b" + cName + "\\b");
		if ( re.test( allNode[i].className ) ) {
			arr.push( allNode[i] );
		}
	}
	return arr;
}

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
	if ( begin_index >= img_obj.length - 1 ) {
		begin_index = -1;
	}
	begin_index++;
	toggle( begin_index );
}
var begin_index = -1;
var t;
var img_obj = small_icon = null;
window.onload = function () {
	
	/************首页轮播开始***************/
	img_obj = D_T( "img_block", "img" );
	small_icon = D_T( "small_icon", "li" );
	if ( img_obj  ) {
		t = setInterval( "loop()", 3000 );	
		D( "img_block" ).onmouseover = function () {			
			clearInterval( t );
		}
		D( "img_block" ).onmouseout = function () {
			t = setInterval( "loop()", 3000 );
		}
	}	
	/************首页轮播结束***************/
	
	/************首页导航开始***************/
	var oNav = document.getElementById( "menu" );
	if ( oNav ) {
		var aLi = oNav.getElementsByTagName( "li" );
		for ( var i = 0; i < aLi.length; i++ ) {
			aLi[i].onmouseover = function () {
				for ( var j = 0; j < aLi.length; j++ ) {
					if ( aLi[j].children[1] ) {
						aLi[j].children[1].style.display = "none";			
					}
					aLi[j].className = '';
				}
				this.className = "menu_h_bg";
				if ( this.children[1] ) {
					this.children[1].style.display = "block";				
				}
			}
		}
	}
	/************首页导航结束***************/
	
	/***********产品列表页开始*************/
	var oGoodsList = document.getElementById( "list" );
	if ( oGoodsList ) {
		var aItem = getEleByCName( oGoodsList, "item" );
		var aCart = getEleByCName( oGoodsList, "cart" );
		for ( var i = 0 ; i < aItem.length; i++ ) {
			aItem[i].onmouseover = function () {
				for ( var j = 0; j < aItem.length; j++ ) {
					aItem[j].style.borderColor = '#aaa';
				}
				this.style.borderColor = '#c00';
			}
		}
		for ( var i = 0; i < aCart.length; i++ ) {
			aCart[i].onmouseover = function () {
				for ( var j = 0; j < aCart.length; j++ ) {
					aCart[j].style.backgroundColor = 'white';
					aCart[j].style.color = '#c00';
				}
				this.style.backgroundColor = '#c00';
				this.style.color = '#fff';
			}
		}
	}
	/***********产品列表页结束************/
	
	/************详细页开始***************/
	var oGoodsDesc = document.getElementById( "goods_desc" );
	if ( oGoodsDesc ) {
		var aTag = getEleByCName( oGoodsDesc, 'tag' );
		var aTagLi = aTag[0].getElementsByTagName( "li" );
		var oDescDiv = document.getElementById( "desc" );
		var aDescDiv = oDescDiv.getElementsByTagName( "div" );		
		for ( var i = 0; i < aTagLi.length; i++ ) {
			aTagLi[i].index = i;
			aTagLi[i].onmouseover = function () {
				for ( var j = 0; j < aTagLi.length; j++ ) {
					aTagLi[j].className = 'sib_li';
					aDescDiv[j].style.display = "none";
				}
				aDescDiv[this.index].style.display = "block";
				this.parentNode.style.width = "750px";
				this.parentNode.style.borderBottom = "1px solid #c00";
				this.className = "current_tag";
			}
		}		
		aTagLi[0].parentNode.style.width = "750px";
		aTagLi[0].parentNode.style.borderBottom = "1px solid #c00";
		aTagLi[0].className = "current_tag";
	}
	/************详细页结束***************/
}