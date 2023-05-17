export const hitHandling = (text, currentSortList) => {
  const dataObj = {
    tagName: '未知',
    tagId: 0,
  };

  const textArr = text.split(' - ');

  if (textArr.length > 1 && +textArr[1]) {
    dataObj.tagName = textArr[0];
    dataObj.tagId = +textArr[1];
    return dataObj;
  }

  for (let index = 0; index < currentSortList.length; index++) {
    const currentSort = currentSortList[index];

    if (text.includes(currentSort.tagId)) return currentSort;
    if (text.includes(currentSort.tagName)) return currentSort;
  }

  return dataObj;
};

export const sortArr = [
  {
    tagName: '未知',
    tagId: 0,
  },
  {
    tagName: '女性盆腔解剖特点（掌握）',
    tagId: 100451,
  },
  {
    tagName: '女性腹腔、腹膜后及盆地解剖（了解）',
    tagId: 100452,
  },
  {
    tagName: '女性生理特点（掌握）',
    tagId: 100453,
  },
  {
    tagName: '妇产科常用药物的适应证、禁忌证、作用机制、不良反应及使用方法',
    tagId: 100454,
  },
  {
    tagName: '妇产科抗生素合理应用（掌握）',
    tagId: 100455,
  },
  {
    tagName: '妇产科相关辅助检查项目的原理、申请指证及结果判读',
    tagId: 100456,
  },
  {
    tagName: '妊娠期生理',
    tagId: 100457,
  },
  {
    tagName: '孕产妇女用药原则（掌握）',
    tagId: 100458,
  },
  {
    tagName: '计划生育专业基本理论知识',
    tagId: 100459,
  },
  {
    tagName:
      '妇科常见病、多发病的发病机制、临床特点、诊断与鉴别诊断要点、治疗原则及随访规范',
    tagId: 100460,
  },
  {
    tagName: '妇科复杂疾病的临床特点、诊断与鉴别诊断方法、治疗原则、随访方法',
    tagId: 100461,
  },
  {
    tagName:
      '妇产科常见危重急症的发病机制、临床特点、诊断与鉴别诊断、治疗及转诊原则、随访方法',
    tagId: 100462,
  },
  {
    tagName:
      '常见妇科良性肿瘤的临床特点、诊断与鉴别诊断、筛查手段、治疗原则及随访方法',
    tagId: 100463,
  },
  {
    tagName:
      '妇科常见恶性肿瘤的临床特点、诊断与鉴别诊断、治疗原则、手术指征及放化疗及生物调节治疗',
    tagId: 100464,
  },
  {
    tagName: '妇科内分泌疾病的病理生理、发病机制、诊断与鉴别诊断及治疗原则',
    tagId: 100465,
  },
  {
    tagName: '辅助生育技术的基本概念、方式方法、适应症、主要风险及伦理原则',
    tagId: 100466,
  },
  {
    tagName: '正常分娩与正常产褥的临床表现及观察处理',
    tagId: 100467,
  },
  {
    tagName: '病理妊娠的诊断及处理原则',
    tagId: 100468,
  },
  {
    tagName: '异常分娩识别和处理原则',
    tagId: 100469,
  },
  {
    tagName: '异常产褥的诊断与处理',
    tagId: 100470,
  },
  {
    tagName: '分娩期并发症的诊断与处理',
    tagId: 100471,
  },
  {
    tagName: '产前检查与孕妇保健',
    tagId: 100472,
  },
  {
    tagName: '妊娠合并内外科疾病的诊断、鉴别诊断、对母儿的危害与处理原则',
    tagId: 100473,
  },
  {
    tagName: '妊娠合并感染性疾病的诊断、对母儿的危害与处理原则',
    tagId: 100474,
  },
  {
    tagName: '胎儿异常的诊断与处理',
    tagId: 100475,
  },
  {
    tagName: '产前出血诊断、鉴别诊断与处理',
    tagId: 100476,
  },
  {
    tagName: '多胎妊娠',
    tagId: 100477,
  },
  {
    tagName: '新生儿疾病的识别与诊断、处理',
    tagId: 100478,
  },
  {
    tagName: '成人心肺复苏技术',
    tagId: 100479,
  },
  {
    tagName: '新生儿复苏技术',
    tagId: 100480,
  },
  {
    tagName:
      '妇科常见手术治疗的手术适应症手术禁忌症、输血原则、术前准备、术后处理原则、并发症预防与识别',
    tagId: 100481,
  },
  {
    tagName: '宫腔镜、腹腔镜手术的适应症、禁忌症、术前准备与术后处理',
    tagId: 100482,
  },
  {
    tagName: '正常分娩接生',
    tagId: 100483,
  },
  {
    tagName: '新生儿查体及处理',
    tagId: 100484,
  },
  {
    tagName:
      '产科常用操作及手术的适应症、禁忌症、手术步骤和手术前后的处理、并发症防治',
    tagId: 100485,
  },
  {
    tagName: '胎儿宫内安危检测方法',
    tagId: 100486,
  },
  {
    tagName: '分娩镇痛技术',
    tagId: 100487,
  },
  {
    tagName: '产前诊断的内容与方法',
    tagId: 100488,
  },
  {
    tagName:
      '计划生育手术操作适应证、禁忌证、手术步骤、术前准备、术后处理及注意事项、常见并发症识别与处理',
    tagId: 100489,
  },
];
