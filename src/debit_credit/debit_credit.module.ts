import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DebitCreditController } from './debit_credit.controller';
import { DebitCreditService } from './debit_credit.service';
import { DebitCredit } from './debit_credit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebitCredit])],
  controllers: [DebitCreditController],
  providers: [DebitCreditService],
})
export class DebitCreditModule {}
