'use strict';

/**
 * @ngdoc service
 * @name zcGdzcHelperApp.gdzc
 * @description
 * # gdzc
 * Service in the zcGdzcHelperApp.
 */
angular.module('zcGdzcHelperApp')
  .service('gdzc', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      /**
       * 根据领用人ID获取固定资产列表
       */
      listByLyr: function (lyrId) {
        var dtd = $q.defer();
        Nagu.Gdzc.listByLyr(lyrId).done(function (fss) {
          var ss = [];
          $.each(fss, function (i, fs) {
            ss.push(fs.Subject.ConceptId);
          });
          var ps = [
            Nagu.Gdzc.Predicates.Name,
            Nagu.Gdzc.Predicates.PicUrl,
            Nagu.Gdzc.Predicates.BelongTo
          ];
          Nagu.SM.findBySsPs2(ss,ps,{
            appId: Nagu.Gdzc.Predicates.AppId,
            keys: Nagu.Gdzc.Predicates.ReadKeys
          }).done(function(fss){
            var gdzcs = [];
            $.each(ss, function(i, s){                            // 组装每一个GDZC对象
              var fssById = $.grep(fss, function (fs) {
                return fs.Subject.ConceptId === s;
              });
              gdzcs.push(Nagu.Gdzc.fromFss(fssById));
            });
            dtd.resolve(gdzcs);
          });
        })
        return dtd.promise;
      }
    };
  });
