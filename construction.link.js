//link的建筑模块
/*
    主要工作：远程传送能量，尽量保证矿工走最少的路
    函数：
        1. remote(target)：检查当前link的能量容量是否已满，满则发送至target
    参数：
        1. targetID：要发送到达的目标
        2. currentID：起始link
    使用：
        1. 引入 var link = require('construction.link');
        2. 调用 link.remote(currentID, targetID);
*/

var constructionLink = {
    remote: function(currentID, targetID){
        //根据ID获取目标对象
        var current = Game.getObjectById(currentID);
        var target = Game.getObjectById(targetID);

        if(current.store.getUsedCapacity(RESOURCE_ENERGY) > 650){
            current.transferEnergy(target);
        }
    }
};

module.exports = constructionLink;