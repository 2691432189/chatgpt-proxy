import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormOptions: TypeOrmModuleOptions = {
  type: 'mysql', //数据库类型
  username: 'root', //账号
  password: '@Kfq132069', //密码
  host: '192.168.1.10', //host
  port: 6200, //
  database: 'chatgpt', //库名
  // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库 方便是方便 但千万别用，他马的删库
  // migrationsRun: true,
  retryDelay: 500, //重试连接数据库间隔
  retryAttempts: 5, //重试连接数据库的次数
  autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
};
