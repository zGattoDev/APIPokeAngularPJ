import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  currentPage = 1;
  searchTerm: string = '';
  selectedPokemon: any;

  constructor(
    private pokeapiService: PokeapiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.pokeapiService
      .getPokemonList(this.currentPage)
      .subscribe((data: any) => {
        this.pokemonList = data.results;
        this.pokemonList.forEach((pokemon: any) => {
          this.getPokemonDetails(pokemon.name);
        });
      });
  }

  getPokemonDetails(name: string): void {
    this.pokeapiService.getPokemonDetails(name).subscribe((data: any) => {
      const index = this.pokemonList.findIndex((p) => p.name === name);
      if (index !== -1) {
        this.pokemonList[index] = data;
      }
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPokemonList();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemonList();
    }
  }

  getPokemonTypeColor(type: string): string {
    switch (type) {
      case 'fire':
        return '#fd4b5a';
      case 'grass':
        return '#27cb50';
      case 'water':
        return '#85a8fb';
      case 'rock':
        return '#8b3e22';
      case 'bug':
        return '#3c9950';
      case 'dark':
        return '#595978';
      case 'dragon':
        return '#62cad9';
      case 'electric':
        return '#fbfa72';
      case 'fairy':
        return '#ea1368';
      case 'fighting':
        return '#f06239';
      case 'flying':
        return '#94b2c7';
      case 'ghost':
        return '#906791';
      case 'ground':
        return '#6e491f';
      case 'ice':
        return '#d8f0fa';
      case 'normal':
        return '#ca98a6';
      case 'poison':
        return '#9b69da';
      case 'psychic':
        return '#f71d92';
      case 'steel':
        return '#43bd94';

      default:
        return 'gray';
    }
  }

  getTypeNameInSpanish(typeName: string): string {
    switch (typeName) {
      case 'normal':
        return 'Normal';
      case 'fire':
        return 'Fuego';
      case 'fighting':
        return 'Lucha';
      case 'water':
        return 'Agua';
      case 'flying':
        return 'Volador';
      case 'grass':
        return 'Planta';
      case 'poison':
        return 'Veneno';
      case 'electric':
        return 'Eléctrico';
      case 'ground':
        return 'Tierra';
      case 'psychic':
        return 'Psíquico';
      case 'rock':
        return 'Roca';
      case 'ice':
        return 'Hielo';
      case 'bug':
        return 'Bicho';
      case 'dragon':
        return 'Dragón';
      case 'ghost':
        return 'Fantasma';
      case 'dark':
        return 'Siniestro';
      case 'steel':
        return 'Acero';
      case 'fairy':
        return 'Hada';
      default:
        return 'Desconocido';
    }
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.pokeapiService
        .getPokemonDetails(this.searchTerm.toLowerCase())
        .subscribe(
          (data: any) => {
            this.pokemonList = [data];
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    } else {
      this.loadPokemonList();
    }
  }

  openDialog(pokemon: any): void {
    const dialogRef = this.dialog.open(PokemonDialogComponent, {
      width: '60%px',
      data: { selectedPokemon: pokemon },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
