/**
 * Created by 文琪 on 2015/1/19.
 */

/**
 * 返回固定资产谓词定义
 * @returns {{AppId: string, ReadKeys: Array, Class: string, PicUrl: string, Bh: string, Date: string, Include: string, Fs: string, Location: string, Glr: string, Lyr: string, BelongTo: string, Guige: string, Xinghao: string, Price: string, Shul: string, Zongj: string, Status: string}}
 */
function nagu_gdzc_predicates_define(){

  /**
   * 固定资产相关谓词
   */
  return {
    AppId: 'bdbcc3d2-2950-4526-b73e-c87a6c21acc0',
    ReadKeys: ['960af7a3-0d5c-477b-a8d7-e4b1ae252d2e'],
    Class: 'e01085bf-a4a2-4ada-b39c-9519c3f25fe4',
    PicUrl: '3d512374-f87d-46f9-bad6-2d81fdbbe440', // 相关图片
    Bh: '9080c5f4-2eb7-444b-8c5e-eb81b68b7ea9', // 编号
    Date: '5f61c37e-8cfb-447d-84ee-ab81c35aca3d', // 购置日期
    Include: '32da0816-a12b-49fd-98b0-158f1ef61f62', // 包含资产
    Fs: '43296bf8-e83f-45fe-8b3c-ec031e2e9b9c', // 附属于
    Location: '9046c121-43e8-4573-a031-680e78170184', // 存放地点
    Glr: '9fdade80-c4a2-4e8c-9d05-a47bf608ae0f', // 管理人
    Lyr: '2d502a3e-c30d-4392-aff7-8c2301c8df55', // 领用人，SW node： http://sw.ynu.edu.cn/zc/predicates#Lyr
    BelongTo: 'eff3baf0-a911-456a-9b95-f7c01f6cb6af', // 所属部门
    Guige: 'ba5b04a7-47a2-4624-9708-4b0c79593390', // 规格
    Xinghao: 'b7e744b4-c69c-423a-967c-6710690693a9', // 型号
    Price: '87de68c5-e7b4-453b-9305-eb9834696961', //单价
    Shul: 'a0054203-7a99-46a1-ac1c-d99b72856a99', // 数量
    Zongj: 'c4ce1ec6-3d35-4896-9d4f-bee1263c7202', // 总价
    Status: '' // 固定资产使用状态


  }
}


/**
 * 返回固定资产管理接口
 * @param predicates
 * @returns {{listByGlr: Function, listByLyr: Function, getById: Function, fromFss: Function}}
 */
function nagu_gdzc_functions_define(predicates){
  return {
    /**
     * 根据管理人ID获取固定资产列表。
     * 仅获取固定资产的Id列表，无具体数据
     * @param glrId
     *
     */
    listByGlr: function(glrId){
      return Nagu.SM.findByPO(predicates.Glr, glrId, Nagu.MType.Concept, {
        appId: predicates.AppId,
        keys: predicates.ReadKeys
      });
    },

    /**
     * 根据领用人ID获取固定资产列表
     * 仅获取固定资产的ID列表，无具体数据
     * @param lyrId
     * @returns {*}
     */
    listByLyr: function(lyrId){
      return Nagu.SM.findByPO(predicates.Lyr, lyrId, Nagu.MType.Concept, {
        appId: predicates.AppId,
        keys: predicates.ReadKeys
      });
    },

    /**
     * 根据ID获取固定资产信息
     * @param gdzcId
     * @returns {*}
     */
    getById: function(gdzcId){
      var ss = [gdzcId];
      var ps = [predicates.PicUrl,
        predicates.Bh,
        predicates.Date,
        predicates.Include,
        predicates.Fs,
        predicates.Location,
        predicates.Glr,
        predicates.Lyr,
        predicates.BelongTo,
        predicates.Guige,
        predicates.Xinghao,
        predicates.Price,
        predicates.Shul,
        predicates.Zongj,
        Nagu.Rdf.Type
      ];

      var dtd = $.Deferred();
      Nagu.SM.findBySsPs2(ss, ps,{
        appId: predicates.AppId,
        keys: predicates.ReadKeys
      }).done(function(result){
        var fss = result.data;
        var gdzc = fromFss(fss);
        dtd.resolve(gdzc);
      });
      return dtd.promise();
    },

    /**
     * 从语句集合组装固定资产数据
     * @param fss
     * @returns {{}}
     */
    fromFss: function(fss){
      var gdzc = {};
      $.each(fss, function (i, fs) {                        // 循环读取每条语句
        if(!gzdc[fs.Predicate]){                             // 初始化字段
          gdzc[fs.Predicate] = [];
        }
        if(fs.Object.Value){                                 // 如果是文本类型，直接读取值
          gdzc[fs.Predicate].push(fs.Object.Value)
        } else {
          gdzc[fs.Predicate].push(fs.Object);                 // Concept类型
        }
      });
      return gdzc;
    }

  };
}


// 未来做成AMD/CMD通用组件
var nagu_gdzc_predicates = nagu_gdzc_predicates_define();
Nagu.Gdzc = nagu_gdzc_functions_define(nagu_gdzc_predicates);
Nagu.Gdzc.Predicates = nagu_gdzc_predicates;
