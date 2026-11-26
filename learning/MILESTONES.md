# Acht Etappen bis zur Arbeitsprobe

Halte Zwischenergebnisse als kleine Git-Commits fest. Trage eine Etappe erst dann in `evidence.json` unter `completed_milestones` ein, wenn du sie selbst bearbeitet und geprüft hast. Die vorhandenen Dateien sind keine bereits erledigten Lernleistungen.

| Etappe | Kursbezug | Dein Arbeitsauftrag | Nachweis |
| --- | --- | --- | --- |
| LAB-01 | REST-Grundlagen; API wie ein Entwickler nutzen | Starte den Server. Sende Health-, Listen- und Detailanfrage selbst. Erkläre URL, Header, Status und Body in eigenen Worten. | Eigene, bereinigte Request-/Response-Notizen |
| LAB-02 | Endpoints dokumentieren | Überarbeite die Detailreferenz. Begründe Feldbeschreibungen, Einheiten und Zielgruppe. Prüfe jedes Beispiel gegen die API. | Eigener Commit zu `docs/reference.md` |
| LAB-03 | OpenAPI; schrittweises Spec-Tutorial | Öffne `api/openapi.json` im OpenAPI Editor und in Swagger Editor. Verfolge Pfadparameter, Schema-Referenzen, Beispiele und Demo-Header. Ergänze eine begründete Verbesserung. | Validierungsdatum und notierte Entscheidung |
| LAB-04 | Dokumentation testen | Führe die Postman-Sammlung aus. Erkläre, warum 401/400/404 hier beabsichtigt sind. Verursache einen zusätzlichen Fehler und ergänze einen passenden Test. | Eigener Test und reproduzierbares Ergebnis |
| LAB-05 | Konzeptionelle Inhalte | Schreibe Quickstart und Fehlerhilfe eigenständig um. Mache Voraussetzungen und Postman-Agent-Auswahl verständlich. | Mindestens zwei wesentlich überarbeitete Seiten |
| LAB-06 | Code-Tutorials; Publikationswerkzeuge | Überarbeite das Pagination-Tutorial. Führe den Beispielcode aus und erkläre Abbruchbedingung und `total`. Baue und prüfe die Website. | Ausführbarer Code, Linkprüfung und eigener Tutorial-Text |
| LAB-07 | Schreibprozess; Qualitätsprüfung | Bitte eine zweite Person, eine Tour abzurufen und einen 401-Fehler zu beheben. Beobachte ohne vorzusagen. Halte konkrete Probleme und folgende Änderungen fest. | Review-Notizen und überarbeitete Stellen |
| LAB-08 | Portfolio; Veröffentlichung | Schreibe die Fallstudie, prüfe die Freigabeliste und bereite einen sachlichen LinkedIn-Text vor. | `evidence.json`, eigene Fallstudie und erfolgreicher Release-Check |

## Review-Aufgaben für eine zweite Person

1. Finde ausgehend von der Startseite heraus, wie du genau eine leichte Tour erhältst.
2. Lass den Demo-Header weg. Behebe den Fehler mithilfe der Dokumentation.
3. Rufe alle Touren ab und begründe, wann die Paginierung endet.

Notiere beobachtete Stolperstellen statt vermuteter Verbesserungen. Ein Pseudonym wie „Reviewperson A“ reicht; veröffentliche keine persönlichen Kontaktdaten. Hole für veröffentlichte Zitate und Screenshots die Zustimmung der betreffenden Person ein.

## Bewertungsraster

Bewerte pro Punkt mit 0 (fehlt), 1 (teilweise) oder 2 (nachvollziehbar erfüllt):

- Zielgruppe und erster Erfolg klar.
- Alle dokumentierten Aufrufe tatsächlich geprüft.
- Parameter, Defaults, Einheiten und Fehler korrekt.
- OpenAPI und beobachtete Antworten konsistent.
- Beispiele funktionieren in einer frischen lokalen Umgebung.
- Review-Probleme und Änderungen konkret belegt.
- Eigene Beiträge und KI-Unterstützung transparent.
- GitHub-Einstieg und Projektgrenzen verständlich.

Ziel: keine Nullwertung und insgesamt mindestens 13 von 16 Punkten. Das Raster unterstützt dein Review; es ist keine formelle Prüfung oder Bescheinigung des Kursanbieters.
