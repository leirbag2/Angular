import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { TablaDinamicaComponent } from './tabla-dinamica/tabla-dinamica.component';
import { OverwritePrimeNgService } from './overwrite-primeng-service';
import { FinMesComponent } from './fin-mes/fin-mes.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TablaDinamicaComponent,FinMesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Aprendiendo Angular';
  constructor(
    private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private overwritePrimeNgService: OverwritePrimeNgService
  ) {}
  ngOnInit() {
    this.loadTranslation().subscribe((translation) => {
      this.primengConfig.setTranslation(translation);
    });
    this.overwritePrimeNgService.overridePrimeNGTableColumnFilter();
  }
  loadTranslation(): Observable<any> {
    return this.http.get('assets/es.json');
  }
}
