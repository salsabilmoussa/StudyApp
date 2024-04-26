import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPostComponent } from './upload-post/upload-post.component';
import { TimerComponent } from './timer/timer.component';
import { HomeComponent } from './home/home.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  { path: 'timer', component: TimerComponent },
  { path: '', component: HomeComponent },
  {path: 'conversation/:groupId', component: ConversationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
