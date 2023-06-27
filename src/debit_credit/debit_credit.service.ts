import { Injectable } from '@nestjs/common';
import { DebitCredit } from './debit_credit.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class DebitCreditService {
  async getDashboardRecords() {
    const debit = await DebitCredit.getDebitedRecords();
    const credit = await DebitCredit.getCreditedRecords();
    const totalRecords = (await DebitCredit.getLastRecord())
      ? (await DebitCredit.getLastRecord()).totalAmount
      : 0;
    let debitByMonths: any;
    let creditByMonths = 0;
    const startDate = new Date();
    startDate.setDate(1);

    const debitCount = debit.reduce(
      (sum, { amount }: { amount: number }) => sum + amount,
      0,
    );
    const creditCount = credit.reduce(
      (sum, { amount }: { amount: number }) => sum + amount,
      0,
    );
    // Set the date to the first day of the current month

    if (debit.length > 0) {
      debitByMonths = debit
        .filter(
          x =>
            new Date(x.created_at).toLocaleDateString() >=
              startDate.toLocaleDateString() &&
            new Date(x.created_at).toLocaleDateString() <=
              new Date().toLocaleDateString(),
        )
        .reduce((sum, { amount }: { amount: number }) => sum + amount, 0);
    }
    if (credit.length > 0) {
      creditByMonths = credit
        .filter(
          x =>
            new Date(x.created_at).toLocaleDateString() >=
              startDate.toLocaleDateString() &&
            new Date(x.created_at).toLocaleDateString() <=
              new Date().toLocaleDateString(),
        )
        .reduce((sum, { amount }: { amount: number }) => sum + amount, 0);
    }
    const records = {
      debitByMonths,
      creditByMonths,
      debitCount,
      creditCount,
      totalRecords,
    };
    return records;
  }

  async getAllData(query: any = null) {
    if (query) {
      const data = await DebitCredit.getAllRecords();

      const newRecords = data.filter(
        x =>
          new Date(x.created_at).toLocaleDateString() >=
            new Date(query.startDate).toLocaleDateString() &&
          new Date(x.created_at).toLocaleDateString() <=
            new Date(query.endDate).toLocaleDateString(),
      );

      return newRecords;
    } else {
      return await DebitCredit.getAllRecords();
    }
  }

  async saveRecord(data: DebitCredit) {
    const lastUpdatedRecord = (await DebitCredit.getLastRecord())
      ? (await DebitCredit.getLastRecord()).totalAmount
      : 0;

    if (data.type === 'debit') {
      if (lastUpdatedRecord - data.amount >= 0) {
        data.totalAmount = lastUpdatedRecord - data.amount;
      } else {
        return 'Debit amount can not go below zero';
      }
    } else {
      data.totalAmount = lastUpdatedRecord + data.amount;
    }
    const repo = getRepository(DebitCredit);
    await repo.save(data);
    return {
      message: 'Success',
    };
  }
}
