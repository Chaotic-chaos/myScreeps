// harvester型劳工模块
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //优化逻辑，防止矿工背着能量采矿

        if(creep.memory.storing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.storing = false;
            creep.say('🔄 harvest');
        }

        if(!creep.memory.storing && creep.store.getFreeCapacity() == 0){
            creep.memory.storing = true;
            creep.say('🚧 stroing');
        }
	    if(!creep.memory.storing) {
            var sources = Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('Harvestering');
            }
        }
        else {
            //给spawn, extension, tower充能
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets){
                //存在上述建筑，移动到相关建筑并存储能量
                var target = Game.getObjectById(targets.id);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('Storing');
                }
            }
            else{
                //给contaioner充能
                var container = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
                if(container){
                    if(creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(container[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('Containing');
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;