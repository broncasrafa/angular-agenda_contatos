import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContatosService {

  baseUrl = 'http://localhost:3000/api/contatos';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
    console.log('Service contatos is initialized...');
  }

  getTodosContatos() {
    const url =  `${this.baseUrl}`;
    return this.http.get(url).map(res => res.json());
  }

  getContato(id: string) {
    const url =  `${this.baseUrl}/${id}`;
    return this.http.get(url).map(res => res.json());
  }

  createContato(contato) {
    const url =  `${this.baseUrl}`;
    this.headers.append('enctype', 'multipart/form-data');

    return this.http
               .post(url, JSON.stringify(contato), { headers: this.headers })
               .map(res => res.json());
  }

  createAvatar(files: File[]) {
    const head = new Headers();
    const formData: FormData = new FormData();
    formData.append('imagem', files[0], files[0].name);

    const url =  `${this.baseUrl}/avatar/upload`;
    return this.http.post(url, formData, { headers: head })
                    .map(res => res.json());
  }

  testePost(contato: any, files: File[]) {
    const head = new Headers();
    const formData: FormData = new FormData();

    if(files.length > 0) {
      formData.append('imagem', files[0], files[0].name);
    }

    if (contato !== '' && contato !== undefined && contato !== null) {
      for (var property in contato) {
        if (contato.hasOwnProperty(property)) {
            formData.append(property, contato[property]);
        }
      }
    }
    //console.log(contato);

    const url =  `${this.baseUrl}`;
    return this.http.post(url, formData, { headers: head }).map(res => res.json());
  }

  editContato(contato) {
    const url =  `${this.baseUrl}/${contato._id}`;
    return this.http
               .put(url, JSON.stringify(contato), { headers: this.headers })
               .map(res => res.json());
  }
}
