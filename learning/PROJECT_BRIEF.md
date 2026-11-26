# Praxisprojekt: TrailNotes API

**Dein Ergebnis nach dem Kurs:** eine nachvollziehbare API-Dokumentation als öffentliche Arbeitsprobe — mit funktionierenden Beispielen, einem dokumentierten Review und klarer eigener Autorenschaft.

## Die Aufgabe

Du bist Technical Writer für die fiktive TrailNotes API. Eine Entwicklerin möchte innerhalb weniger Minuten eine erste Anfrage ausführen und danach alle passenden Wandertouren abrufen. Sie kennt HTTP-Grundlagen, aber weder diese API noch ihre Besonderheiten.

Die wichtigsten Stolperstellen sind der Demo-Header, Filter vor Paginierung, die Bedeutung von `total` und `next_offset`, zulässige Parameter und lokale Zugriffe aus Postman.

## Was bereits vorbereitet ist

- Lokale, deterministische API mit drei vollständig synthetischen Datensätzen.
- Funktionsfähige Ausgangsdokumentation auf Englisch.
- OpenAPI-3.0.3-Vertrag als JSON, mit Schemas und Beispielen.
- Postman-Sammlung mit acht Anfragen und zugehöriger Umgebung.
- HTTP-Integrationstests, Artefakt- und Linkprüfungen.
- Lokale Website-Vorschau und vorbereitete GitHub-Actions-Workflows.

Das ist ein mit Codex erstelltes Gerüst. Als Arbeitsprobe zählt deine nachweisbare Weiterentwicklung: selbst geprüfte Beobachtungen, eigene Texte, begründete Entscheidungen und dokumentierte Überarbeitungen.

## Was du selbst erarbeitest

Bearbeite die [acht Etappen](MILESTONES.md). Überarbeite mindestens drei Dokumentationsseiten wesentlich, ergänze eine fachlich begründete Verbesserung und lasse eine zweite Person den Einstieg prüfen. Dokumentiere anschließend die Ergebnisse in einer eigenen Fallstudie.

Die Erweiterungsaufgabe kann eine bessere Fehlerdiagnose oder ein präziseres Pagination-Tutorial sein. Optional kannst du einen neuen Filter `max_distance_km` umsetzen. Im Starter ist dieser Filter bewusst nicht implementiert: Er liefert aktuell `400`. Wenn du ihn ergänzt, müssen Code, Vertrag, Beispiele, Postman, Tests und Referenz gemeinsam geändert werden.

## Umfang und Lernkontext

Orientierung: sechs bis acht konzentrierte Arbeitseinheiten von jeweils etwa 60–90 Minuten, zusätzlich zur eigentlichen Kurslektüre. Das ist eine Planungshilfe, keine Zeit- oder Lernerfolgsgarantie.

Nutze Tom Johnsons [Kurs](https://idratherbewriting.com/learnapidoc/) als Lernquelle. Dieses Projekt enthält eigene Beispiele und ist weder ein offizieller Kursauftrag noch eine Zertifizierung.

Für Dritte sind die englischen Seiten unter `docs/` bestimmt. Die deutschen Dateien unter `learning/` steuern dein Vorgehen. Die [Veröffentlichungsanleitung](PUBLISHING.md) beschreibt den späteren GitHub- und LinkedIn-Schritt.
