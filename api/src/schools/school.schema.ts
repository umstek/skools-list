import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty() @IsNotEmpty() street: string;
  @ApiProperty() @IsNotEmpty() suburb: string;
  @ApiProperty() @IsNotEmpty() postcode: string;
  @ApiProperty() @IsNotEmpty() state: string;
}

export class CreateSchoolDto {
  @ApiProperty() @IsNotEmpty() name: string;
  @ApiProperty() @ValidateNested() address: CreateAddressDto;
  @ApiProperty() @IsPositive() studentCount: number;
}
