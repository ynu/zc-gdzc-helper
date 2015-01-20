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
            Nagu.Rdfs.Label,
            Nagu.Rdfs.Comment,
            Nagu.Gdzc.Predicates.PicUrl
          ];
          Nagu.SM.findBySsPs2(ss,ps,{
            appId: Nagu
          })
          dtd.resolve(ss);
        })
        return dtd.promise;
      }
    };
  });
