import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './Organisation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  category: string;

  @Column({ length: 10 })
  phone_number: string;

  @Column({ default: 'USER' })
  role: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization;
}
