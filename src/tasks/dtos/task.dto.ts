import { IsString, IsNotEmpty } from 'class-validator';
import { Entity, Column } from 'typeorm';

@Entity()
export class CreateTaskDto {
  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  status: string;
}
