import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => User, (user) => user.organization)
  @JoinColumn({ name: 'User_id' })
  users: User[];
}
