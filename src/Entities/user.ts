import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Additional_Details } from './Additional_Details';

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

  @OneToOne(
    () => Additional_Details,
    (additional_details) => additional_details.user,
  )
  additional_details: Additional_Details;
}
