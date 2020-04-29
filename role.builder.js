var roleBuilder = {

    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.say('Buinding');
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff00'}});
                }
			}
			else{
				//寻找当前房间的所有需要维护的建筑，并维护之
				//暂时废弃功能，维护工作交由tower，解放builder
				// var damage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				// 	filter: (structure) => structure.hits < structure.hitsMax
				// });
				// if(damage){
				// 	if(creep.repair(damage) == ERR_NOT_IN_RANGE){
				// 		creep.say('Repairing');
				// 		creep.moveTo(damage, {visualizePathStyle: {stroke: '#00ff00'}});
				// 	}
				// }
				// else{
					//当前房间没有建造点、维护建筑，去给container充能
					var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure => structure.structureType == STRUCTURE_CONTAINER)});
					if(container.store.getFreeCapacity() > 0){
						//存在container且有空间存储
						if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
							creep.moveTo(container);
							creep.say('Containing');
						}
					}
				// }
			}
	    }
	    else {
	        var sources = Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#00ff00'}});
            }
	    }
	}
};

module.exports = roleBuilder;