import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DebitCreditModule } from './debit_credit/debit_credit.module';

@Module({
  imports: [TypeOrmModule.forRoot(), DebitCreditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
