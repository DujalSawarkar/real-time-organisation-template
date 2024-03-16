import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Additional_Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: true })
  Looking_For: string[];

  @Column({ type: 'json', nullable: true })
  Refreral_Partners: string[];

  @Column()
  DOB: Date;

  @Column()
  spouse_name: string;

  @Column({ type: 'json', nullable: true })
  Hobbies: string[];
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  aboutUs: string;

  @Column({ type: 'json', nullable: true })
  services: any[];

  @Column({ type: 'json', nullable: true })
  serviceArea: string[];

  @Column({ type: 'json', nullable: true })
  Top_Clients: any[];

  @Column({ type: 'text', nullable: true })
  success_story: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column()
  Anniversary: Date;

  @OneToOne(() => User, (user) => user.additional_details)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
