# Als Lernprojekt teilen und später als Arbeitsprobe fertigstellen

## Aktuelle Veröffentlichung als Lernprojekt

Eine öffentliche Lernversion ist ausdrücklich möglich, während die acht Etappen noch offen sind. README, Website und Fallstudie müssen diesen Stand und die KI-unterstützte Ausgangsbasis klar benennen. Keine Aufgaben oder Review-Ergebnisse werden dafür als erledigt markiert.

Der Pages-Workflow heißt **Publish learning project (manual)** und prüft mit `node scripts/check.mjs --publish` die ehrliche Kennzeichnung. Der strengere `--release`-Check bleibt für den späteren Abschluss bestehen.

Seit 26.11.2026 veröffentlicht: [Dokumentation](https://fabianbrue.github.io/trailnotes-api-docs/) · [Repository](https://github.com/fabianbrue/trailnotes-api-docs). CI und erster Pages-Deploymentlauf waren erfolgreich. Für Aktualisierungen das vorhandene Remote verwenden und anschließend den manuellen Pages-Workflow erneut starten.

## 1. Inhaltliche Freigabe

- [ ] Acht Etappen selbst bearbeitet und in `evidence.json` eingetragen.
- [ ] Mindestens drei Seiten wesentlich selbst verfasst oder überarbeitet.
- [ ] OpenAPI in Swagger Editor geprüft; tatsächliches Datum eingetragen.
- [ ] Postman-Sammlung mit lokaler API ausgeführt und Ergebnisse geprüft.
- [ ] Review durch eine zweite Person durchgeführt; Probleme und Änderungen dokumentiert.
- [ ] Starter-Fallstudie durch deine eigene Darstellung ersetzt.
- [ ] Status im README erst nach Abschluss entsprechend aktualisiert.
- [ ] Eigene Beiträge und KI-Unterstützung konkret beschrieben.
- [ ] Keine privaten Daten, realen Schlüssel oder Firmendokumente in Dateien, Beispielen oder Git-Verlauf.
- [ ] Lizenz und Contributor-Angabe geprüft.

Trage deine echten Ergebnisse in `learning/evidence.json` ein. Setze erst danach `docs/site.json` → `status` auf `portfolio-ready`. Der Release-Check prüft die ausgefüllten Kriterien, kann aber keine tatsächliche Lernerfahrung oder Autorenschaft beweisen.

```sh
node --test
node scripts/check.mjs
pwsh -NoProfile -File scripts/build-docs.ps1
node scripts/check.mjs --site
node scripts/check.mjs --release
```

Im Starter muss der letzte Befehl fehlschlagen. Die anderen Prüfungen sollen bestehen. Behebe echte Fehler, statt die Prüfungen pauschal zu entfernen.

## 2. GitHub-Repository anlegen

Für ein neues Repository kannst du etwa `trailnotes-api-docs` wählen. Falls bereits ein Remote eingerichtet ist, prüfe es mit `git remote -v` und lege kein zweites Repository an. Veröffentliche nur diesen Projektordner. Die folgenden Befehle zeigen den Ablauf für ein noch nicht verbundenes Repository.

Vor dem ersten Commit:

```sh
git status --short
git diff
git add README.md LICENSE .gitignore .gitattributes package.json portfolio.code-workspace api docs examples learning postman scripts src test .github
git diff --cached --stat
git diff --cached
```

Überprüfe den angezeigten Inhalt, dann erst:

```sh
git commit -m "Publish reviewed TrailNotes API documentation portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/trailnotes-api-docs.git
git push -u origin main
```

Ersetze `YOUR-USERNAME` durch deinen GitHub-Namen. Nutzername und Remote sind absichtlich nicht vorausgefüllt. Authentifiziere dich über GitHub, ohne Tokens in Befehle oder Dateien zu schreiben.

## 3. Dokumentationsseite mit GitHub Pages

1. Repository → **Settings → Pages**; als Quelle **GitHub Actions** wählen.
2. Unter **Actions** zuerst **Documentation and API checks** prüfen.
3. Danach **Publish learning project (manual)** → **Run workflow** auslösen.
4. Der Workflow baut `_site` und veröffentlicht nur die statische Dokumentation. Er verlangt die technischen Prüfungen und einen passenden öffentlichen Projektstatus. Für die spätere abgeschlossene Arbeitsprobe zusätzlich `--release` ausführen.
5. Die tatsächliche Seitenadresse aus dem Deployment übernehmen und Navigation, Downloads und mobile Darstellung noch einmal prüfen.

Es wird keine API ins Internet gestellt. Auf der veröffentlichten Seite ist die lokale Anfragekonsole bewusst deaktiviert. Leser starten die Demo anhand des README selbst.

Die Workflows wurden nach dem ersten Push auf GitHub erfolgreich ausgeführt. Jede spätere Änderung benötigt neue Prüfungen. Quellen: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Publishing with Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 4. LinkedIn

Nutze den vorbereiteten [Textentwurf](LINKEDIN.md). Verlinke bevorzugt die fertige Dokumentationsseite und ergänze das Repository als technischen Nachweis. Prüfe beide Links ausgeloggt. Eine bestandene CI ist kein Kurszertifikat.
