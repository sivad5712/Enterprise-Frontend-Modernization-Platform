import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { jwtInterceptor } from './app/core/interceptors/jwt.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';

// Bootstrap modern Standalone application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor])
    )
  ]
}).catch((err) => console.error(err));
