---
name: analyze-reference
description: "Rozkłada stronę-referencję (URL lub screenshot) na system tokenów: paleta, skala typografii, rytm spacingu, jeden akcent. Używaj w Fazie 0/1 gdy klient daje 'zrób coś w duchu tej strony'. Wynik karmi create-design-tokens."
---

# Analyze Reference — referencja → system

Gdy dostajesz stronę jako referencję wizualną, nie kopiujesz jej na oko.
Rozkładasz ją na nazwany system który potem budujesz przez tokeny.

## Co wyciągasz (w tej kolejności)

### 1. Paleta — semantic, nie surowe hexy

Nie "ma niebieski i szary". Nazwij role:
```
background    — główne tło (zwykle najciemniejsze/najjaśniejsze)
surface       — karty, sekcje wyróżnione
foreground    — główny tekst
muted         — drugorzędny tekst
border        — linie, podziały
accent        — JEDEN kolor akcji (CTA, linki, podkreślenia)
```
Policz ile kolorów akcentu używa referencja. Jeśli więcej niż jeden —
to zwykle błąd referencji, nie wzór do naśladowania (patrz
references/patterns/one-accent-discipline.md).

### 2. Skala typografii — zmierz proporcje, nie piksele

Nie kopiuj "48px". Zmierz STOSUNEK między poziomami:
```
display : h1 : h2 : body  →  np. 6 : 3.5 : 2 : 1
```
Stosunek przenosi się między projektami, konkretne piksele nie.
Zidentyfikuj skalę modularną jeśli jest (1.25× / 1.333× / 1.5×).

Sprawdź:
- Ile krojów? (zwykle 2: serif display + sans UI, albo 1 sans)
- Gdzie serif, gdzie sans? (nagłówki vs tekst)
- Waga (light/regular/medium) — premium często light na dużych
- Tracking na dużych nagłówkach (zwykle ujemny, -0.02 do -0.04em)

### 3. Rytm spacingu — nazwij oddech

Zmierz pionowy odstęp między sekcjami i wewnątrz nich:
```
section rhythm  — odstęp między sekcjami (hero/content/tight)
stack gap       — odstęp między elementami w grupie
```
Czy rytm jest gęsty (editorial, dużo treści) czy luźny (premium,
dużo powietrza)? To jedna decyzja która definiuje charakter.

### 4. Layout — jeden charakterystyczny ruch

Co wyróżnia ten layout? Zwykle jedna rzecz:
- split (np. 45/55 treść/obraz)
- centered editorial (wąska kolumna treści)
- full-bleed images
- asymmetric grid
Nazwij to — to jest sygnatura, reszta to wariacje.

## Czego NIE robisz

- Nie kopiujesz pikseli 1:1 — wyciągasz proporcje i role
- Nie kopiujesz wszystkich kolorów — redukujesz do semantic ról
- Nie naśladujesz błędów referencji (3 akcenty, niespójny rytm)
- Nie opisujesz "co widzisz" — wyciągasz "jaki to system"

## Wynik

Krótka specyfikacja gotowa do create-design-tokens:
```
Paleta:    background X, surface Y, foreground Z, accent A (jeden)
Fonty:     serif [nazwa] dla nagłówków, sans [nazwa] dla UI
Skala:     display:h1:h2:body = 6:3.5:2:1, modular 1.333×, light weight
Rytm:      luźny — sekcje [duży oddech], stack [średni]
Sygnatura: split 45/55 treść lewa / obraz prawa
```

Ta specyfikacja → create-design-tokens → globals.css @theme.
Referencja jest punktem wyjścia, nie kalką. Wyciągasz system,
nie kopiujesz wyglądu.
