//实现专有角色去给container充能
/*
    转运目标：mine -> container
    参数：
      1. creep：矿工对象
      2. mineID: 采矿点的id(这里让指定采矿点是为了以后方便管理)
    使用方式：
      1. 引入：var containerTransfer = require('role.containerTransfer');
      2. 使用：containerTransfer.run(creep, mineID)
*/

var roleContainerTransfer = {
    run: function(creep, mineID){
        // creep.memory.transfering = true;
        //校验当前creep身上携带的能量数是否已满，决定现在该干啥
        if(creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.transfering && creep.store.getFreeCapacity() == 0){
            creep.memory.transfering = true;
            creep.say('🚚 Storing');
        }

        //判断状态，进行工作
        if(creep.memory.transfering){
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER});
            if(container.store.getFreeCapacity() > 0){
                //附近有container并且尚且具备存储能力
                if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ff0000'}});
                    creep.say('🚚');
                }
            }
        }
        else{
            //采矿去
            var source = Game.getObjectById(mineID);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ff0000'}});
                creep.say('⛏️');
            }
        }
    }
};

//导出模块
module.exports = roleContainerTransfer;