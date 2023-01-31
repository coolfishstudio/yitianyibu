const CONST = {
  menus: [
    { title: 'Home', menu: 'index', to: '/index' },
    { title: 'Plan', menu: 'plan', to: '/plan' },
    { title: 'Archive', menu: 'archive', to: '/p' },
    { title: 'Labs', menu: 'labs', to: '/labs' }
    // { title: 'Message', menu: 'message', to: '/message' }
  ],
  tips: ['一切自己负责。指责他人也无济于事。',
    '舍弃自尊，凡事忍耐。',
    '简单地生活。要做的事，保持一点点就好。',
    '不对过去说谎。',
    '做被钱喜欢的工作，过被钱喜欢的生活。',
    '最重要的工作，是规律生活和健康管理。',
    '无论做什么事，都要想到下一个人。',
    '抢占先机、确认工序、准备充分、仔细作业。',
    '沟通，就是为了传达爱愿。',
    '幸福，是人与人之间深刻的联结，和深深的羁绊。',
    '不破坏，不失信。不汲汲以求，不放弃。',
    '栽培，守护，坚持。',
    '愈是小的承诺愈要信守。',
    '放大镜和望远镜。',
    '资讯就是自己的经验；知识则应适可而止。',
    '八胜七败的法则。',
    '看，再看，持续地看。',
    '交朋友的能力。',
    '为工作而玩。',
    '电视、报纸只从远处观望。',
    '不是‘为对方着想’，是‘想象力’。',
    '磨砺心智。为此读书、听音乐、欣赏戏剧、接触文化。',
    '成为问候高手。',
    '基本原则是：诚实、亲切、笑容。',
    '不竞争，不争夺。',
    '常对自己投资。为体验花钱。不用贫穷的方法学习。',
    '吃用心做的美味食物。',
    '要顾及到四周。不制造噪音，举止安静。',
    '重要的事写在信上。勤于动笔。',
    '培养上等的修养。手不插入口袋。',
    '想要伙伴，先制造敌人。',
    '要了解，孤独是生而为人的条件。',
    '常保指尖和手的清洁。',
    '去思考，这样做会给他人带来幸福吗？',
    '每日，换个设想。',
    '任何东西都要修缮。',
    '不只关注中间，也看周围。并去思考。',
    '与其读一百本书，不如把一本好书读一百遍。',
    '在自己擅长的领域深入下去不断磨炼、挑战。',
    '不为自己设限。',
    '贯彻自己的意图。',
    '始终保持坦诚，决不遗失初心。',
    '关键时刻不怯场的勇气。',
    '承蒙他人好意时就不要顾虑。坦率地接受好意，给足面子。',
    '有意识地使用美而恭敬的措辞。',
    '不随便对待钱包。不把钱包放在低处。',
    '任何事物，都当作重要的朋友接待。',
    '他人的话、社会的声音，要认真聆听。',
    '不断思考如何成为他人愿意共处的人。',
    '不问年龄，所遇者皆是我师。',
    '模仿、学习、赞扬尊敬的人。',
    '成为连接人与人的桥梁。',
    '知晓各领域的最好和最坏。',
    '重视朋友。',
    '不要根据价格评判‘贵’或‘便宜’。',
    '认真听他人讲话，持续、深入倾听。',
    '一周买一次花。',
    '两周剪一次头发。',
    '一年四次，享用当季美食。',
    '无论发生什么都不放弃。',
    '持续思考何为美。',
    '不买就什么也学不到，想知道的事要花大钱。',
    '不靠近免费的东西。',
    '恰如其分地交际，不做八面玲珑的人。',
    '重视家人，一年扫墓六次。',
    '桌上什么都不放，从一张白纸的状态开始工作。',
    '书是用来读的，不是装饰品。读了就可以处理掉。',
    '珍惜、享受、体味独处的时间。',
    '推进‘自我项目’。',
    '楼梯是一级级向上爬的。',
    '享受麻烦。',
    '思考的事情、想法，都写在纸上。',
    '不惧怕失败，做好‘失败笔记’。',
    '不使用‘绝对’‘普遍’这样的词。',
    '以1、2、3的节奏，如此反复。',
    '走路时端正姿势。挥动双手。抬头挺胸。',
    '想要得到别人的帮助，请先学会付出。',
    '不做温柔的人，也不做冷漠的人。',
    '爱是给予对方施展的空间。相爱是让双方都有这样的自由。',
    '学习历史，并从历史中学习。',
    '不交抱双臂或翘二郎腿。留意坐姿。',
    '不把‘没有钱’‘没有时间’放在嘴上。',
    '迷失的时候，选择更艰辛的那条路。',
    '尝试逆向思考。',
    '懂得刹车比会加速和操控方向盘更重要。',
    '随时调整平衡，心系协调之美。',
    '播种、浇水、培育、收获，做个农夫。',
    '永远提前15分钟。',
    '不要忘记传达感想。',
    '不谈论不在场的人。',
    '是生活而不是工作让我们之所以为人。',
    '清洁感比时髦更重要。服装表达着对他人的敬意。',
    '宁做失败者不做弱者。',
    '对厕所也要致谢。凡事都心存感激。',
    '不断思考如何能做得更好。',
    '身边若增加一件东西，就想办法减去一件。',
    '在寝具和家具上花钱不吝啬。',
    '为能说三种语言而努力。',
    '与时间做朋友。做为时间喜欢的工作，过被时间喜欢的生活。',
    '时常更新自己的‘基本’。'],
  STORAGE_AUTH_TOKEN: '__yitianyibu__auth__token__',
  CREATE_BLOG_TIME: {
    YEAR: 2016,
    MONTH: 2,
    DAY: 15
  },
  // 走 Github 的接口
  github: {
    host: 'https://api.github.com',
    // user: 'isaaxite', // 'coolfishstudio',
    // repository: 'blog', // 'coolfishstudio.github.io',
    user: 'berwin', // 'coolfishstudio',
    repository: 'Blog', // 'coolfishstudio.github.io',
    // user: 'coolfishstudio',
    // repository: 'coolfishstudio.github.io',
    perpage: 30,
    sort: 'created'
  }
}

export default CONST
