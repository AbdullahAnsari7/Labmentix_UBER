import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';

@Injectable()
export class RidesService {
  constructor(private prisma: PrismaService) {}

  async requestRide(user: any, dto: CreateRideDto) {
    if (user.role !== 'RIDER') {
      throw new ForbiddenException('Only riders can request rides');
    }

    const ride = await this.prisma.ride.create({
      data: {
        riderId: user.userId,
        pickupAddress: dto.pickupAddress,
        dropAddress: dto.dropAddress,
        pickupLat: dto.pickupLat,
        pickupLng: dto.pickupLng,
        dropLat: dto.dropLat,
        dropLng: dto.dropLng,
        fare: dto.fare,
        status: 'REQUESTED',
      },
    });

    return { message: 'Ride requested successfully', ride };
  }

  async getMyRides(user: any) {
    if (user.role === 'RIDER') {
      return this.prisma.ride.findMany({
        where: { riderId: user.userId },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (user.role === 'DRIVER') {
      const driverProfile = await this.prisma.driverProfile.findUnique({
        where: { userId: user.userId },
      });

      return this.prisma.ride.findMany({
        where: {
          OR: [{ status: 'REQUESTED' }, { driverId: driverProfile?.id ?? '' }],
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.ride.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async acceptRide(user: any, rideId: string) {
    if (user.role !== 'DRIVER') {
      throw new ForbiddenException('Only drivers can accept rides');
    }

    const driverProfile = await this.prisma.driverProfile.findUnique({
      where: { userId: user.userId },
    });

    if (!driverProfile) {
      throw new NotFoundException('Driver profile not found');
    }

    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });

    if (!ride) throw new NotFoundException('Ride not found');
    if (ride.status !== 'REQUESTED') {
      throw new BadRequestException('Ride is no longer available');
    }

    const updatedRide = await this.prisma.ride.update({
      where: { id: rideId },
      data: {
        driverId: driverProfile.id,
        status: 'ACCEPTED',
      },
    });

    return { message: 'Ride accepted successfully', ride: updatedRide };
  }

  async startRide(user: any, rideId: string) {
    if (user.role !== 'DRIVER') {
      throw new ForbiddenException('Only drivers can start rides');
    }

    const driverProfile = await this.prisma.driverProfile.findUnique({
      where: { userId: user.userId },
    });

    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });

    if (!driverProfile) throw new NotFoundException('Driver profile not found');
    if (!ride) throw new NotFoundException('Ride not found');
    if (ride.driverId !== driverProfile.id) {
      throw new ForbiddenException('This ride is not assigned to you');
    }
    if (ride.status !== 'ACCEPTED') {
      throw new BadRequestException('Only accepted rides can be started');
    }

    return this.prisma.ride.update({
      where: { id: rideId },
      data: { status: 'IN_PROGRESS' },
    });
  }

  async completeRide(user: any, rideId: string) {
    if (user.role !== 'DRIVER') {
      throw new ForbiddenException('Only drivers can complete rides');
    }

    const driverProfile = await this.prisma.driverProfile.findUnique({
      where: { userId: user.userId },
    });

    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });

    if (!driverProfile) throw new NotFoundException('Driver profile not found');
    if (!ride) throw new NotFoundException('Ride not found');
    if (ride.driverId !== driverProfile.id) {
      throw new ForbiddenException('This ride is not assigned to you');
    }
    if (ride.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Only in-progress rides can be completed');
    }

    return this.prisma.ride.update({
      where: { id: rideId },
      data: { status: 'COMPLETED' },
    });
  }

  async cancelRide(user: any, rideId: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Ride not found');

    if (user.role === 'RIDER') {
      if (ride.riderId !== user.userId) {
        throw new ForbiddenException('This ride is not yours');
      }
    } else if (user.role === 'DRIVER') {
      const driverProfile = await this.prisma.driverProfile.findUnique({
        where: { userId: user.userId },
      });

      if (!driverProfile || ride.driverId !== driverProfile.id) {
        throw new ForbiddenException('This ride is not assigned to you');
      }
    } else {
      throw new ForbiddenException('Not allowed');
    }

    if (ride.status === 'COMPLETED') {
      throw new BadRequestException('Completed ride cannot be cancelled');
    }

    return this.prisma.ride.update({
      where: { id: rideId },
      data: { status: 'CANCELLED' },
    });
  }
}