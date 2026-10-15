# Scrum Board Grupp 6

Detta är en slutuppgift i JavaScript 2 där vi i grupp 6 utvecklat ett Scrum Board med hjälp av TypeScript och Firebase Realtime Database.

I appen kan användaren skapa och hantera projekt, medlemmar och uppgifter. Uppgifter kan tilldelas medlem utifrån kategori, flyttas mellan statusarna ny, pågående och slutförd och även arkiveras. De kan också filtreras och sorteras. Varje uppgift innehåller information om titel, beskrivning prioritering och deadline. Informationen sparas i Firebase.

## Live demo

[Öppna Scrum Board på Netlify](https://be26-js2-slutprojekt-grupp6.netlify.app/)

## Kodstruktur

- `src/classes/` innehåller klasser för uppgifter och tillhörande logik.
- `src/components/` innehåller komponenter för att skapa, visa och hantera uppgifter.
- `src/pages/` innehåller funktionaliteten för projektvyn.
- `src/types/` innehåller TypeScript-typer för projektets data.
- `src/style.css` innehåller sidans design och layout.
- `vite.config.ts` innehåller Vites byggkonfiguration för projektets HTML-sidor.
- HTML-filerna innehåller sidornas struktur.

## Kom igång

### Förutsättningar

Du behöver Node.js och npm installerat på din enhet.

### 1. Klona repot

```bash
git clone https://github.com/alidan39/BE26-js2-slutprojekt-grupp6.git
```

### 2. Gå till projektmappen

```bash
cd BE26-js2-slutprojekt-grupp6
```

### 3. Installera beroenden

```bash
npm install
```

### 4. Starta utvecklingsservern

```bash
npm run dev
```

Öppna sedan adressen som visas i terminalen på webbläsaren.

## Firebase

Projektet använder Firebase Realtime Database för att lagra projekt, medlemmar och uppgifter. Firebase-konfigurationen behöver vara korrekt inställd för att appen ska kunna kommunicera med databasen.

## Resurser

- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Firebase Realtime Database REST API](https://firebase.google.com/docs/reference/rest/database)
- [TypeScript-dokumentation](https://www.typescriptlang.org/docs/)
- [Vite – Multi-Page App](https://vite.dev/guide/build#multi-page-app)
