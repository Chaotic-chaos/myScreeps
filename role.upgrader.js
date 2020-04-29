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
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure => structure.structureType == STRUCTURE_CONTAINER)});
            if (container.store.getUsedCapacity() > 0) {
                //附近存在container
                // console.log(creep.withdraw(container))
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#ff0000' } });
                    creep.say('Containering');
                }
            }
            else {
                var sources = Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id);
                if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, { visualizePathStyle: { stroke: '#ff0000' } });
                    creep.say('Mining');
                }
            }
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