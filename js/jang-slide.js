/**
 *! 프로그램 세팅값
 */
var container = '.jang-slide';
var stageViewDefault = 4;	// 스테이지에 보여질 개수 기준값
var moveCnt = 1; // 한번에 움직여 지는 수 // ? 아직 미구연 
var speed = 300;


/**
 *! 전역변수
 */

var $container = $(container);
var $stage = $container.find('.slide-stage');
var $wrapper = $container.find('.slide-wrapper');
var $slide = $container.find('.slide');
var $btPrev = $container.find('.bt-prev');
var $btNext = $container.find('.bt-next');
var $pagerWrapper = $container.find('.pager-wrapper');
var slideCnt = $slide.length; //슬라이드의 총 개수 length
var slideLast = slideCnt - 1; // 슬라이드의 마지막 index 
var slideWid;	// 반응형 - 슬라이드의 width
var stageView;	// 반응형 - 스테이지에 보여질 슬라이드 개수 - 변하는 값
var now = 0;
var direction = 1; //1: 오른쪽으로 이동(Prev) / -1: 외쪽으로 이동(Next)
var target;	// Animation($wrapper)될 left값



/**
 *! 사용자 함수(프로그램의 시작)
 */
function init() {
	$wrapper.empty().css("left", 0);
	$pagerWrapper.find('.pager').removeClass('active').eq(now).addClass('active');
	$slide.eq(now).clone().appendTo($wrapper).css("width", slideWid+"%");
	for(var i=0, my, prev=now; i<stageView; i++) {
		prev = my = (prev == 0) ? slideLast : prev - 1;
		$slide.eq(my).clone().prependTo($wrapper).css("width", slideWid+"%");
	}
	for(var i=0, my, prev=now; i<stageView*2-1; i++) {
		prev = my = (prev == slideLast) ? 0 : prev + 1;
		$slide.eq(my).clone().appendTo($wrapper).css("width", slideWid+"%");
	}
}

/* function slideAni(){
	$wrapper.stop().aminate({"left": direction * slideWid * moveCnt + "%"}, speed, init);
} */
function slideAni() {
	$wrapper.stop().animate({"left": target}, speed, init);
}



/**
 *! 이벤트 콜백
 */
    // 배너로 만들때 (var stageViewDefault = 1;	// 스테이지에 보여질 개수 기준값이 일때)
function onResize() {
	var wid = $(this).outerWidth(); //브라우저의 width.
	stageView = stageViewDefault;
	if(wid < 576) stageView = 1;
	else if(wid < 768) stageView = stageViewDefault < 2 ? stageViewDefault : 2;
	else if(wid < 992) stageView = stageViewDefault < 3 ? stageViewDefault : 3;
	else if(wid < 1200) stageView = stageViewDefault < 4 ? stageViewDefault : 4;
	slideWid = 100 / stageView;
	// console.log(stageView, slideWid);
	init();
}

/* function onResize() {
	var wid = $(this).outerWidth();
	stageView = stageViewDefault;
	if(wid < 576) stageView = (stageViewDefault - 4 < 1) ? 1 : stageViewDefault - 4;
	else if(wid < 768) stageView = (stageViewDefault - 3 < 1) ? 1 : stageViewDefault - 3;
	else if(wid < 992) stageView = (stageViewDefault - 2 < 1) ? 1 : stageViewDefault - 2;
	else if(wid < 1200) stageView = (stageViewDefault - 1 < 1) ? 1 : stageViewDefault - 1;

	slideWid = 100 / stageView;
	console.log(stageView, slideWid);
	init();
} */

/* 
	function onResize() {
	var wid = $(this).outerWidth();
	stageView = stageViewDefault;
	if(wid < 576) stageView = 1;
	else if(wid < 768) stageView = 2;
	else if(wid < 992) stageView = 3;
	else if(wid < 1200) stageView = 4;

	slideWid = 100 / stageView;
	init();
}
 */


function onPrev(){
	direction = 1;
	now = now == 0 ? slideLast : now - 1;
	slideAni();
}

function onNext(){
	direction = -1;
	now = now == slideLast ? 0 : now + 1;
	slideAni();
}

function onPager() {
	var old = now;
	now = $(this).index();
	if(old > now) {
		target = '100%';
		// 그림교체
		slideAni();
	}
	if(old < now) {
		target = '-100%';
		// 그림교체
		slideAni();
	}
}


/**
 *! 이벤트 등록
 */
$btPrev.click(onPrev);
$btNext.click(onNext);
for(var i=0; i<slideCnt; i++)
	$('<i class="pager"></i>').appendTo($pagerWrapper).click(onPager);

$(window).resize(onResize).trigger('resize');

