import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DebitCreditModule } from './debit_credit/debit_credit.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'aws.connect.psdb.cloud',
      port: 3306,
      username: process.env.DATABASE_USER || 'f85ssxtynfrgifqjy4yh',
      password:
        process.env.DATABASE_PASSWORD ||
        'pscale_pw_WdqDngk0JoNUtyVM5lcNc0hsYaO8TrOxLJPU8oerSp0',
      database: process.env.DATABASE_NAME || 'nestjs_db',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      ssl: {
        rejectUnauthorized: true,
      },
      // https://typeorm.io/#/migrations
    }),
    DebitCreditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
