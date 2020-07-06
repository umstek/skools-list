import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';

@Schema()
export class Address extends Document {
  @Prop({ required: true }) street: string;
  @Prop({ required: true }) suburb: string;
  @Prop({ required: true }) postcode: string;
  @Prop({ required: true }) state: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class School extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ type: AddressSchema, required: true }) address: Address;
  @Prop({ required: true }) studentCount: number;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
SchoolSchema.index({ '$**': 'text' });

export class CreateAddressDto {
  @IsNotEmpty() street: string;
  @IsNotEmpty() suburb: string;
  @IsNotEmpty() postcode: string;
  @IsNotEmpty() state: string;
}

export class CreateSchoolDto {
  @IsNotEmpty() name: string;
  @ValidateNested() address: CreateAddressDto;
  @IsPositive() studentCount: number;
}
