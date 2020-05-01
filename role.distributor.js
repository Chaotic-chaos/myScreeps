//分发者模块
/*
    主要工作：从link获取能量后分发到sapwn/extension
    转运目标：link -> spawn/extension
    参数：
        1. creep: creep对象
        2. linkID: 提取能量的link的ID，便于后期多房间管理，应指明取能量的地方
    使用：
        1. 引入：var roleDistributor = require('distributor');
        2. 使用：roleDistributor.run(creep, linkID)
*/

var roleDistributor = {
    run: function(creep, linkID){
        //状态判断
        if(creep.memory.distributing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.distributing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.distributing && creep.store.getFreeCapacity() == 0){
            creep.memory.distributing = true;
            creep.say('🚛 Storing');
        }

        if(creep.memory.distributing){
            //能量已满，需要分发
            var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure => structure.structureType == STURCTURE_SPAWN)});
            var extension = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STURCTURE_EXTENSION) && (structure.store.getFreeCapacity() > 0);
                }
            });
            if(spawn.store.getFreeCapacity() > 0){
                if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🚛');
                }
            }
            else{
                //优先填充spawn，次要目标是extension
                if(extension){
                    if(creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(extension, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🚛');
                    }
                }
            }
        }
        else{
            //能量不满，去link中提取能量
            var link = Game.getObjectById(linkID);
            if(creep.harvest(link) == ERR_NOT_IN_RANGE){
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('🔄');
            }
        }
    }
};

module.exports = roleDistributor;