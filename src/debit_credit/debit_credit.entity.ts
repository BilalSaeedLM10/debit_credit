import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Repository,
  getConnection,
} from 'typeorm';

@Entity()
export class DebitCredit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  totalAmount: number;

  @Column()
  type: string;

  @Column()
  reason: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;
  static get repository(): Repository<DebitCredit> {
    return getConnection().getRepository(DebitCredit);
  }

  static async getDebitedRecords(): Promise<DebitCredit[]> {
    return this.repository.find({ type: 'debit' });
  }

  static async getCreditedRecords(): Promise<DebitCredit[]> {
    return this.repository.find({ type: 'credit' });
  }

  static async getLastRecord(): Promise<DebitCredit> {
    return this.repository.findOne({
      order: { id: 'DESC' },
    });
  }

  static async getAllRecords(): Promise<DebitCredit[]> {
    return this.repository.find({ order: { id: 'DESC' } });
  }
}
