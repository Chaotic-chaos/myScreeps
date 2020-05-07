//升级型劳工
var roleUpgrader = {
    run: function (creep) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('🚧 upgrade');
        }
        

        if (creep.memory.upgrading) {
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff0000' } });
                }
            }
        }
        else {
            //寻找附近的container
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.id == 'f03c5c53d1b9276') && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if (target) {
                //附近存在container
                // console.log(creep.withdraw(target, RESOURCE_ENERGY))
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                    creep.say('Containering');
                }
            }
            //取消了upgrader的挖矿功能，老老实实等着人给喂饭
            // else {
            //     var sources = Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id);
            //     if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(sources, { visualizePathStyle: { stroke: '#ff0000' } });
            //         creep.say('Mining');
            //     }
            // }
        }


        // if(creep.store[RESOURCE_ENERGY] == 0){
        //     var sources = creep.room.find(FIND_SOURCES);
        //     var sources = creep.room.find(FIND_SOURCES);
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff0000'}});
        //     }
        // }
        // else{
        //     if(creep.room.controller){
        //         if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
        //             creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff0000'}});
        //         }
        //     }
        // }
    }
}

module.exports = roleUpgrader