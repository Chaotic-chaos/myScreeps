//数据大盘的管理模块
/*
    全局的数据大盘统计模块，负责监控全局目前的工作情况，使用方式：
        1. var statusMonitor = require('sys.dataMonitor');
        2. statusMonitor.run();
*/
var statusMonitor = {
    run: function(){
        //每10 tick运行一次，节约系统资源
        if(Game.time % 10) return;

        //为系统内存添加状态字段
        if(!Memory.status) Memory.status = {};

        //统计GCL（全局控制器等级）、GPL（全局超能等级）及其升级进度
        Memory.status.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100;
        Memory.status.gclLevel = Game.gcl.level;
        //CPU当前使用量
        Memory.status.cpu = Game.cpu.getUsed();
        //bucket使用量
        Memory.status.bucket = Game.cpu.bucket;
        //当前矿工总数
        creeps = 0;
        for(var name in Game.creeps){
            creeps++;
        }
        Memory.status.creeps =creeps;
        //当前各种矿工总数
        var harvester = _.filter(Game.creeps, (creeps) => creeps.memory.role == 'harvester');
        var builder = _.filter(Game.creeps, (creeps) => creeps.memory.role == 'builder');
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var distributor = _.filter(Game.creeps, (creeps) => creeps.memory.role == 'distributor');
        var containerTransfer = _.filter(Game.creeps, (creeps) => creeps.memory.role == 'containerTransfer');
        Memory.status.harvester = harvester.length;
        Memory.status.builder = builder.length;
        Memory.status.upgrader = upgrader.length;
        Memory.status.distributor = distributor.length;
        Memory.status.containerTransfer = containerTransfer.length;

        //各种房间内控制器的等级
        //房间W1N7
        var roomW1N7ControllerLevel = Game.getObjectById('fd2c0774d801520').level;
        var roomW1N7ControllerProgress = ((Game.getObjectById('fd2c0774d801520').progress) / (Game.getObjectById('fd2c0774d801520').progressTotal) * 100);
        Memory.status.roomW1N7ControllerLevel = roomW1N7ControllerLevel
        Memory.status.roomW1N7ControllerProgress = roomW1N7ControllerProgress;

    }
};

module.exports = statusMonitor;