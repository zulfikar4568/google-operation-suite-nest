import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { winstonModuleOptions } from './utils/log.util';

@Module({
  imports: [WinstonModule.forRoot(winstonModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
