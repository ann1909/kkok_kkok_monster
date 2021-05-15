$(function() {

  // --페이지를 이동하는 함수--
  function moveToPage(selector, page) {
    selector.on('click', function() {
      setTimeout(function() {
        // 여기에다가
        location.href = page;
      }, 300);
    });
  }

  // --버튼 애니메이션 끝난 후 페이지로 이동--
  function pushButton(selector, addclass) {
    selector.on('click', function () {
      $(this).addClass(addclass);
    });
  }

  // --오버레이 닫기 함수--
  function closeOverlay(selector) {
    $('.layer_button').on('click', function () {
      selector.removeAttr('style');
    });
  }

  // --오버레이 열기 함수--
  function openOverlay(clickButton, selector) {
    clickButton.on('click', function () {
      selector.css('display', 'block');
    });
  }

  // --INDEX-----------------------------------------------------------------------------------------
  let pinkBtn = 'btn_login_push';
  let blueBtn = 'btn_join_push';
  let greenBtn = 'btn_char_push';

  // 로그인 페이지로 이동
  let $indexLoginButton = $('#index .btn_login');
  pushButton($indexLoginButton, pinkBtn);
  moveToPage($indexLoginButton, "login.html");// move to login
  
  // 회원가입 페이지로 이동
  let $indexJoinButton = $('#index .btn_join');
  pushButton($indexJoinButton, blueBtn);
  moveToPage($indexJoinButton, "join.html");// move to join


  // --LOGIN-----------------------------------------------------------------------------------------
  // character 페이지로 이동
  let $loginLoginButton = $('#login .btn_login'); 
  pushButton($loginLoginButton, pinkBtn);
  moveToPage($loginLoginButton, "character.html"); // move to home


  // --JOIN-----------------------------------------------------------------------------------------
  // index 페이지로 이동
  let $joinJoinButton = $('#join .btn_join');
  pushButton($joinJoinButton, blueBtn);
  moveToPage($joinJoinButton, "index.html"); // move to index
  

  // --CHARACTER-----------------------------------------------------------------------------------------
  // 캐릭터 선택
  $('#character .char').on('click', function() {
    $(this).addClass('checked').siblings().removeClass('checked');

    // 캐릭터 선택했을 때 'set_char'이란 name을 가진 input 태그의 value값에 캐릭터 이름을 넣어줌
    $('#set_char').val($(this).children().attr('alt'));
    
    // 캐릭터 선택했을 때 캐릭터 설명 바꿈
    let char_des_array = [
      '안녕 나는 체리둥이몬이야! 나랑 같이 몬스터 친구들을 구하러 가자~',
      '안녕 나는 밥풀몬이야! 나랑 같이 몬스터 친구들을 구하러 가자~'
    ];

    if ($(this).children().attr('alt') == '체리둥이몬') 
      $('#character .char_des > p').html(char_des_array[0]);
    else 
      $('#character .char_des > p').html(char_des_array[1]);
  
  });// .char click event

  // home 페이지로 이동
  let $charCharButton = $('#character .btn_char');
  pushButton($charCharButton, greenBtn);
  moveToPage($charCharButton, "home.html"); // move to home


  // --HOME-----------------------------------------------------------------------------------------
  // a 태크로 했을 시 버튼 누르는 애니메이션이 잘 보이지 않아서 시간을 주려고 button 태그에 클릭 이벤트 사용
  
  // 꼭꼭몬 구하기 페이지로 이동
  let $homeGameButton = $('#home .btn_game');
  pushButton($homeGameButton, pinkBtn);
  moveToPage($homeGameButton, "game.html");// move to game
  
  // 꼭꼭몬 마을 페이지로 이동
  let $homeMonButton = $('#home .btn_mon');
  pushButton($homeMonButton, blueBtn);
  moveToPage($homeMonButton, "monster.html");// move to monster
  
  // 캐릭터 변경 페이지로 이동
  let $homeMycharButton = $('#home .btn_mychar');
  pushButton($homeMycharButton, greenBtn);
  moveToPage($homeMycharButton, "profile.html");// move to character

  // 가이드 보기
  let homeOverlay = $('#home .overlay');
  openOverlay($("#home .btn_guide"), homeOverlay);

  // 가이드 닫기
  closeOverlay(homeOverlay);

  // 로그아웃
  $('#home .btn_logout').on('click', function () {
    location.href = 'index.html';
  });


   // --MONSTER-----------------------------------------------------------------------------------------
  // 몬스터 북 보기
  let monBookOverlay = $('#monster .monster_book_layer');
  openOverlay($('#monster .btn_book'), monBookOverlay);

  // 몬스터 북 닫기
  closeOverlay(monBookOverlay);

  // 여러번 참조할 객체
  let monInfoOverlay = $('#monster .monster_info_layer');
  let monster = $('#monster .mon');
  let bookMonster = $('.book_row > .item');
  let monInfoImg = $('.monster_info > img');
  let monName = $('.mon_name');
  let monDes = $('.monster_info_layer p');

  // 몬스터 정보
  let monInfo = [
    { name: '체리둥이몬', des : '안녕 나는 체리둥이몬이야! 나는 체리체리해 그리고 힘들어!', src : 'images/체리둥이몬.png' },
    { name: '밥풀몬', des : '안녕 나는 밥풀몬이야! 나는 밥풀밥풀해 그리고 힘들어!', src : 'images/밥풀몬.png' }
  ];

  // 몬스터 정보 보기
  // - 마을에서 보기
  openOverlay(monster, monInfoOverlay);
  // - 도감에서 보기
  openOverlay(bookMonster, monInfoOverlay);

  // 몬서트 정보 닫기
  closeOverlay(monInfoOverlay);

  // '꼭꼭몬 마을'에서 몬스터를 눌렀을 때 눌러진 꼭꼭몬에 따라 이름과 설명이 달라지게 함
  monster.on('click', function () {
    // 몬스터 이미지 바꾸기
    var src = $(this).children().first().attr('src');
  
    // 몬스터 이름 바꾸기
    switch (src) {
      case 'images/체리둥이몬.png':
        monName.html(monInfo[0].name); 
        monDes.html(monInfo[0].des);
        monInfoImg.attr('src', monInfo[0].src);
        break;
      case 'images/밥풀몬.png':
        monName.html(monInfo[1].name);
        monDes.html(monInfo[1].des);
        monInfoImg.attr('src', monInfo[1].src);
        break;
    }
  }); // monster.on.click

  // '몬스터 도감'에서 몬스터를 눌렀을 때 눌러진 꼭꼭몬에 따라 이름과 설명이 달라지게 함
  bookMonster.on('click', function () {
    var src = $(this).children().first().children().attr('src');

    switch (src) {
      case 'images/book01.png':
        monName.html(monInfo[0].name); 
        monDes.html(monInfo[0].des);
        monInfoImg.attr('src', monInfo[0].src);
        break;
      
    }
  }); // bookmonster.on.click


  // --GAME-----------------------------------------------------------------------------------------
  // 게임 타이머
  var timerId;

  // 캐릭터 움직임 타이머
  var fightTimerId;

  // 배경음악
  var bgm = document.querySelector('#audio');

  // --게임 시작 레이어--
  let $firstOverlay = $('#game .first_overlay');
  let $secondOverlay =  $('#game .second_overlay');
  
  // 첫 레이어 
  setTimeout(function () {
    $firstOverlay.css('display', 'block');
  }, 100);

  // 첫 레이어의 확인 버튼을 누르면 두번째 레이어 표시
  $firstOverlay.find('.layer_button').on('click', function() {
    $firstOverlay.removeAttr('style');
    
    $secondOverlay.css('display', 'block');
  });// first.layer_button.on.click

  // 두번째 레이어 닫기
  // 두번째 레이어가 닫히면 게임시작(타이머 시작)
  $secondOverlay.find('.layer_button').on('click', function() {
    $secondOverlay.removeAttr('style');
    document.querySelector('audio').play();
    timerId = setInterval(gameTimer, 1000);
    fightTimerId = setInterval(fightMonster, 3000);
  });// second.layer_button.on.click
  

  // --게임 음악--
  $('#game .no_music').on('click', function() {
    if ($(this).attr('src') == 'images/music.png') {
      $(this).attr('src', 'images/no_music.png');
      bgm.pause();
    } 
    else {
      $(this).attr('src', 'images/music.png');
      bgm.play();
    }
  });


  // --응원문구--
  let cheerup = [
    '꼭꼭 씹어 먹어요~',
    '매우 잘하고 있어요~!',
    '꼭꼭몬을 같이 구해봐요!',
    '휴 집에 가고싶다.'
  ];

  var turn = 0;
  setInterval(function () {
    $('#game .cheerup').html(cheerup[turn]);
    turn++;
    if(turn == cheerup.length) turn %= cheerup.length;
  }, 5000);
  
  
  // --일시 정지 & 타이머--
  // DB에 저장된 시간을 time에 넣기
  var time = 100;
  var min = "";
  var sec = "";
  
  function gameTimer() {
    min = parseInt(time/60);
    sec = time%60;
    
    var fakeMin = '';
    var fakeSec = '';
    var result;

    // 시간 00:00에 맞춤
    if (min < 10) {
      fakeMin = '0' + min;
      if (sec < 10) {
        fakeSec = '0' + sec;
        result = fakeMin + ':' + fakeSec;
      } else result = fakeMin + ':' + sec;
    } else {
      if (sec < 10) {
        fakeSec = '0' + sec;
        result = min + ':' + fakeSec;
      } else result = min + ':' + sec;
    };

    $('.timer').html(result);
    
    time--;
    
    if(time < 0) clearInterval(timerId);
  } // gameTimer


  // 일시정지 버튼 플레이버튼으로 바꾸기 (일시정지 및 플레이 기능 포함)
  $('#game .timer_stop').on('click', function () {
    if ($(this).attr('src') == 'images/stop.png') {
      $(this).attr('src', 'images/play.png');
      clearInterval(timerId);
      clearInterval(fightTimerId);
      bgm.pause();
    } 
    else {
      $(this).attr('src', 'images/stop.png');
      timerId = setInterval(gameTimer, 1000);
      fightTimerId = setInterval(fightMonster, 3000);
      bgm.play();
    }
  }); // .timer_stop.on.click


  // 게임 끝 버튼
  $('#game .btn_gameover').on('click', function () {
    $('#game .monster_info_layer').css('display', 'block');
    clearInterval(timerId);
    clearInterval(fightTimerId);
    bgm.pause();
  }); // .btn_gameover.on.click

  // 게임이 끝나면 home 페이지로 이동 
  moveToPage($('#game .monster_info_layer .layer_button'), 'home.html');


  // --캐릭터 움직임 ------------------------------
  let myMonster = $('.myMonster');
  let badMonster = $('.badMonster');
  let attack = $('.attack');

  function fightMonster() {
    myMonster.css('transform', 'translateY(-5px)');
    
    attack.css({
      'visibility' : 'visible',
      'bottom' : '28%',
      'left' : '65%',
      'transition-duration' : '0.4s'
    });
  
    document.querySelector('#myMonster_audio').play();
  
    setTimeout(function() {
      myMonster.css('transform', 'translateY(5px)');
      badMonster.css('transform', 'scale(0.9)');

      document.querySelector('#badMonster_audio').play();
    }, 300);
  
    setTimeout(function() {
      attack.removeAttr('style');
      badMonster.css('transform', 'scale(1)');
    }, 600);
  }// fightMonster


  // 캐릭터 파워
  // 3초마다 이전 씹은 횟수와 현재씹은 횟수를 비교하여 게이지 상승
  
  // 현재 씹은 횟수 변수
  var chew = 0;
  
  function power(chewing) {
    // 이전 씹은 횟수
    var temp = chewing;

  }
  
  
  // --PROFILE-----------------------------------------------------------------------------------------
  // 사용자가 구해낸 몬스터 리스트가 들어가야 함
  var slideData = [
    {src : 'images/profile01.png', name : '체리둥이몬1'},
    {src : 'images/profile01.png', name : '체리둥이몬2'},
    {src : 'images/profile01.png', name : '체리둥이몬3'},
    {src : 'images/profile01.png', name : '체리둥이몬4'},
  ];

  // 슬라이드 아이템 리스트를 감싸는 역할
  let slideWrap = $('#profile .char_slider_wrap'); 
  
  // 감싸는 박스의 폭 결정
  var slideWidth = slideData.length * 100;

  // 폭 css 스타일 주기
  slideWrap.css('width', slideWidth + '%');

  // 사용자가 구해낸 몬스터만큼 슬라이드 아이템 생성
  function slidePrint() {
    slideData.forEach(function(vl, idx) {
      let slideItem = '<div class="char_slider_item">'
                    + '<img src="'+ vl.src +'">'
                    + '<h2>'+ vl.name +'</h2>'
                    + '</div>';

      slideWrap.append(slideItem);
    });
  }// slidePrint

  // slideprint 함수 호출
  slidePrint();

  // 화면에 보이는 캐릭터가 사용자가 선택한 캐릭터 이름
  // input #userCharChange의 value값으로 보내줌
  var updateChar = slideWrap.children().first().find('h2').text();

  // --버튼에 클릭 이벤트 발생시 슬라이드가 넘어감--
  // 이전 버튼 클릭
  $('.prev_btn').on('click', function() {
    $(this).children().attr('src', 'images/prev_on.png');
    $(this).siblings().children().attr('src', 'images/next.png');
    // slideWrap의 마지막 자식이 첫번째로 옴 
    slideWrap.children().last().prependTo(slideWrap);
    
    // #userCharChange value값으로 보낼 값
    updateChar = slideWrap.children().first().find('h2').text();

    console.log(updateChar);
  });

  $('.next_btn').on('click', function() {
    $(this).children().attr('src', 'images/next_on.png');
    $(this).siblings().children().attr('src', 'images/prev.png');
    // slideWrap의 첫번째 자식이 마지막으로 옴 
    slideWrap.children().first().appendTo(slideWrap);
    
    // #userCharChange value값으로 보낼 값
    updateChar = slideWrap.children().first().find('h2').text();

    console.log(updateChar);
  });

  // 이 값을 db users 테이블에 update!
  $('#userCharChange').val(updateChar);

});// on.ready