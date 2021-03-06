var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleContainerTransfer = require('role.containerTransfer');
var roleDistributor = require('role.distributor');
var constructionTower = require('construction.tower');
var constructionLink = require('construction.link');
//日志系统
var sysLog = require('./sys.log');
//监控数据大盘
//失败，暂时搁置，等待后续研究
var sysStatusMonitor = require('sys.dataMonitor');

module.exports.loop = function () {
    //测试紧急提醒功能
    // console.log(sysLog.criticalAlert('111', '111'));

    //新的一天
    sysLog.newDay();

    //刷新大盘数据
    sysStatusMonitor.run();

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-exiting creeps: ' + name);
        }
    }

    //统计劳作型劳工
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //打印当前的劳作型劳工数目
    sysLog.currentCreeps('Harvester', harvesters.length);

    //统计升级型劳工
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //打印当前的升级型劳工数目
    sysLog.currentCreeps('Upgrader', upgrader.length);

    //统计建造型劳工
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //打印当前的建造型劳工数目
    sysLog.currentCreeps('Builder', builder.length);

    //统计转运型（container）劳工
    var containerTransfer = _.filter(Game.creeps, (creep) => creep.memory.role == 'containerTransfer');
    //打印当前的转运型（container）劳工数目
    sysLog.currentCreeps('containerTransfer', containerTransfer.length);

    //统计分发型劳工
    var distributor = _.filter(Game.creeps, (creep) => creep.memory.role == 'distributor');
    //打印当前的转运型（container）劳工数目
    sysLog.currentCreeps('distributor', distributor.length);

    //自动创建劳作型劳工
    if (harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        excLine = '生产劳作型矿工：' + newName;
        resCode = Game.spawns['home1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'harvester' } });
        //输出刚刚执行的语句的日志记录到控制台
        sysLog.spawnWorkStatus('home1', excLine, resCode);
    }

    // if(Game.spawns['home1'].spawning) { 
    //     var spawningCreep = Game.creeps[Game.spawns['home1'].spawning.name];
    //     Game.spawns['home1'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['home1'].pos.x + 1, 
    //         Game.spawns['home1'].pos.y, 
    //         {align: 'left', opacity: 0.8});
    // }
    //调整为最后统一输出当前正在创建劳工的情况

    //只有在劳作型劳工足够的情况下再创建其他劳工
    if (harvesters.length >= 1) {
        //如果升级型劳工多余3个，创建剪造型劳工，否则升级型劳工
        // if(upgrader.length < 3){
        //自动创建升级型型劳工
        if (upgrader.length < 2) {
            var newName = 'Upgrader' + Game.time;
            // console.log('Spawning new upgrader: ' + newName);
            excLine = '生产升级型矿工：' + newName;
            resCode = Game.spawns['home1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader' } });
            //输出刚刚执行的语句的日志记录到控制台
            sysLog.spawnWorkStatus('home1', excLine, resCode);
        }
        //自动创建转运型（container）劳工
        if (containerTransfer.length < 2) {
            var newName = 'containerTransfer' + Game.time;
            // console.log('Spawning new upgrader: ' + newName);
            excLine = '生产转运型（container）矿工：' + newName;
            resCode = Game.spawns['home1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                { memory: { role: 'containerTransfer' } });
            //输出刚刚执行的语句的日志记录到控制台
            sysLog.spawnWorkStatus('home1', excLine, resCode);
        }

        //自动创建分发型劳工
        if (distributor.length < 1) {
            var newName = 'Distributor' + Game.time;
            // console.log('Spawning new upgrader: ' + newName);
            excLine = '生产分发型矿工：' + newName;
            resCode = Game.spawns['home1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                { memory: { role: 'distributor' } });
            //输出刚刚执行的语句的日志记录到控制台
            sysLog.spawnWorkStatus('home1', excLine, resCode);
        }

        // if(Game.spawns['home1'].spawning) { 
        //     var spawningCreep = Game.creeps[Game.spawns['home1'].spawning.name];
        //     Game.spawns['home1'].room.visual.text(
        //         '🛠️' + spawningCreep.memory.role,
        //         Game.spawns['home1'].pos.x + 1, 
        //         Game.spawns['home1'].pos.y, 
        //         {align: 'left', opacity: 0.8});
        // }
        //调整为最后统一输出当前正在创建劳工的情况
        // }
        // else{

        // console.log('Needed Builders: ' + neededBuilders);
        //自动创建建造型劳工
        if (builder.length < 1) {
            var newName = 'Builder' + Game.time;
            // console.log('Spawning new builder: ' + newName);
            excLine = '生产建造型矿工：' + newName;
            resCode = Game.spawns['home1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                { memory: { role: 'builder' } });
            //输出刚刚执行的语句的日志记录到控制台
            sysLog.spawnWorkStatus('home1', excLine, resCode);
        }

        // if(Game.spawns['home1'].spawning) { 
        //     var spawningCreep = Game.creeps[Game.spawns['home1'].spawning.name];
        //     Game.spawns['home1'].room.visual.text(
        //         '🛠️' + spawningCreep.memory.role,
        //         Game.spawns['home1'].pos.x + 1, 
        //         Game.spawns['home1'].pos.y, 
        //         {align: 'left', opacity: 0.8});
        // }
        //调整为最后统一输出当前正在创建劳工的情况
        // }
    }
    if (Game.spawns['home1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['home1'].spawning.name];
        Game.spawns['home1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['home1'].pos.x + 1,
            Game.spawns['home1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }


    //统一管理劳工当前工作
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'containerTransfer') {
            roleContainerTransfer.run(creep, 'ef990774d80108c');
        }
        if (creep.memory.role == 'distributor') {
            //分发型劳工
            roleDistributor.run(creep, '602fee0b1f4b8e0');
        }
    }

    //统一管理功能性建筑当前工作
    //寻找当前房间内的防御塔
    var towerID = '';
    for (var id in Game.structures) {
        //console.log(Game.structures[id].structureType);
        if (Game.structures[id].structureType == 'tower') {
            //console.log("222：" + Game.structures[id].structureType);
            //console.log("222:" + id);
            towerID = id;
        }
    }
    var tower = Game.getObjectById(towerID);

    //调用
    if (tower) {
        constructionTower.attack(tower);
        constructionTower.repair(tower);
    }

    //房间内的link管理
    //采矿点的link摇摆发送，根据tick数的单双确定向谁发送
    if(Game.time % 2 == 0){
        //link1：采矿点 -> 母巢点
        constructionLink.remote('ae94edc29425f75', '602fee0b1f4b8e0');
    }
    else{
        constructionLink.remote('ae94edc29425f75', 'f03c5c53d1b9276');
    }
}