import { IsNumber, IsString, Min } from 'class-validator';

export class CreateRideDto {
  @IsString()
  pickupAddress: string;

  @IsString()
  dropAddress: string;

  @IsNumber()
  pickupLat: number;

  @IsNumber()
  pickupLng: number;

  @IsNumber()
  dropLat: number;

  @IsNumber()
  dropLng: number;

  @IsNumber()
  @Min(1)
  fare: number;
}