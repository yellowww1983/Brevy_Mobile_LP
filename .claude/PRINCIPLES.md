# 11beats — zasady pracy

Jeden cel: kod który wygląda jak napisany przez doświadczonego człowieka.
Nie kod który powstał szybko i wygląda poprawnie.
Szybkość bez jakości = 1h pracy + 4 dni cleanup. To jest gorsze niż wolno.

---

## Zasada 1: Architektura przed kodem

Zanim napiszesz pierwszy komponent — zaplanuj system który go utrzyma.

```
Tokens → Primitives → Patterns → Sections → Pages
```

Jeśli masz napisać sekcję a `Section` primitive nie istnieje:
**zatrzymaj się. Zbuduj primitive. Dopiero potem sekcję.**

Jeśli masz użyć `gap-6` a `Stack` nie istnieje:
**zatrzymaj się. Zbuduj Stack. Dopiero potem sekcję.**

Doświadczony developer nie zaczyna od UI.
Zaczyna od języka którym UI będzie opisane.

---

## Zasada 2: Primitive to jedyna droga, nie jedna z dróg

`Section` bez `className` dla paddingu.
`Text` bez `className` dla font-size.
`Stack` bez `className` dla gap.

Jeśli primitive nie pokrywa przypadku → rozszerz primitive.
Jeśli piszesz `px-8 py-24` w sekcji → coś poszło źle wcześniej.

Test: **czy zły kod da się tu napisać?**
Jeśli tak — primitive jest dziurawy. Napraw primitive, nie obejdź go.

---

## Zasada 3: Drugi raz = system leak

Pierwszy raz jakiś pattern pojawia się inline — może jednorazowy.
Drugi raz → zatrzymaj się i wyciągnij zanim napiszesz kopię.

Nie "posprzątam później". Cleanup po fakcie to dokładnie ten proces
który chcemy wyeliminować.

---

## Zasada 4: Nie mów "gotowe" bez weryfikacji

Przed każdym "gotowe" — konkretne pytania:

- Czy kupujący zmieni globalny spacing edytując jedno miejsce?
- Czy kupujący zmieni paletę edytując tylko `globals.css`?
- Czy nowa sekcja wymaga zmian w istniejących plikach?

Jeśli odpowiedź brzmi "nie" — nie jest gotowe.

Weryfikacja przez grep, nie przez wrażenie:
```bash
grep -rn "px-8.*sm:px-12" src/components/  # → 0
grep -rn "const ease"      src/components/  # → 0
grep -rn "\[i\] ??"        src/components/  # → 0
```

---

## Zasada 5: Dotykaj tylko tego co musisz

Przy edycji istniejącego kodu — zmieniaj wyłącznie to o co poproszono.

- Nie "ulepszaj" sąsiedniego kodu, komentarzy, formatowania
- Nie refaktoruj rzeczy które nie są zepsute
- Dopasuj się do istniejącego stylu, nawet jeśli zrobiłbyś inaczej
- Jeśli widzisz niepowiązany martwy kod — wspomnij, nie usuwaj

Gdy twoja zmiana tworzy sieroty (nieużywane importy, zmienne) —
usuń te które TWOJA zmiana osierociła. Nie usuwaj kodu który był
martwy przed tobą, chyba że o to proszę.

Test: każda zmieniona linia powinna prowadzić bezpośrednio
do tego o co poproszono. Jeśli nie prowadzi — nie zmieniaj jej.

---

## Zasada 6: Kod po angielsku, rozmowa po polsku

Wszystko co trafia do paczki sprzedażowej musi być po angielsku —
niezależnie od tego w jakim języku rozmawiamy.

Dotyczy:
- `//` i `/* */` komentarze, JSDoc
- nazwy zmiennych, funkcji, typów, plików
- stringi w kodzie (literały, error messages, log output)
- commit messages
- README, CHANGELOG, wszystkie `.md` w repo

Nie dotyczy:
- rozmowy ze mną w czacie (polski OK)
- `lib/content/*` — to copy strony, język wybiera klient
  (jeśli restauracja jest polska, content jest polski)

Powód: kupujący to międzynarodowi developerzy. Polski komentarz w
sprzedawanym template wyklucza większość rynku i wygląda jak kod
napisany dla siebie, nie dla klienta.

Test: czy developer z Berlina, São Paulo albo Tokio przeczyta
ten plik bez tłumacza? Jeśli nie — pisz po angielsku.

---

## Co to znaczy w praktyce

Wolniej na początku. Znacznie szybciej na końcu.
Zero rund cleanup. Zero "finalny" który nie jest finalny.
Zero "przy okazji poprawiłem" rzeczy o które nikt nie prosił.

Doświadczony developer nie pisze szybko i nie poprawia.
Pisze wolniej i dostarcza raz.
