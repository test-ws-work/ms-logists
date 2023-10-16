import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogistsModule } from './logists/logists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LogistsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
