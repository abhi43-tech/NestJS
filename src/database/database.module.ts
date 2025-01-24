import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://user1:passforblog@blogs.op3pw.mongodb.net/', { useNewUrlParser: true }),
  ],
  controllers: [],
  providers: [],
})

export class DatebaseModule {}