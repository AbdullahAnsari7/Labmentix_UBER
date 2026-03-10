import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRideDto } from './dto/create-ride.dto';
import { RidesService } from './rides.service';

@UseGuards(JwtAuthGuard)
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('request')
  requestRide(@Req() req: any, @Body() dto: CreateRideDto) {
    return this.ridesService.requestRide(req.user, dto);
  }

  @Get('my-rides')
  getMyRides(@Req() req: any) {
    return this.ridesService.getMyRides(req.user);
  }

  @Patch(':id/accept')
  acceptRide(@Req() req: any, @Param('id') id: string) {
    return this.ridesService.acceptRide(req.user, id);
  }

  @Patch(':id/start')
  startRide(@Req() req: any, @Param('id') id: string) {
    return this.ridesService.startRide(req.user, id);
  }

  @Patch(':id/complete')
  completeRide(@Req() req: any, @Param('id') id: string) {
    return this.ridesService.completeRide(req.user, id);
  }

  @Patch(':id/cancel')
  cancelRide(@Req() req: any, @Param('id') id: string) {
    return this.ridesService.cancelRide(req.user, id);
  }
}