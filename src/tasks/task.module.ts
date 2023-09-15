import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './application/task.service';
import * as admin from 'firebase-admin';
import config from './infrastructure/firebase.config';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.firebaseConfig.credential.project_id,
    clientEmail: config.firebaseConfig.credential.client_email,
    privateKey: config.firebaseConfig.credential.private_key?.replace(
      /\\n/g,
      '\n',
    ),
  }),
  databaseURL: 'https://atom-tasks-88b60.firebaseio.com',
});

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
