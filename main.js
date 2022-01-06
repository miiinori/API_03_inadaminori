// スライドショーのJS

$('.slider').slick({
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    slidesToShow: 3,//スライドを画面に3枚見せる
    slidesToScroll: 3,//1回のスクロールで3枚の写真を移動して見せる
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    dots: false,//下部ドットナビゲーションの表示
    responsive: [
      {
      breakpoint: 769,//モニターの横幅が769px以下の見せ方
      settings: {
        slidesToShow: 2,//スライドを画面に2枚見せる
        slidesToScroll: 2,//1回のスクロールで2枚の写真を移動して見せる
      }
    },
    {
      breakpoint: 426,//モニターの横幅が426px以下の見せ方
      settings: {
        slidesToShow: 1,//スライドを画面に1枚見せる
        slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
      }
    }
  ]
  });


// ここからインスタAPI
  $(function(){
    $.ajax({
        type: 'GET',
        url: 'https://graph.facebook.com/v5.0/【インスタビジネスアカウントID】?fields=name%2Cmedia.limit(6)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=【アクセストークン】',
        dataType: 'json',
        success: function(json) {
                 
            let html = '';
            let insta = json.media.data;
            for (let i = 0; i < insta.length; i++) {
            var media_type = insta[i].media_type;
                if ( insta[i].media_type == "IMAGE" || insta[i].media_type == "CAROUSEL_ALBUM" ) {
                html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><span class="square-content"><img src="' + insta[i].media_url + '"></span></a></li>';                
                } else if (media_type == "VIDEO" ) {
                html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><span class="square-content"><img src="' + insta[i].thumbnail_url + '"></span></a></li>';           
            var media_type = '';                    
                }       
            }
              $(".insta_list").append(html);            
        },
        error: function() {
  
        //エラー時の処理
        }
    });
});
 
