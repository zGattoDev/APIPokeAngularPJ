import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2';
  private litmitxPagPoke = 24

  constructor(private http: HttpClient) { }

  getPokemonList(page: number = 1): Observable<any> {
    const offset = (page - 1) * this.litmitxPagPoke;
    return this.http.get(`${this.apiUrl}/pokemon?limit=${this.litmitxPagPoke}&offset=${offset}`);
  }

  getPokemonDetails(nameOrId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${nameOrId}`);
  }

}