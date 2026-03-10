import { Test, TestingModule } from '@nestjs/testing';
import { AuthnpmService } from './authnpm.service';

describe('AuthnpmService', () => {
  let service: AuthnpmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthnpmService],
    }).compile();

    service = module.get<AuthnpmService>(AuthnpmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
