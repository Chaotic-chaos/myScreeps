//防御塔类
/*
    函数1：检测到进入范围的敌人自动攻击，以距离为准
    函数2：检测到范围内需要维修、保养的劳工自动进行维护，以距离为为准
    ...
*/

var constructionTower = {
    attack: function(tower){
        //攻击函数
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(hostile){
            tower.attack(hostile);
            tower.room.visual.text('⚔️ Attacking!', tower.pos.x+3, tower.pos.y);
        }

    },

    repair: function(tower){
        //维护函数
        if(tower.store[RESOURCE_ENERGY] > 0){
            var damage = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(damage){
                tower.repair(damage);
                tower.room.visual.text('🧰 Repairing!', tower.pos.x+2, tower.pos.y);
            }
        }

    }
}

module.exports = constructionTower;