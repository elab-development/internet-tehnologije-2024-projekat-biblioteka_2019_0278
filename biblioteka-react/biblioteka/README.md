  

# Aplikacija za upravljanje bibliotekom

  

Biblioteke predstavljaju važan stub obrazovanja, kulture i naučnog istraživanja. Njihovo
poslovanje podrazumeva upravljanje velikim brojem knjiga, evidencijom članova i
organizacijom procesa pozajmljivanja i vraćanja knjiga. Tradicionalni načini vođenja evidencija
su često spori i podložni greškama, zbog čega se javlja potreba za savremenim softverskim
rešenjima koja omogućavaju digitalizaciju i automatizaciju svih procesa.
  
Tema ovog rada je razvoj veb aplikacije za upravljanje bibliotekom i procesima
pozajmice knjiga. Aplikacija je osmišljena tako da olakša rad bibliotekarima, unapredi
komunikaciju sa korisnicima i omogući jednostavniji pristup informacijama.


Funkcionalnosti aplikacije obuhvataju:

- Za bibliotekare: unos, ažuriranje i brisanje podataka o knjigama, evidenciju članova
  biblioteke, praćenje statusa pozajmica, rezervacija i vraćenih knjiga.
- Za korisnike: pretragu dostupnih knjiga, rezervaciju i pozajmljivanje, pregled ličnog
  naloga i istoriju korišćenja biblioteke.
 

## Pokretanje Laravel aplikacije (API)

  

### 1. Instalacija zavisnosti

Neophodno je da na računaru imate instaliran **Composer** i **XAMPP** (koji uključuje MySQL i Apache).  

U glavnom direktorijumu Laravel aplikacije pokrenuti:

```bash

composer install

````

  

### 2. Konfiguracija baze

  

* Pokrenuti XAMPP i startovati Apache i MySQL.

* Otvoriti [http://localhost/phpmyadmin](http://localhost/phpmyadmin) i kreirati novu bazu sa nazivom `biblioteka`.

* U fajlu `.env` podesiti parametre:

  

```env

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=biblioteka

DB_USERNAME=root

DB_PASSWORD=

```

  

### 3. Migracije i seed podaci

  

Pokrenuti:

  

```bash

php artisan migrate --seed

```

  

### 4. Startovanje servera

  

```bash

php artisan serve

```

  

Aplikacija će biti dostupna na adresi: [http://localhost:8000](http://localhost:8000)

  

---

  

## Pokretanje React aplikacije (frontend)

  

### 1. Instalacija zavisnosti

  

U direktorijumu React aplikacije pokrenuti:

  

```bash

npm install

```

  

### 2. Pokretanje aplikacije

  

```bash

npm start

```

  

Frontend će biti dostupan na adresi: [http://localhost:3000](http://localhost:3000)

  

---

  

## Korišćene tehnologije

  

* Backend: Laravel, PHP, MySQL (XAMPP)

* Frontend: React, Bootstrap

* Baza podataka: MySQL