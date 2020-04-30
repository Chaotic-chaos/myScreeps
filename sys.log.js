//尝试加入日志系统
var sysLog = {
    //函数1：打印当前存在的劳工数目
    currentCreeps: function(creepRole, creepCount){
        /*
            参数1：矿工角色
            参数2：该角色矿工数目
        */
        console.log('现在有 ' + creepRole + " 劳工 " + creepCount + " 个");
    },

    //函数2：判断并打印母巢（Spawn）当前正在做的工作以及状态
    spawnWorkStatus: function(spawnName, workingMessage, workStatusCode){
        /*
            参数1：母巢名
            参数2：母巢正在做的工作
            参数3：母巢上条工作的返回值
        */
       switch (workStatusCode) {
           case 0:
               console.log('刚刚名字为 ' + spawnName + ' 的母巢成功执行了 “' + workingMessage) + "”";
               break;
           case -1:
            console.log('刚刚名字为 ' + spawnName + ' 的母巢执行 “' + workingMessage + '” 失败，由于你不是该母巢 (spawn) 的所有者');
            break;
           case -3:
            console.log('刚刚名字为 ' + spawnName + ' 的母巢执行 “' + workingMessage + '” 失败，由于已经有一个叫这个名字的 creep 了');
            break;
           case -4:
                console.log('刚刚名字为 ' + spawnName + ' 的母巢执行 “' + workingMessage + '” 失败，由于这个母巢 (spawn) 已经在孵化另一个 creep 了');
                break;
           case -6:
            console.log('刚刚名字为 ' + spawnName + ' 的母巢执行 “' + workingMessage + '” 失败，由于这个母巢 (spawn) 和他的扩展包含的能量不足以孵化具有给定 body 的 creep');
            break;
           case -10:
            console.log('刚刚名字为 ' + spawnName + ' 的母巢执行 “' + workingMessage + '” 失败，由于Body 没有被恰当地描述');
            break;
           case -14:
                console.log('刚刚名字为 ' + spawnName + ' 的母巢执行 “' + workingMessage + '” 失败，由于您的房间控制器级别不足以使用此 spawn');
                break;
           default:
               break;
       }
    },

    //函数3：每个tick时间的开头打印一下标记
    newDay: function(){
        /*
            无参数
        */
       console.log('又是新的一天，祝搬砖快乐！');
    },

    //函数4： 紧急报警
    criticalAlert: function(title, description){
        //创建http对象
        var httpRequest = new XMLHttpRequest();
        //打开链接
        httpRequest.open('POST', 'https://sc.ftqq.com/SCU44734Tc79e0c4d145033cf8d45de746707e1955c6784f0a55fa.send', ture);
        //设置请求头
        httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //发送请求
        httpRequest.send('text=Test1&desp=Test1');
    }
}

module.exports = sysLog;