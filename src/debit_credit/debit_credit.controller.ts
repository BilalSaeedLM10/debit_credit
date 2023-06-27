import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { DebitCreditService } from './debit_credit.service';
import { DebitCredit } from './debit_credit.entity';

@Controller('debit_credit')
export class DebitCreditController {
  constructor(private readonly debit_credit: DebitCreditService) {}

  @Get('counts')
  getDashboardRecords(): any {
    return this.debit_credit.getDashboardRecords();
  }

  @Get('all')
  getAllData(@Query() query): any {
    if (query.startDate) {
      return this.debit_credit.getAllData(query);
    } else {
      return this.debit_credit.getAllData();
    }
  }

  @Post()
  async create(@Body() data: DebitCredit) {
    return this.debit_credit.saveRecord(data);
  }
}
