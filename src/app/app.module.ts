import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateComponent } from './recipes/create/create.component';
import { ReadComponent } from './recipes/read/read.component';
import { UpdateComponent } from './recipes/update/update.component';
import { DeleteComponent } from './recipes/delete/delete.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PostService } from './services/api.service';
import { HomeComponent } from './home/home.component';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'create', component: CreateComponent },
      { path: 'create/:id', component: CreateComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'update/:id', component: UpdateComponent },
      { path: 'read', component: ReadComponent },
      { path: 'read/:id', component: ReadComponent },
      { path: 'delete', component: DeleteComponent },
      { path: 'delete/:id', component: DeleteComponent },
    ])
  ],
  providers: [PostService,LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
