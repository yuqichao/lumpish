import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'

class DetailContent extends React.Component{
    constructor(props){
        super(props);
        this.data = [];
        console.log(this.props.route);
        this.state = {loading: true};
    }

    getAjaxData(){
        this.data = {
                id: 0,
                "title": "javascript中的this指向问题",
                "desc": "在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                "user": "solverpeng",
                "publish": "2016-08-10 14:15",
                "comment": "0",
                "read": "46",
                "prev": -1,
                "next": 1,
                "content": "<div id=\"Cnt-Main-Article-QQ\" bosszone=\"content\"><p align=\"center\"><img alt=\"男子岩穴支篷布住25年靠挖山药等生存 家人劝不回\" src=\"http://img1.gtimg.com/news/pics/hv1/202/137/2111/137302912.jpg\"></p><p class=\"pictext\" align=\"center\">龙泉洪安镇红光村的张美魁长期居住在山边大石下，靠挖山药等为生。</p><p align=\"center\"></p><p class=\"pictext\" align=\"center\"></p><p align=\"center\"></p><p class=\"pictext\" align=\"center\"></p><p align=\"center\"><img alt=\"男子岩穴支篷布住25年靠挖山药等生存 家人劝不回\" src=\"http://img1.gtimg.com/news/pics/hv1/223/137/2111/137302933.jpg\"></p><p class=\"pictext\" align=\"center\">回家前张美魁在旁边的水池里洗脚。</p><p style=\"TEXT-INDENT: 2em\">龙泉洪安镇红光村一组，一栋老旧的两层砖房就是张美魁的家。但他很少居住，尤其是近两年，几乎没有回去过，而是居住在红光村附近山里的一处岩穴下面。今年已经43岁的他自述，18岁就离家，随后的25年都居住在岩穴下面。为何不回家居住？他说，跟家人合不来，遭到父亲驱赶。</p><p style=\"TEXT-INDENT: 2em\">但据其父亲和村委会的人讲，张美魁虽然住到了山上，但时常回家住一段时间，只是近两年才完全不回家。</p><p style=\"TEXT-INDENT: 2em\"><strong>自述</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>在山里居住25年</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>靠挖山药等养活</strong></p><p style=\"TEXT-INDENT: 2em\">在红光村，如果直接询问“张美魁”，或许不会有太多人知晓，但要是提到“长毛”，则会有不少村民讲出点关于他的故事。他习惯光着脚，背上驮着一个破旧的背包，半秃的头顶留着一团长发，用橡胶带扎成一撮。“长毛”名字由此而来。</p><p style=\"TEXT-INDENT: 2em\">昨日，记者在红光村见到了他。个子不高，身材瘦小，背微驼，光着脚，背包里装着他刚从洛带买回的一大包花生，手里握着一个小锄头。说起话来声音忽大忽小，吐字也不太清楚。</p><p style=\"TEXT-INDENT: 2em\">“听说你一直住在山里？”“对，就在那边。”张美魁仰起头，右手指向远方。</p><p style=\"TEXT-INDENT: 2em\">“这些年就靠着给别人逮黄鳝、挖山药赚点钱生活。”张美魁称，早上四五点钟就起来找，挖到后再拿到洛带镇上的市场去卖。获得的钱买一些花生或水果带到山里作为食物，口渴就喝山里的泉水。</p><p style=\"TEXT-INDENT: 2em\">对于为何离家，张美魁称与家人合不来，遭到了父亲的驱赶，“嫌我吃饭吃得多，一回家就要打我，喊我走。”</p><p style=\"TEXT-INDENT: 2em\">张美魁上下山都会经过一个砖厂。据砖厂工人林先生介绍，张美魁确实住在山里，“我们晓得的就有七八年了，就挖些山药卖，冬天冷的时候，我们还给他衣服，也给了他不少方便面。”</p><p style=\"TEXT-INDENT: 2em\"><strong>探寻</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>岩穴下支起篷布</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>距离村子5公里</strong></p><p style=\"TEXT-INDENT: 2em\">昨日下午，记者跟随张美魁来到了他位于岩穴下面的“家”。从红光村出来，先开车4公里左右，来到一个砖厂，接着徒步上山。穿过几片树林，大概1公里就来到他居住的岩穴。岩穴上部是一块巨大的岩石，因为刚刚下了雨，岩石边缘还不时有水滴滴下。下方的凹穴内堆满了杂物，杂物上方铺着各种花纹的床单和废旧衣物，最外侧则用彩条塑料布围着。“这些都是从外边捡回来的。”张美魁说，“晚上睡觉就把篷布掀开，躺在上面，找几件废旧衣物盖在身上。”</p><p style=\"TEXT-INDENT: 2em\">篷布一侧还有一条小路，被全部铺上了一层废布，小路的一端是一个水池。张美魁称，平时喝水就从水池里舀。</p><p style=\"TEXT-INDENT: 2em\">张美魁称，离家后，在山上找蘑菇的时候发现了这个岩穴，随后便住到了这里。</p><p style=\"TEXT-INDENT: 2em\"><strong>家人</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>数次要其回家遭拒</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>近两年完全不回了</strong></p><p style=\"TEXT-INDENT: 2em\">“他确实是从18岁就走了，前些年还时常回家住一段时间，但最近两年就完全不回来了。”昨日下午，父亲张廷椂告诉记者。至于离家原因，张廷椂称，并非儿子讲的嫌他吃饭多、回家就打他，“而是他脑袋不清醒，说在家里就头疼。”这可能与儿子十多岁时的一场病有关，“当时他生病发高烧，在医院治了十多天，一直不见效，就把他从医院背了回来。”此后张廷椂发现，儿子的一些行为出现了异常，“好的时候什么事都没有，但不好的时候，说话怪怪的，行为也不太对。”</p><p style=\"TEXT-INDENT: 2em\">张廷椂说，儿子最后离家完全不归，缘于两年前的一场家庭纠纷。当时，弟媳在教育孩子的时候动手打了孩子，而张美魁认为侄女“是张家人，你没权利打”，争吵中双方动了手。期间，其弟弟朝他喊：“跟你没关系，给我爬！”这之后张美魁离家住到了山上，就再也没有回来过。</p><p style=\"TEXT-INDENT: 2em\">“这些年我们找了他无数次，喊他回来，但他不愿意。”张美魁母亲说，单单最近两年，家里至少上山20次求他回家，而张美魁都不为所动。</p><p style=\"TEXT-INDENT: 2em\">“他不回家还有个原因就是弟弟修了新房，他认为是他的钱修的，硬说房子应该归他，但修房子的钱是他弟弟自己攒下来的啊。”张廷椂补充说。</p><p style=\"TEXT-INDENT: 2em\"><strong>村委会</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>曾多次组织协调</strong></p><p style=\"TEXT-INDENT: 2em\"><strong>但结果不如人意</strong></p><p style=\"TEXT-INDENT: 2em\">昨日下午，记者在红光村村委会了解到，关于张美魁长期住在山上的事，村委也曾多次出面协调，但结果不如人意。</p><p style=\"TEXT-INDENT: 2em\">“调解的时候家人知道他（张美魁）要回来，还为他准备了饭。”村委会一工作人员表示，家人对张美魁其实还算不错。张美魁身有残疾，还办理了低保，之前一直是由父亲代领，大约一年前，张美魁要求这笔钱必须要发到自己手上。该工作人员称，对于其不回家，还有另外一个原因，张美魁认定目前弟弟所住的新房是由国家照顾残疾人专门修建，“除非弟弟一家搬出去，否则他就不会回去。”但国家并没有这样的政策。</p><p style=\"TEXT-INDENT: 2em\">对于张美魁自述在山上居住了25年，红光村村干部何先生表示，此前张美魁经常都在家里住，出去不回也就这两年。</p><p style=\"TEXT-INDENT: 2em\">成都商报记者 杜玉全</p><p style=\"TEXT-INDENT: 2em\">摄影记者 王勤 实习生 袁世峰</p><p style=\"TEXT-INDENT: 2em\"> </p> </div>",
                "img": "img/person.jpg"
            }
    }

    componentDidMount(){
        this.getAjaxData();
        this.setState({loading: false});
    }

    render(){

        if(this.state.loading){
            console.log('loading content');
            return <div></div>;
        }
        return (
            <div className="article-detail">
                <div className="detail-user clearfix">
                    <div className="user-img"><img src={this.data.img} /></div>
                    <div className="user-name">{this.data.user}</div>
                </div>
                <div className="detail-title">{this.data.title}</div>
                <div className="detail-desc">{this.data.desc}</div>
                <div className="detail-content" dangerouslySetInnerHTML={{__html: this.data.content}}></div>
                <div className="detail-nav clearfix">
                    <Link className="nav-prev" to={`article/${this.data.prev}`}>&lt;&lt;&nbsp;Prev</Link>
                    <Link className="nav-next" to={`article/${this.data.next}`}>Next&nbsp;&gt;&gt;</Link>
                </div>
            </div>
        )
    }
}

export default DetailContent;