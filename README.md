# Brezi – német szókincsgyakorló

Telefonos játék a Modul 1 tankönyv 1. és 2. leckéjének szavaihoz (541 szó, 340 példamondat).
Webes technológiával készült, és a Capacitor csomagolja Android-alkalmazássá. Az APK-t a GitHub Actions készíti el, a gépedre semmit nem kell telepíteni.

## APK készítése GitHubon

1. Hozz létre egy új repót a GitHubon (lehet privát is).
2. Töltsd fel a mappa teljes tartalmát, a rejtett `.github` mappával együtt.
   Böngészőből: *Add file → Upload files*, majd húzd be az összes fájlt és mappát.
   Ha a `.github` mappa nem töltődik fel, hozd létre kézzel a fájlt: *Add file → Create new file*, a név legyen `.github/workflows/build-apk.yml`, a tartalmát másold be.
3. Feltöltés után a fordítás magától elindul. A folyamatot az **Actions** fülön látod (kb. 5–8 perc).
   Kézzel is indíthatod: *Actions → APK készítése → Run workflow*.
4. Ha zöld pipát kapsz, kattints a futásra, és lent az **Artifacts** résznél töltsd le a `brezi-apk` csomagot.
   Ez egy zip, benne az `app-debug.apk`.
5. Másold a telefonra, és nyisd meg. Az Android rákérdez, hogy engedélyezed-e az ismeretlen forrásból való telepítést: engedélyezd.

Minden újabb feltöltés (push) új APK-t készít, magasabb verziószámmal. Az aláíró kulcs (`signing/debug.keystore`) állandó, ezért az új verzió a régire telepíthető, és a haladás megmarad.

## Mit tud az app

**Játékmódok**
- Szógyakorlás: mit jelent a német szó, illetve hogy mondod németül.
- Melyik alak?: névelő, többes szám, közép- és felsőfok, kifejezések kiegészítése.
- Igeragozás: jelen idő, Präteritum és Perfekt választással, mondatban és önállóan is.
- Mi illik ide?: miniszituációk, melyik szó illik a helyzetbe.
- Mondatépítő: a szavakat koppintással vagy húzással kell sorba rakni.
- Vegyes kör: az összes típus keverve.
- Hibáim gyakorlása: csak a rosszul megválaszolt szavak.
- Kedvenc szavaim: a Szótárban csillaggal jelölt szavak.
- Szókártyák: forgatható kártyák, élet és pontozás nélkül.

**Jutalom és büntetés**
- Helyes válasznál konfetti, +XP felirat, Brezi ugrik, hang és rezgés.
- Sorozatbónusz 3, 5, 10, 15 és 20 jó válasz után.
- Rossz válasznál kettéreped egy szív, megremeg a kártya, és a rossz válasz piros áthúzást kap.
- Ha elfogynak a szívek, a kör véget ér.
- A kör végén 1–3 csillag jár, hibátlan körért bónusz XP. Szintlépéskor ünneplés, jelvényeknél értesítés.

**További funkciók**
- Lecke választása (1., 2. vagy mindkettő) a főoldalon és a beállításokban; szakaszonként is szűrhető (1A–2D).
- Okos ismétlés: minden szónak van tudásszintje (0–5), a gyengébb szavak gyakrabban jönnek elő.
- Szótár keresővel és szűrőkkel. Igéknél teljes ragozási táblázat, főneveknél többes szám, mellékneveknél fokozás, mindegyiknél példamondatok.
- Német felolvasás. Ehhez a telefonon legyen telepítve német hang: *Beállítások → Kisegítő lehetőségek → Szövegfelolvasás*.
- Haladás oldal: szint, napi sorozat, heti XP-grafikon, leckénkénti tudás, pontosság játékmódonként, 12 jelvény, legnehezebb szavak.
- Napi cél, időkorlát (8–30 mp), életek száma (3, 5, végtelen), hang, rezgés, automatikus felolvasás, világos és sötét téma.
- Az Android vissza gombja kezelve van: játék közben rákérdez a kilépésre.
- Internet nélkül is működik, minden adat a telefonon marad.

## Szavak bővítése

A szavak és feladatok a `tools/vocab_data.json` fájlban vannak, ugyanabban a szerkezetben, mint a korábbi Excel-fájl.
Módosítás után futtasd a `node tools/json2data.js` parancsot, ami frissíti a `www/data.js` fájlt, majd töltsd fel újra a GitHubra.

## Kipróbálás böngészőben

A `www/index.html` közvetlenül megnyitható számítógépen is (Chrome). A rezgés és a natív felolvasás csak a telefonon működik.

## Ha a fordítás hibát ad

- Az Actions-napló piros lépésére kattintva látod a hibát.
- Ha a hiba a `text-to-speech` csomagról szól, töröld a `package.json` fájlból a `"@capacitor-community/text-to-speech"` sort, és töltsd fel újra. Az app ilyenkor is működik, csak felolvasás nélkül.

## Felépítés

```
www/index.html      az app váza
www/style.css       megjelenés (világos/sötét téma)
www/app.js          képernyők, játéklogika, jutalmak, mentés
www/data.js         a szókincs (a vocab_data.json-ból generálva)
resources/          ikonok és indítókép
signing/            állandó aláíró kulcs
.github/workflows/  az APK-t készítő GitHub Action
```
