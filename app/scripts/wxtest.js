/**
 * Created by 文琪 on 2015/1/16.
 */
function get_wxparams(){
  var dtd = $.Deferred();
  $.post("http://ngapi.ynu.edu.cn/wx/wx_config_params").done(function (result) {
    dtd.resolve(result);
  });
  return dtd.promise();
}

$(function(){
  get_wxparams().done(function(wxp){
    wxp.debug = true;
    wxp.jsApiList = [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ];
    wx.config(wxp);
    wx.ready(function(){
      wx.checkJsApi({
        jsApiList: ['chooseImage'],
        success: function (res) {
          alert(JSON.stringify(res));
        }
      });
    });
    wx.error(function(res){
      alert(res);
    });
  });
});
